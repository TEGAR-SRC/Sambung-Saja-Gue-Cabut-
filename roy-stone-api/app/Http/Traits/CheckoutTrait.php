<?php

namespace App\Http\Traits;

use Exception;
use App\Helpers\Helpers;
use App\Enums\AmountEnum;
use Illuminate\Http\Request;
use App\Enums\ShippingRuleEnum;
use App\GraphQL\Exceptions\ExceptionHandler;

trait CheckoutTrait
{
  use UtilityTrait, CouponTrait, ShippingTrait, WalletPointsTrait, LicenseTrait;

  public function calculate(Request $request)
  {
    try {

      $settings = Helpers::getSettings();
      $amount = Helpers::getTotalAmount($request->products);
      if ($this->isActivePaymentMethod($request->payment_method, $amount)) {
        $minOrderAmount = $settings['general']['min_order_amount'];
        $products = $this->getUniqueProducts($request->products);
        $request->merge(['products' => $products]);
        if ($amount < $minOrderAmount) {
          throw new Exception("Please ensure your order is at least {$minOrderAmount} before proceed.", 422);
        }

        $outOfStockProduct = $this->isOutOfStock($request->products);
        if ($outOfStockProduct) {
          return $outOfStockProduct;
        }

        return $this->getCosts($request);
      }

    } catch (Exception $e) {

      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }

  public function getCosts($request)
  {
    $shippingRules = $this->getShippingRules($request);
    return $this->calculateCosts($request, $shippingRules);
  }

  public function getWholesalePrice($product, $subTotal)
  {
    $wholesale_price = 0;
    $wholesales = Helpers::isWholesaleProduct($product['product_id']);
    if ($wholesales) {
      if ($subTotal > 0 && $product['quantity'] > 0) {
        $per_product_wholesale_price = Helpers::formatDecimal($subTotal / $product['quantity']);
        foreach ($wholesales as $wholesale) {
          if (Helpers::isOptimumWholesaleQty($product['quantity'], $wholesale)) {
            return $per_product_wholesale_price;
          }
        }
      }
    }
    return $wholesale_price;
  }

  public function calculateCosts($request, $shippingRules)
  {
    try {

      $tax = [];
      $points = 0;
      $pointsAmount = 0;
      $walletBalance = 0;
      $shippingTotal = 0;
      $perProductCost = [];
      $couponTotalDiscount = [];
      $convert_point_amount = 0;
      $convert_wallet_balance = 0;
      $settings = Helpers::getSettings();
      $amount = Helpers::getTotalAmount($request->products);

      foreach ($request->products as $product) {
        $shippingCost = 0;
        $perProductTax = 0;
        $perProductDiscount = 0;
        $perProductShippingCost = 0;
        $singleProductPrice = Helpers::getSalePrice($product);
        $subTotal = Helpers::getSubTotal($product);

        if ($settings['general']['min_order_free_shipping'] >= $amount) {
          if ($shippingRules) {
            if ($this->isNotFreeShipping($product['product_id'])) {
              foreach ($shippingRules as $shippingRule) {
                switch ($shippingRule->rule_type) {
                  case ShippingRuleEnum::BASE_ON_WEIGHT:
                    $shippingCost = $this->baseOnWeight($product, $shippingRule);
                    if ($shippingCost > 0) {
                      $perProductShippingCost = $shippingCost;
                    }

                    $shippingTotal += $shippingCost;
                    break;

                  case ShippingRuleEnum::BASE_ON_PRICE:
                    $shippingCost = $this->baseOnPrice($product, $shippingRule);
                    if ($shippingCost > 0) {
                      $perProductShippingCost = $shippingCost;
                    }

                    $shippingTotal += $shippingCost;
                    break;

                  default:
                    $shippingCost = 0;
                    $shippingTotal += $shippingCost;
                }
              }
            }
          }
        }

        if (isset($request->coupon)) {
          $coupon = Helpers::getCoupon($request->coupon);
          if ($this->isValidCoupon($coupon, $amount, $this->getConsumerId($request))) {
            if ($this->isIncludeOrExclude($coupon, $product)) {
              switch ($coupon->type) {
                case AmountEnum::FIXED:
                  $perProductDiscount = $this->fixedDiscount($subTotal, $coupon->amount);
                  break;

                case AmountEnum::PERCENTAGE:
                  $perProductDiscount =  $this->percentageDiscount($subTotal, $coupon->amount);
                  break;

                default:
                  $perProductShippingCost = 0;
                  $shippingTotal = 0;
              }

              $couponTotalDiscount[] = $perProductDiscount;
            }
          }
        }

        $perProductTax = $this->getTax($product['product_id'], $subTotal);
        $tax[] = $perProductTax;
        $perProductCost[] = [
          'store_id'  =>      Helpers::getStoreIdByProductId($product['product_id']),
          'product_id' =>     $product['product_id'],
          'product_type' =>   Helpers::getProductTypeById($product['product_id']),
          'variation_id' =>   $product['variation_id'],
          'tax' =>            $perProductTax,
          'shipping_cost' =>  $perProductShippingCost,
          'single_price' =>   $singleProductPrice,
          'quantity' =>       $product['quantity'],
          'subtotal' =>       $subTotal,
          'wholesale_price' => $this->getWholesalePrice($product, $subTotal)
        ];
      }

      if (Helpers::isMultiVendorEnable()) {
        foreach (array_unique(data_get($perProductCost, '*.store_id')) as $storeIds) {
          $store_ids[] = $storeIds;
        }
      } else {
        $store_ids = array_unique(data_get($perProductCost, '*.store_id'));
      }

      $filtered_sub_Total = [];
      foreach ($store_ids as $store_id) {

        $_total = [];
        $_products = [];
        $_tax_total = [];
        $_shipping_total = [];
        foreach ($perProductCost as $value) {
          $product_type = data_get($perProductCost, '*.product_type');
          if ($value['store_id'] == $store_id) {
            $_products[] = $value;
            $_tax_total[] = $value['tax'];
            $_shipping_total[] = $value['shipping_cost'];
            $_total[] = $value['subtotal'];
            $product_type[] = $value['product_type'];
          }
        }

        $_item['store'] = $store_id;
        $_item['products'] = $_products;
        $_item_total = ((array_sum($_tax_total) + array_sum($_shipping_total) + array_sum($_total)) - array_sum($couponTotalDiscount));
        $_item['total'] = [
          'tax_total' => $this->formatDecimal(array_sum($_tax_total)),
          'shipping_total' => $this->formatDecimal(array_sum($_shipping_total)),
          'sub_total' => $this->formatDecimal(array_sum($_total)),
          'total' =>  $_item_total,
          'convert_point_amount' => abs($this->formatDecimal($convert_wallet_balance)),
          'convert_wallet_balance' => abs($this->formatDecimal($convert_point_amount)),
          'coupon_total_discount' => $this->formatDecimal(array_sum($couponTotalDiscount)),
          'is_digital_only' => $this->isDigitalOnly($_products),
        ];

        $filtered_sub_Total[] = array_sum($_total);
        $splittedProducts = $this->splitItemBaseType($_item);

        if ($splittedProducts) {
          foreach ($splittedProducts as $splittedProduct) {
            $splittedProduct['total']['convert_point_amount'] = $this->formatDecimal($convert_wallet_balance);
            $splittedProduct['total']['convert_wallet_balance'] = $this->formatDecimal($convert_point_amount);
            $splittedProduct['total']['coupon_total_discount'] = $this->formatDecimal(array_sum($couponTotalDiscount));
            $items['items'][] = $splittedProduct;
          }
        } else {
          $items['items'][] = $_item;
        }
      }

      if (Helpers::isUserLogin()) {
        if (Helpers::pointIsEnable()) {
          $points = $this->getPointAmount($this->getConsumerId($request));
          $convert_point_amount = - ($this->pointsToCurrency($points));
          $pointsAmount = abs($convert_point_amount);
        }

        if (Helpers::walletIsEnable()) {
          $convert_wallet_balance = - ($this->getWalletBalance($this->getConsumerId($request)));
          $walletBalance = abs($convert_wallet_balance);
        }
      }

      $total = $amount;
      $subTotal = array_sum($filtered_sub_Total);
      $couponDiscount = array_sum($couponTotalDiscount);

      if ($request->wallet_balance) {
        if ($this->verifyWallet($this->getConsumerId($request), $walletBalance)) {
          $convert_wallet_balance = abs($walletBalance);
          $walletBalance -=  $convert_wallet_balance;
          $total -= $convert_wallet_balance;
          if ($total < 0) {
            $walletBalance = abs($total);
            $total = 0;
          }

          if ($walletBalance > 0) {
            $convert_wallet_balance -= $walletBalance;
          }

          if ($walletBalance <= 0) {
            $convert_point_amount = - (min($pointsAmount, ($total - $walletBalance)));
          }

          $convert_wallet_balance = -$convert_wallet_balance;
        }
      }

      if ($request->points_amount) {
        if ($this->verifyPoints($this->getConsumerId($request), $pointsAmount)) {
          $convert_point_amount =  abs($pointsAmount);
          $pointsAmount -=  $convert_point_amount;
          $total -= $convert_point_amount;

          if ($total < 0) {
            $pointsAmount = abs($total);
            $total = 0;
          }

          if ($pointsAmount > 0) {
            $convert_point_amount -= $pointsAmount;
          }

          $convert_point_amount = -$convert_point_amount;
        }
      }

      if ($couponDiscount > 0) {
        $total -= $couponDiscount;
        if ($total < 0) {
          $couponDiscount = abs($total);
          $total = 0;
        }
      }

      $total +=  array_sum($tax) + $shippingTotal;
      $itemTotal = [
        'tax_total' => $this->formatDecimal(array_sum($tax)),
        'shipping_total' => $this->formatDecimal($shippingTotal),
        'points' => $this->formatDecimal($points),
        'convert_point_amount' => abs($this->formatDecimal($convert_point_amount)),
        'points_amount' => $this->formatDecimal($pointsAmount),
        'wallet_balance' => $this->formatDecimal($walletBalance),
        'convert_wallet_balance' => abs($this->formatDecimal($convert_wallet_balance)),
        'coupon_total_discount' => $this->formatDecimal($couponDiscount),
        'sub_total' => $this->formatDecimal($subTotal),
        'total' => $this->formatDecimal($total),
        'is_digital_only' => $this->isDigitalOnly($request->products)
      ];

      $items['total'] = $itemTotal;
      return $items;

    } catch (Exception $e) {

      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }

  public function getTax($product_id, $subtotal)
  {
    $tax = 0;
    $tax_id = $this->getTaxId($product_id);
    $taxRate = $this->getTaxRate($tax_id);
    if ($taxRate) {
      $tax = ($subtotal * $taxRate) / 100;
    }

    return  $tax;
  }
}

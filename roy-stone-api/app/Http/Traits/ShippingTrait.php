<?php

namespace App\Http\Traits;

use App\Models\Address;
use App\Models\Product;
use App\Helpers\Helpers;
use App\Enums\AmountEnum;
use App\Enums\ProductType;
use App\Models\ShippingRule;
use App\Models\Shipping as ShippingModal;

trait ShippingTrait
{
  public function getProductWeight($product_id)
  {
    return Product::where('id', $product_id)->pluck('weight')->first();
  }

  public function isNotFreeShipping($product_id)
  {
    return Product::where('id', $product_id)?->where('is_free_shipping', false)
      ->where('product_type', ProductType::PHYSICAL)
      ->whereNull('deleted_at')->value('id');
  }

  public function getCountryId($shipping_address_id)
  {
    return Address::where('id', $shipping_address_id)->pluck('country_id')->first();
  }

  public function getShipping($shipping_address_id)
  {
    $country_id = $this->getCountryId($shipping_address_id);
    return $this->getShippingByCountryId($country_id);
  }

  public function getShippingByCountryId($country_id)
  {
    return ShippingModal::where('country_id', $country_id)->where('status', true)?->get();
  }

  public function getShippingRules($request, $shippingRule = null)
  {
    if (Helpers::isUserLogin()) {
      $shipping_address_id = $request->shipping_address_id;
      $shippings = $this->getShipping($shipping_address_id);

    } else {
      $country_id = $request->shipping_address['country_id'];
      $shippings = $this->getShippingByCountryId($country_id);
    }

    foreach ($shippings as $shipping) {
      $shippingRule = ShippingRule::where('shipping_id', $shipping->id)->where('status', true)->get();
    }
    return $shippingRule;
  }

  public function isOptimum($value, $shippingRule)
  {
    return (max(min($value, $shippingRule->max), $shippingRule->min) == $value);
  }

  public function baseOnWeight($product, $shippingRule)
  {
    $shippingAmount = 0;
    $productWeight = $this->getProductWeight($product['product_id']);
    $subTotal = Helpers::getSubTotal($product);

    if ($this->isOptimum($productWeight, $shippingRule)) {
      switch ($shippingRule->shipping_type) {

        case AmountEnum::FIXED:
          $shippingAmount += $product['quantity'] * $shippingRule->amount;
          break;

        case AmountEnum::PERCENTAGE:
          $shippingAmount +=  ($subTotal * $shippingRule->amount) / 100;
          break;

        default:
          $shippingAmount = 0;
      }
    }

    return $shippingAmount;
  }

  public function baseOnPrice($product, $shippingRule)
  {
    $shippingAmount = 0;
    $singleProductPrice = Helpers::getSalePrice($product);
    $subTotal = Helpers::getSubTotal($product);

    if ($this->isOptimum($singleProductPrice, $shippingRule)) {
      switch ($shippingRule->shipping_type) {

        case AmountEnum::FIXED:
          $shippingAmount += $product['quantity'] * $shippingRule->amount;
          break;

        case AmountEnum::PERCENTAGE:
          $shippingAmount +=  ($subTotal * $shippingRule->amount) / 100;
          break;

        default:
          $shippingAmount = 0;
      }
    }

    return $shippingAmount;
  }
}

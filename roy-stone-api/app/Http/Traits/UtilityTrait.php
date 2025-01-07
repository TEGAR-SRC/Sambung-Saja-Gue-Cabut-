<?php

namespace App\Http\Traits;

use Exception;
use App\Models\Tax;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Enums\PaymentMethod;
use App\Enums\PaypalCurrencies;
use App\Enums\WalletPointsDetail;
use Illuminate\Support\Facades\Hash;
use App\Events\SignUpBonusPointsEvent;
use App\Http\Traits\WalletPointsTrait;

trait UtilityTrait
{
  use WalletPointsTrait;

  public function getUniqueProducts($products)
  {
    return collect($products)->unique(function ($product) {
      return $product['product_id'] . '-' . $product['variation_id'];
    })->values()->toArray();
  }

  public function verifyOrderUserDetails(Order $order, $request)
  {
    if (!$request->email_or_phone) {
      throw new Exception("Email or phone number is required to track the order.", 422);
    }

    $isVerified = false;
    $userDetails = $order->consumer;
    if ($userDetails) {
      if (is_numeric($request->email_or_phone)) {
        if ($request->email_or_phone == $userDetails->phone) {
          $isVerified = true;
        }
      } elseif (filter_var($request->email_or_phone, FILTER_VALIDATE_EMAIL)) {
        if (!$isVerified && $request->email_or_phone == $userDetails['email']) {
          $isVerified = true;
        }
      }
    }

    return $isVerified;
  }

  public function isEnablePaymentMethod($method)
  {
    $settings = Helpers::getSettings();
    if ($settings['payment_methods'][$method]) {
      if ($settings['payment_methods'][$method]['status']) {
        return true;
      }
    }

    return false;
  }

  public function isPhysicalOnly($products)
  {
    foreach ($products as $product) {
      if (!Helpers::isPhysicalProduct($product['product_id'])) {
        return false;
      }
    }

    return true;
  }

  public function isDigitalOnly($products)
  {
    $_is_digital_only = 1;
    foreach ($products as $product) {
      if (!Helpers::isDigitalProduct($product['product_id'])) {
        return $_is_digital_only = 0;
      }
    }

    return $_is_digital_only;
  }

  public function isActivePaymentMethod($method, $amount = null)
  {
    $settings = Helpers::getSettings();
    if ($this->isEnablePaymentMethod($method)) {
      $defaultCurrencyCode = Helpers::getDefaultCurrencyCode();
      if ($method == PaymentMethod::PAYPAL) {
        if (!in_array($defaultCurrencyCode, array_column(PaypalCurrencies::cases(), 'value'))) {
          throw new Exception($defaultCurrencyCode . ' currency code is not support for ' . $method, 400);
        }
      }

      if ($method == PaymentMethod::PHONEPE) {
        if ($settings['payment_methods'][PaymentMethod::PHONEPE]['sandbox_mode']) {
          if (Helpers::getDefaultCurrencyCode() != 'INR') {
            $amount = Helpers::currencyConvert('INR',$amount);
          }

          if (max(min($amount, 1000), 1) == $amount) {
            return true;
          }

          throw new Exception("In the PhonePe sandbox mode, transactions between 1 to 1000 INR can be processed.", 400);
        }
      }

      return true;
    }

    throw new Exception('The provided payment method is not currently enable.', 400);
  }

  public function formatDecimal($value)
  {
    return Helpers::formatDecimal($value);
  }

  public function getConsumerId($request)
  {
    return $request->consumer_id ?? Helpers::getCurrentUserId();
  }

  public function createUserAddress($user, $address)
  {
    return $user->address()->create($address);
  }

  public function createAccount($request)
  {
    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password),
      'country_code' => $request->country_code,
      'phone'  => (string) $request->phone,
    ]);

    $user->assignRole(RoleEnum::CONSUMER);
    if (Helpers::pointIsEnable()) {
      $settings = Helpers::getSettings();
      $signUpPoints = $settings['wallet_points']['signup_points'];
      $this->creditPoints($user->id, $signUpPoints, WalletPointsDetail::SIGN_UP_BONUS);
      event(new SignUpBonusPointsEvent($user));
      $user->point;
    }

    if (Helpers::walletIsEnable()) {
      $user->wallet()->create();
      $user->wallet;
    }

    return $user;
  }

  public function getTaxId($product_id)
  {
    return Product::where('id', $product_id)->pluck('tax_id')->first();
  }

  public function getTaxRate($tax_id)
  {
    return Tax::where([['id', $tax_id], ['status', true]])->pluck('rate')->first();
  }

  public function isOutOfStock($products)
  {
    $outOfStockProducts = [];
    foreach ($products as $product) {
      if (isset($product['variation_id'])) {
        $variationStock = Helpers::getVariationStock($product['variation_id']);
        if (!isset($variationStock)) {
          $outOfStockProducts[] = [
            'product_id' => $product['product_id'],
            'variation_id' => $product['variation_id'],
          ];
        }
      } else {
        $productStock = Helpers::getProductStock($product['product_id']);
        if (!isset($productStock)) {
          $outOfStockProducts[] = [
            'product_id' => $product['product_id'],
          ];
        }
      }
    }

    if (!empty($outOfStockProducts)) {
      throw new Exception("Some of the products you've selected are either out of stock or inactive.", 400);
    }

    return false;
  }
}

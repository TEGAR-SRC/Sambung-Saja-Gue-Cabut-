<?php

namespace App\Http\Traits;

use Exception;
use Carbon\Carbon;
use App\Models\Coupon;
use App\Helpers\Helpers;

trait CouponTrait
{

  public function updateCouponUsage($coupon_id)
  {
    return Coupon::findOrFail($coupon_id)->decrement('usage_per_coupon');
  }

  public function isValidCoupon($coupon, $amount, $consumer)
  {
    if (Helpers::couponIsEnable()) {
      if ($coupon && $this->isValidSpend($coupon, $amount)) {
        if ($this->isCouponUsable($coupon, $consumer) && $this->isNotExpired($coupon)) {
          return true;
        }
      }

      throw new Exception("To apply coupon code {$coupon->code}, your order total should be {$coupon->min_spend} or higher.", 422);
    }

    throw new Exception('The coupon code cannot be used as the coupon feature is currently disabled.', 422);
  }

  public function isCouponUsable($coupon, $consumer)
  {
    if (!$coupon->is_unlimited) {
      if ($coupon->usage_per_customer) {
        if (!$consumer) {
          throw new Exception("You need to login for applying this coupon code {$coupon->code}.", 422);
        }

        $countUsedPerConsumer = Helpers::getCountUsedPerConsumer($coupon->id, $consumer);
        if ($coupon->usage_per_customer <= $countUsedPerConsumer) {
          throw new Exception("The coupon code {$coupon->code} has reached its maximum usage of {$coupon->usage_per_customer} times per consumer.", 422);
        }
      }

      if ($coupon->usage_per_coupon <= 0) {
        throw new Exception("The coupon code {$coupon->code} can only be used up to {$coupon->usage_per_coupon} times per coupon.", 422);
      }
    }

    return true;
  }

  public function isValidSpend($coupon, $amount)
  {
    return $amount >= $coupon->min_spend;
  }

  public function isNotExpired($coupon)
  {
    if ($coupon->is_expired) {
      if (!$this->isOptimumDate($coupon)) {
        throw new Exception("The coupon code {$coupon->code} was applicable from {$coupon->start_date} to {$coupon->end_date}", 422);
      }
    }

    return true;
  }

  public function isOptimumDate($coupon)
  {
    $currentDate = Carbon::now()->format('Y-m-d');
    if (max(min($currentDate, $coupon->end_date), $coupon->start_date) == $currentDate) {
      return true;
    }

    return false;
  }

  public function isIncludeOrExclude($coupon, $product)
  {
    if ($coupon->is_apply_all) {
      if (isset($coupon->exclude_products)) {
        if (in_array($product['product_id'], array_column($coupon->exclude_products->toArray(), 'id'))) {
          return false;
        }
      }

      return true;
    }

    if (isset($coupon->products)) {
      if (in_array($product['product_id'], array_column($coupon->products->toArray(), 'id'))) {
        return true;
      }
    }

    return false;
  }

  public function fixedDiscount($subtotal, $couponAmount)
  {
    if ($subtotal >= $couponAmount && $subtotal > 0) {
      return $couponAmount;
    }

    return 0;
  }

  public function percentageDiscount($subtotal, $couponAmount)
  {
    if ($subtotal >= $couponAmount && $subtotal > 0) {
      return ($subtotal * $couponAmount) / 100;
    }

    return 0;
  }
}

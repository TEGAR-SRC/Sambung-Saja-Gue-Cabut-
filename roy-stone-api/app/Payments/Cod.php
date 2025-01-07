<?php

namespace  App\Payments;

use Exception;
use App\Models\Order;
use App\Enums\PaymentStatus;
use App\Http\Traits\PaymentTrait;
use App\GraphQL\Exceptions\ExceptionHandler;

class Cod {

  use PaymentTrait;

  public static function status(Order $order, $request)
  {
    try {

      $orderTransactions = $order->order_transactions()->where('order_id', $order->id)->first();
      if ($orderTransactions) {
        $orderTransactions->delete();
      }

      $order = self::updateOrderPaymentMethod($order, $request->payment_method);
      $payment_status = PaymentStatus::PENDING;
      if ($order->is_digital_only) {
        $payment_status = PaymentStatus::COMPLETED;
      }

      return self::updateOrderPaymentStatus($order, $payment_status);

    } catch (Exception $e) {

      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }
}

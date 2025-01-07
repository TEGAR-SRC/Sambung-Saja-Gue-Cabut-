<?php

namespace  App\Payments;

use Exception;
use App\Models\Order;
use App\Enums\PaymentStatus;
use App\Http\Traits\PaymentTrait;
use App\GraphQL\Exceptions\ExceptionHandler;

class BankTransfer {

  use PaymentTrait;

  public static function status(Order $order, $request)
  {
    try {

      $orderTransactions = $order->order_transactions()->where('order_id', $order->id)->first();
      if ($orderTransactions) {
        $orderTransactions->delete();
      }

      $order = self::updateOrderPaymentMethod($order, $request->payment_method);
      return self::updateOrderPaymentStatus($order, PaymentStatus::PENDING);

    } catch (Exception $e) {

      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }
}

<?php

namespace  App\Payments;

use Exception;
use App\Models\Order;
use App\Helpers\Helpers;
use App\Enums\PaymentStatus;
use App\Http\Traits\PaymentTrait;
use App\Http\Traits\TransactionsTrait;
use App\GraphQL\Exceptions\ExceptionHandler;
use Mollie\Laravel\Facades\Mollie as MollieProvider;

class Mollie
{
  use TransactionsTrait, PaymentTrait;

  public static function getIntent(Order $order, $request)
  {
    try {

      $transaction = MollieProvider::api()->payments->create([
        'amount' => [
          'currency' => Helpers::getDefaultCurrencyCode(),
          'value' => Helpers::currencyConvert(Helpers::getDefaultCurrencyCode(),$order?->total)
        ],
        'description' => "Order Number " . $order->order_number,
        'redirectUrl' => self::getReturnURL($order, $request),
        'webhookUrl' => '',
        'metadata' => [
          'order_number' => $order->order_number
        ]
      ]);

      self::storeOrderTransaction($order, $transaction->id, $request->payment_method);
      return [
        'order_number' => $order->order_number,
        'url' => $transaction->getCheckoutUrl(),
        'transaction_id' => $transaction->id,
        'is_redirect' => true,
        'is_guest' => $order?->is_guest,
        'email' => $request['email'] ?? $order?->consumer['email']
      ];
    } catch (Exception $e) {

      self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }

  public static function getPayment($transaction_id)
  {
    return MollieProvider::api()->payments->get($transaction_id);
  }

  public static function getPaymentStatus($payment)
  {
    switch (true) {
      case ($payment->isPaid() && !$payment->hasRefunds() && !$payment->hasChargebacks()):
        return PaymentStatus::COMPLETED;

      case $payment->isOpen():
        return PaymentStatus::PENDING;

      case $payment->isCanceled():
        return PaymentStatus::CANCELLED;

      case ($payment->isFailed() || $payment->hasChargebacks() || $payment->isExpired()):
        return PaymentStatus::FAILED;

      case $payment->hasRefunds():
        return PaymentStatus::REFUNDED;

      default:
        return PaymentStatus::PENDING;
    }
  }

  public static function status(Order $order, $transaction_id)
  {
    try {

      $payment = self::getPayment($transaction_id);
      $status = self::getPaymentStatus($payment);

      return self::updateOrderPaymentStatus($order, $status);

    } catch (Exception $e) {

      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }

  public static function webhookHandler($request)
  {
    try {

      $payment = self::getPayment($request->id);
      $order_number = $payment->metadata->order_number;
      $order = Helpers::getOrderByOrderNumber($order_number);
      $status = self::getPaymentStatus($payment);

      return self::updateOrderPaymentStatus($order, $status);

    } catch (Exception $e) {

      return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
    }
  }
}

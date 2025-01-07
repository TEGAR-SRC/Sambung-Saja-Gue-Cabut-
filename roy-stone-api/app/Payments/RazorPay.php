<?php

namespace  App\Payments;

use Exception;
use Razorpay\Api\Api;
use App\Models\Order;
use App\Helpers\Helpers;
use App\Enums\PaymentStatus;
use App\Enums\RazorPayEvent;
use App\Enums\TransactionStatus;
use App\Http\Traits\PaymentTrait;
use App\Http\Traits\TransactionsTrait;
use App\GraphQL\Exceptions\ExceptionHandler;

class RazorPay {

  use TransactionsTrait, PaymentTrait;

  public static function getProvider()
  {
    return new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));
  }

  public static function getIntent(Order $order, $request)
  {
    try {

      $provider = self::getProvider();
      $transaction = $provider->paymentLink->create([
        'notes' => [
          'order_number'  => $order->order_number
        ],
        'amount' => (Helpers::currencyConvert('INR',$order?->total)*100),
        'currency' => 'INR',
        'callback_url' => self::getReturnURL($order, $request),
        "description" => "Order From ". config('app.name'),
      ]);

      self::storeOrderTransaction($order, $transaction->id, $request->payment_method);
      return [
        'order_number'=> $order->order_number,
        'transaction_id' => $transaction->id,
        'url' => $transaction->short_url,
        'is_redirect' => true,
        'is_guest' => $order?->is_guest,
        'email' => $request['email'] ?? $order?->consumer['email']
      ];

    } catch (Exception $e) {

      self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }

  public static function status(Order $order, $transaction_id)
  {
    try {

      $provider = self::getProvider();
      $payment = $provider->paymentLink->fetch($transaction_id);
      switch ($payment->status) {
        case TransactionStatus::PAID:
          $status = PaymentStatus::COMPLETED;
          break;

        case TransactionStatus::FAILED:
          $status = PaymentStatus::FAILED;
          break;

        default:
          $status = PaymentStatus::PENDING;
      }

      return self::updateOrderPaymentStatus($order, $status);

    } catch (Exception $e) {

      return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
    }
  }

  public static function webhookHandler($request)
  {
    try {

      $provider = self::getProvider();
      $response = @file_get_contents("php://input");
      $signature = $request->header('X-Razorpay-Signature');
      if ($response && $signature) {
        $provider->utility->verifyWebhookSignature($response, $signature, env('RAZORPAY_WEBHOOK_SECRET_KEY'));
      }

      $order = Helpers::getOrderByOrderNumber($request->payload['payment_link']['notes']['order_number']);
      switch ($request->event) {
        case RazorPayEvent::PAID:
          return self::updateOrderPaymentStatus($order,  PaymentStatus::COMPLETED);

        case RazorPayEvent::PARTIALLY_PAID:
          return self::updateOrderPaymentStatus($order,  PaymentStatus::PENDING);

        case RazorPayEvent::CANCELLED:
          return self::updateOrderPaymentStatus($order,  PaymentStatus::CANCELLED);

        default:
          return self::updateOrderPaymentStatus($order,  PaymentStatus::FAILED);
      }

    } catch (Exception $e) {

      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }
}

<?php

namespace  App\Payments;

use Exception;
use Stripe\Webhook;
use App\Models\Order;
use Stripe\StripeClient;
use App\Helpers\Helpers;
use App\Enums\PaymentStatus;
use App\Enums\StripeEvent;
use App\Enums\TransactionStatus;
use App\Http\Traits\PaymentTrait;
use App\Http\Traits\TransactionsTrait;
use App\GraphQL\Exceptions\ExceptionHandler;
use Stripe\Exception\SignatureVerificationException;

class Stripe {

  use TransactionsTrait, PaymentTrait;

  public static function getProvider()
  {
    return new StripeClient(config('stripe.secret_key'));
  }

  public static function getIntent(Order $order, $request)
  {
    try {

      $provider = self::getProvider();
      $transaction = $provider->checkout->sessions->create([
        'success_url' => self::getReturnURL($order, $request),
        'cancel_url' => self::getReturnURL($order, $request),
        'metadata' => [
          'order_number' => $order->order_number
        ],
        'line_items' => [
          [
            'price_data' => [
            'currency' => Helpers::getDefaultCurrencyCode(),
            'product_data' => [
                'name' => config('app.name')
              ],
              'unit_amount' => Helpers::currencyConvert(Helpers::getDefaultCurrencyCode(),$order?->total)*100,
            ],
            'quantity' => 1,
          ]
        ],
        'mode' => 'payment',
      ]);

      self::storeOrderTransaction($order, $transaction->id, $request->payment_method);
      return [
        'order_number'=> $order->order_number,
        'url' => $transaction->url,
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

  public static function status(Order $order, $transaction_id)
  {
    try {

      $provider = self::getProvider();
      $payment = $provider->checkout->sessions->retrieve($transaction_id);

      switch ($payment->payment_status) {
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

  public static function webhookHandler()
  {
    try {

      $response = @file_get_contents("php://input");
      $signature = $_SERVER['HTTP_STRIPE_SIGNATURE'];
      $webhook_secret = env('STRIPE_WEBHOOK_SECRET_KEY');

      $event = Webhook::constructEvent($response, $signature, $webhook_secret);
      $order = Helpers::getOrderByOrderNumber($event->data->object->metadata->order_number);

      switch ($event->type) {
        case StripeEvent::COMPLETED:
        case StripeEvent::ASYNC_PAYMENT_SUCCEEDED:
          return self::updateOrderPaymentStatus($order, PaymentStatus::COMPLETED);

        case (StripeEvent::ASYNC_PAYMENT_FAILED || StripeEvent::EXPIRED):
          return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);

        default:
          return self::updateOrderPaymentStatus($order, $event->type);
      }

    } catch (SignatureVerificationException $e) {

      throw new Exception(__('errors.signature_verification_failed'), 400);

    } catch (Exception $e) {

      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }
}

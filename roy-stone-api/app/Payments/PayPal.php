<?php

namespace  App\Payments;

use Exception;
use App\Models\Order;
use App\Helpers\Helpers;
use App\Enums\PaypalEvent;
use Illuminate\Support\Str;
use App\Enums\PaymentStatus;
use App\Http\Traits\PaymentTrait;
use App\Http\Traits\TransactionsTrait;
use App\GraphQL\Exceptions\ExceptionHandler;
use Srmklive\PayPal\Facades\PayPal as PayPalProvider;

class PayPal {

  use TransactionsTrait, PaymentTrait;

  public static function getProvider()
  {
    $provider = PayPalProvider::setProvider(config('paypal'));
    $token = $provider->getAccessToken();
    $provider->setAccessToken($token);

    return $provider;
  }

  public static function getIntent(Order $order, $request)
  {
    try {

      $provider = self::getProvider();
      $provider->setRequestHeader("PayPal-Request-Id", Str::uuid());
      $transaction = $provider->createOrder([
        "intent" => "CAPTURE",
        "purchase_units" => [
          [
            "invoice_id" => $order->order_number,
            "amount" => [
              "currency_code" => Helpers::getDefaultCurrencyCode(),
              "value"   => Helpers::roundNumber($order->total),
            ],
            "description" => "Order From ". config('app.name'),
          ]
        ],
        "application_context" => [
          "brand_name" => config('app.name'),
          'user_action'   => 'PAY_NOW',
          'payment_method' => [
            'payer_selected' => 'PAYPAL',
            'payee_preferred' => 'IMMEDIATE_PAYMENT_REQUIRED'
          ],
          "cancel_url" => self::getReturnURL($order, $request),
          "return_url" => self::getReturnURL($order, $request),
        ]
      ]);

      if (isset($transaction['error'])) {
        throw new Exception($transaction['error']['message'], 500);
      }

      if (!self::verifyOrderTransaction($order->id, $transaction['id'])) {
        self::storeOrderTransaction($order, $transaction['id'], $request->payment_method);
      }

      return [
        'order_number'=> $order->order_number,
        'url' => next($transaction['links'])['href'],
        'transaction_id' => $transaction['id'],
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
      $payment = $provider->capturePaymentOrder($transaction_id);

      if (isset($payment['status'])) {
        return self::updateOrderPaymentStatus($order, $payment['status']);
      }

      if (isset($payment['error'])) {
        if (head($payment['error']['details'])['issue'] == 'ORDER_ALREADY_CAPTURED') {
          return $order;
        }

        if (head($payment['error']['details'])['issue'] == 'INVALID_RESOURCE_ID') {
          return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
        }

        throw new Exception(head($payment['error']['details'])['issue'], 500);
      }

    } catch (Exception $e) {

      return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
    }
  }

  public static function webhookHandler($request)
  {
    try {

      $provider =self::getProvider();
      $payload = [
        'auth_algo'         => $request->header('PAYPAL-AUTH-ALGO', null),
        'cert_url'          => $request->header('PAYPAL-CERT-URL', null),
        'transmission_id'   => $request->header('PAYPAL-TRANSMISSION-ID', null),
        'transmission_sig'  => $request->header('PAYPAL-TRANSMISSION-SIG', null),
        'transmission_time' => $request->header('PAYPAL-TRANSMISSION-TIME', null),
        'webhook_id'        => config('paypal.webhook_id'),
        'webhook_event'     => $request->all()
      ];

      $event = $provider->verifyWebHook($payload);
      if (!isset($event["verification_status"])) {
        throw new Exception($event["error"]["name"], 500);
      }

      $order = Helpers::getOrderByOrderNumber($request->resource["invoice_id"]);
      switch ($request->event_type) {
        case PaypalEvent::COMPLETED:
          return self::updateOrderPaymentStatus($order, PaymentStatus::COMPLETED);

        case PaypalEvent::PENDING:
          return self::updateOrderPaymentStatus($order, PaymentStatus::PENDING);

        case PaypalEvent::REFUNDED:
          return self::updateOrderPaymentStatus($order, PaymentStatus::REFUNDED);

        case PaypalEvent::DECLINED:
        case PaypalEvent::CANCELLED:
          return self::updateOrderPaymentStatus($order, PaymentStatus::CANCELLED);

        default:
          return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
      }

    } catch (Exception $e) {

      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }
}

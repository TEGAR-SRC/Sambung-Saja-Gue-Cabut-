<?php

namespace  App\Payments;

use Exception;
use App\Models\Order;
use App\Helpers\Helpers;
use App\Enums\PaymentStatus;
use App\Http\Traits\PaymentTrait;
use App\Http\Traits\TransactionsTrait;
use App\GraphQL\Exceptions\ExceptionHandler;

class bKash {

  use TransactionsTrait, PaymentTrait;

  public static function getPaymentUrl()
  {
    $payment_base_url = 'https://tokenized.pay.bka.sh/v1.2.0-beta';
    if (env('BKASH_SANDBOX_MODE')) {
      $payment_base_url = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta';
    }

    return $payment_base_url;
  }

  public static function getProvider()
  {
    $provider = [
      'app_key' => env('BKASH_APP_KEY'),
      'app_secret' => env('BKASH_APP_SECRET'),
    ];

    $curl = curl_init(self::getPaymentUrl()."/tokenized/checkout/token/grant");
    $token = json_encode($provider);
    $header = array(
      'Content-Type:application/json',
      "username:".env('BKASH_USERNAME'),
      "password:".env('BKASH_PASSWORD')
    );

    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $token);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
  }

  public static function getIntent(Order $order, $request)
  {
    try {

      $provider = self::getProvider();
      if (is_array($provider) && !is_null($provider)) {
        $providerId = $provider['id_token'];
        $intent = [
          'mode' => '0011',
          'amount' => Helpers::currencyConvert('BDT',round($order?->total, 2)),
          'currency' => 'BDT',
          'intent' => 'sale',
          'payerReference' => $order?->consumer?->phone,
          'merchantInvoiceNumber' => $order?->order_number,
          'callbackURL' => self::getReturnURL($order, $request)
        ];

        $header = [
          'Content-Type:application/json',
          'authorization:'.$providerId,
          'x-app-key:'.env('BKASH_APP_KEY')
        ];

        $curl = curl_init(self::getPaymentUrl()."/tokenized/checkout/create");
        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $intent);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($curl, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        $payment = json_decode($response);
        if (!is_null($err)) {
          throw new Exception($err,500);
        } else {
          if (isset($payment->bkashURL) && $payment->statusMessage == 'Successful') {
            if (!self::verifyOrderTransaction($order?->id, $payment->paymentID)) {
              self::storeOrderTransaction($order, $payment->paymentID, $request->payment_method);
            }
            return [
              'order_number'=> $order->order_number,
              'url' => $payment?->bkashURL,
              'transaction_id' => $payment->paymentID,
              'is_redirect' => true,
              'is_guest' => $order?->is_guest,
              'email' => $request->email ?? $order?->consumer['email']
            ];
          }
        }
      }

    } catch (Exception $e) {

      self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }

  public static function status(Order $order, $transaction_id)
  {
    try {

      $provider = self::getProvider();
      $providerId = $provider['id_token'];
      $intent = [
        'paymentID' => $transaction_id
      ];

      $request_body = json_encode($intent);
      $header = [
        'Content-Type:application/json',
        'authorization:'.$providerId,
        'x-app-key:'.env('BKASH_APP_KEY')
      ];

      $curl = curl_init(self::getPaymentUrl().'/tokenized/checkout/execute');
      curl_setopt($curl,CURLOPT_HTTPHEADER, $header);
      curl_setopt($curl,CURLOPT_CUSTOMREQUEST, "POST");
      curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl, CURLOPT_POSTFIELDS, $request_body);
      curl_setopt($curl,CURLOPT_FOLLOWLOCATION, 1);
      $result = curl_exec($curl);
      $payment = json_decode($result);
      curl_close($curl);
      $err = curl_error($curl);

      if ($payment->statusCode == '0000' && $payment->statusMessage == 'Successful') {
        if ($payment->agreementStatus == 'Completed' ) {
          return self::updateOrderPaymentStatus($order, PaymentStatus::COMPLETED);
        } else if (isset($err) && !empty($err)) {
          throw new Exception($err,500);
        } else {
          return $order;
        }
      }

      throw new Exception($payment, 500);

    } catch (Exception $e) {

      return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
    }
  }
}

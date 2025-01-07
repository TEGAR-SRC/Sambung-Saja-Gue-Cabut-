<?php

namespace  App\Payments;

use Exception;
use App\Models\Order;
use App\Helpers\Helpers;
use App\Enums\PaymentStatus;
use App\Http\Traits\PaymentTrait;
use App\Http\Traits\TransactionsTrait;
use App\GraphQL\Exceptions\ExceptionHandler;

class Paystack {

  use TransactionsTrait, PaymentTrait;

  public static function getPaymentUrl()
  {
    $payment_base_url = env('PAYSTACK_PAYMENT_URL');
    if (env('PAYSTACK_SANDBOX_MODE')) {
      $payment_base_url = 'https://api.paystack.co';
    }

    return $payment_base_url;
  }

  public static function getIntent(Order $order, $request)
  {
    try {

      $url = self::getPaymentUrl()."/transaction/initialize";
      $intent = [
        'name' => $order?->consumer['name'],
        'email' => $order?->consumer['email'],
        'amount' => Helpers::currencyConvert(Helpers::getDefaultCurrencyCode(),$order?->total)*100,
        'currency' => 'NGN',
        'callback_url' =>  self::getReturnURL($order, $request),
        'order_number' => $order->order_number
      ];

      $fields = http_build_query($intent);
      $ch = curl_init();
      curl_setopt($ch,CURLOPT_URL, $url);
      curl_setopt($ch,CURLOPT_POST, true);
      curl_setopt($ch,CURLOPT_POSTFIELDS, $fields);
      curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Authorization: Bearer ".env('PAYSTACK_SECRET_KEY'),
        "Cache-Control: no-cache",
      ));

      curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
      $response = curl_exec($ch);
      $err = curl_error($ch);
      $payment = json_decode($response);

      if ($payment->status && empty($err)) {
        $paymentUrl = $payment->data?->authorization_url;
        $transaction_id = $payment->data?->reference;
          if (!self::verifyOrderTransaction($order?->id,  $transaction_id)) {
            self::storeOrderTransaction($order, $transaction_id, $request->payment_method);
          }

          return [
            'order_number'=> $order->order_number,
            'url' => $paymentUrl,
            'transaction_id' => $transaction_id,
            'is_redirect' => true,
            'is_guest' => $order?->is_guest,
            'email' => $request['email'] ?? $order?->consumer['email']
          ];
      }

      throw new Exception($err,500);

    } catch (Exception $e) {

      self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }

  public static function status(Order $order, $transaction_id)
  {
    try {

      $curl = curl_init();
      curl_setopt_array($curl, array(
        CURLOPT_URL => self::getPaymentUrl()."/transaction/verify/".$transaction_id,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
          "Authorization: Bearer ".env('PAYSTACK_SECRET_KEY'),
          "Cache-Control: no-cache",
        ),
      ));

      $response = curl_exec($curl);
      $err = curl_error($curl);
      $payment = json_decode($response);
      curl_close($curl);

      if ($payment?->status && empty($err)) {
        if ($payment?->data?->status == 'success' && $payment?->data?->gateway_response == 'Successful') {
          return self::updateOrderPaymentStatus($order, PaymentStatus::COMPLETED);
        }

        return self::updateOrderPaymentStatus($order, PaymentStatus::PENDING);
      }

      return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);

    } catch (Exception $e) {

      return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
    }
  }
}

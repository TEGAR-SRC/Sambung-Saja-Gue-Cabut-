<?php

namespace  App\Payments;

use Exception;
use App\Models\Order;
use App\Helpers\Helpers;
use App\Enums\PaymentStatus;
use App\Http\Traits\PaymentTrait;
use App\Http\Traits\TransactionsTrait;
use App\GraphQL\Exceptions\ExceptionHandler;

class PhonePe {

  use TransactionsTrait, PaymentTrait;

  public static function getPaymentUrl()
  {
    $payment_base_url = 'https://api.phonepe.com/apis/hermes';
    if (env('PHONEPE_SANDBOX_MODE')) {
      $payment_base_url = 'https://api-preprod.phonepe.com/apis/pg-sandbox';
    }

    return $payment_base_url;
  }

  public static function getIntent(Order $order, $request)
  {
    try {

      $transaction_id = uniqid();
      $intent = [
        'merchantId' => env('PHONEPE_MERCHANT_ID'),
        'merchantTransactionId' => $transaction_id,
        'merchantUserId' => $order?->consumer_id,
        "merchantOrderId"=>$order->order_number,
        'amount' => (Helpers::currencyConvert('INR',$order?->total)*100),
        'redirectUrl' =>  self::getReturnURL($order, $request),
        'callbackUrl' =>  self::getReturnURL($order, $request),
        'mobileNumber' => $order?->consumer['phone'],
        'redirectMode' => 'POST',
        'paymentInstrument' => [
          'type' => 'PAY_PAGE'
        ]
      ];

      $payloadMain = base64_encode(json_encode($intent));
      $string = $payloadMain.'/pg/v1/pay'.env('PHONEPE_SALT_KEY');
      $sha256 = hash('sha256',$string);

      $x_header = $sha256 . '###' . env('PHONEPE_SALT_INDEX');
      $intent = json_encode(array('request'=> $payloadMain));

      $curl = curl_init();
      curl_setopt_array($curl, [
        CURLOPT_URL => self::getPaymentUrl()."/pg/v1/pay",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => $intent,
        CURLOPT_HTTPHEADER => [
          "Content-Type: application/json",
          "X-VERIFY: " . $x_header,
          "accept: application/json"
        ],
      ]);

      $response = curl_exec($curl);
      $err = curl_error($curl);

      curl_close($curl);
      if (!is_null($err) && $err) {
        throw new Exception($err,500);
      } else {
        $res = json_decode($response);
        if(isset($res->success) && $res->success=='1'){
          $paymentUrl=$res?->data?->instrumentResponse?->redirectInfo->url;
          if (!self::verifyOrderTransaction($order?->id, $transaction_id)) {
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
      }

    } catch (Exception $e) {

      self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }

  public static function status(Order $order, $transaction_id)
  {
    try {

      $x_header = hash('sha256', '/pg/v1/status/'.env('PHONEPE_MERCHANT_ID')."/{$transaction_id}".env('PHONEPE_SALT_KEY')) . '###'.env('PHONEPE_SALT_INDEX');
      $curl = curl_init();
      curl_setopt_array($curl, [
        CURLOPT_URL => self::getPaymentUrl()."/pg/v1/status/".env('PHONEPE_MERCHANT_ID').'/'.$transaction_id,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
          "Content-Type: application/json",
          "X-VERIFY: " . $x_header,
          "X-MERCHANT-ID:". env('PHONEPE_MERCHANT_ID'),
        ],
      ]);

      $response = curl_exec($curl);
      $response = json_decode($response,true);
      $err = curl_error($curl);
      curl_close($curl);

      if (isset($response['code']) && $response['code'] == "PAYMENT_SUCCESS") {
        return self::updateOrderPaymentStatus($order, PaymentStatus::COMPLETED);
      } else if (isset($err) && !empty($err)) {
        throw new Exception($err,500);
      } else if (is_null($response) || empty($err)) {
        return $order;
      }

      throw new Exception($response, 500);

    } catch (Exception $e) {

      return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
    }
  }
}

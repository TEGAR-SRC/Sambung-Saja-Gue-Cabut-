<?php

namespace  App\Payments;

use Exception;
use App\Models\Order;
use App\Helpers\Helpers;
use App\Enums\PaymentStatus;
use App\Models\OrderTransaction;
use App\Http\Traits\PaymentTrait;
use App\Http\Traits\TransactionsTrait;
use App\GraphQL\Exceptions\ExceptionHandler;

class InstaMojo {

  use TransactionsTrait, PaymentTrait;

  public static function getPaymentUrl()
  {
    $payment_base_url = 'https://api.instamojo.com';
    if (env('INSTAMOJO_SANDBOX_MODE')) {
      $payment_base_url = 'https://test.instamojo.com';
    }

    return $payment_base_url;
  }

  public static function getProvider()
  {
    $ch = curl_init();
    $url = self::getPaymentUrl(). '/oauth2/token/';
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
    $credentials = array(
        'grant_type' => 'client_credentials',
        'client_id' => env('INSTAMOJO_CLIENT_ID'),
        'client_secret' => env('INSTAMOJO_CLIENT_SECRET')
    );

    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($credentials));
    $result = curl_exec($ch);

    curl_close($ch);
    $response = json_decode($result);

    if (isset($response?->error)) {
      throw new Exception($response?->error, 500);
    }

    $accessToken = $response?->access_token;
    return $accessToken;
  }

  public static function getIntent(Order $order, $request)
  {
    try {

      $accessToken = 'Bearer ' .self::getProvider();
      $url = self::getPaymentUrl() . '/v2/payment_requests/';
      $webhook_url =  env('APP_URL').'/instamojo/webhook';
      $parsed_url = parse_url($webhook_url);
      if (isset($parsed_url['host'])) {
        if ($parsed_url['host'] == 'localhost' || $parsed_url['host'] == '127.0.0.1') {
          $webhook_url  = '';
        }
      }

      $intent = [
        'purpose' => 'Order #'. $order?->order_number,
        'amount' => Helpers::currencyConvert('INR',$order?->total),
        'buyer_name' => $order?->consumer['name'],
        'email' => $order?->consumer['email'],
        'redirect_url' => self::getReturnURL($order, $request),
        'send_email' => 'True',
        'webhook' => $webhook_url,
        'allow_repeated_payments' => 'False',
      ];

      $curl = curl_init();
      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_HEADER, FALSE);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($curl, CURLOPT_FOLLOWLOCATION, TRUE);
      curl_setopt($curl, CURLOPT_HTTPHEADER, array("Authorization: $accessToken"));
      curl_setopt($curl, CURLOPT_POST, true);
      curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($intent));

      $response = curl_exec($curl);
      $err = curl_error($curl);
      curl_close($curl);

      $response = json_decode($response);
      if ($err || isset($response?->error)) {
        throw new Exception($err,500);
      } else {

        if (!self::verifyOrderTransaction($order?->id, $response?->id)) {
          self::storeOrderTransaction($order, $response?->id, $request->payment_method);
        }

        return [
          'order_number'=> $order->order_number,
          'url' => $response?->longurl,
          'transaction_id' => $response?->id,
          'is_redirect' => true,
          'is_guest' => $order?->is_guest,
          'email' => $request['email'] ?? $order?->consumer['email']
        ];
      }

    } catch (Exception $e) {

      self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }

  public static function status(Order $order, $transaction_id)
  {
    try {

      $accessToken = 'Bearer ' .self::getProvider();
      $url = self::getPaymentUrl() . '/v2/payment_requests/'. $transaction_id;

      $curl = curl_init();
      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_HEADER, FALSE);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($curl, CURLOPT_FOLLOWLOCATION, TRUE);
      curl_setopt($curl, CURLOPT_HTTPHEADER, array("Authorization: $accessToken"));

      $response = curl_exec($curl);
      $response = json_decode($response,true);
      $err = curl_error($curl);
      curl_close($curl);

      if ($err) {
        throw new Exception($err,500);
      } else {
        if (isset($response['status'])) {
          if ($response['status'] == 'Completed') {
            return self::updateOrderPaymentStatus($order, PaymentStatus::COMPLETED);
          }
        }
      }

      throw new Exception($response, 500);

    } catch (Exception $e) {

      return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
    }
  }

  public static function webhookHandler($request)
  {
    try {

      $data = $_POST;
      if (!isset($data['mac'])) {
        $data = $request;
      }

      if (isset($data['mac'])) {
        $mac_provided = $data['mac'];
        unset($data['mac']);
        $ver = explode('.', phpversion());
        $major = (int) head($ver);
        $minor = (int) next($ver);

        if ($major >= 5 and $minor >= 4){
          ksort($data, SORT_STRING | SORT_FLAG_CASE);
        }
        else {
          uksort($data, 'strcasecmp');
        }

        $mac_calculated = hash_hmac("sha1", implode("|", $data), env('INSTAMOJO_SALT_KEY'));
        $order_id = OrderTransaction::where('transaction_id', $data['payment_request_id'])->pluck('order_id')->first();
        $order = Order::where('id', $order_id)->first();

        if ($mac_provided == $mac_calculated) {
          if (isset($data['status'])) {
            if ($data['status'] == PaymentStatus::CREDIT){
              return self::updateOrderPaymentStatus($order, PaymentStatus::COMPLETED);
            }
          }

          return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
        }

        throw new Exception(__('errors.invalid_mac'), 500);
      }

    } catch (Exception $e) {

      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }
}

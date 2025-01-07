<?php

namespace  App\Payments;

use Exception;
use App\Models\Order;
use App\Helpers\Helpers;
use App\Enums\PaymentStatus;
use App\Http\Traits\PaymentTrait;
use App\Http\Traits\TransactionsTrait;
use App\GraphQL\Exceptions\ExceptionHandler;

class FlutterWave {

  use TransactionsTrait, PaymentTrait;

  public static function getIntent(Order $order, $request)
  {
    try {

      $transaction_id = uniqid();
      $data = [
        'return_url' => self::getReturnURL($order, $request),
        'cancel_url' => self::getReturnURL($order, $request),
        'order_number' => $order->order_number
      ];

      $intent = [
        'tx_ref' => time(),
        'amount' => Helpers::currencyConvert(Helpers::getDefaultCurrencyCode(),$order?->total),
        'currency' => Helpers::getDefaultCurrencyCode(),
        "payment_options"=> 'card',
        'redirect_url' =>  route('flutterwave.status', $data),
        'customer' =>  [
          'email' => $order?->consumer['email'],
          'name' => $order?->consumer['name']
        ],
        'meta' => [
          'price' => Helpers::roundNumber($order?->total)
        ],
        'customizations' => [
          'title' => 'Pay Way '.config('app.name'),
          'description' => ''
        ]
      ];

      $curl = curl_init();
      curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://api.flutterwave.com/v3/payments',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
          CURLOPT_POSTFIELDS => json_encode($intent),
          CURLOPT_HTTPHEADER => array(
              'Authorization: Bearer ' . env('FLW_SECRET_KEY'),
              'Content-Type: application/json'
          ),
      ));

      $response = curl_exec($curl);
      $err = curl_error($curl);
      curl_close($curl);
      $payment = json_decode($response);
      if ($payment?->status == 'success' && empty($err)) {
        $paymentUrl = $payment->data?->link;
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
      } else if ($payment?->status == 'error') {
        throw new Exception($payment?->message, 500);
      }

      throw new Exception($err,500);

    } catch (Exception $e) {

      self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }

  public static function webhookHandler($request)
  {
    try {

      $order = Helpers::getOrderByOrderNumber($request->order_number);
      if ($request->status == 'successful') {
        $transaction_id = $request->transaction_id;
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_URL => "https://api.flutterwave.com/v3/transactions/{$transaction_id}/verify",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "GET",
                CURLOPT_HTTPHEADER => array(
                    "Content-Type: application/json",
                    "Authorization: Bearer " . env('FLW_SECRET_KEY'),
                ),
            ));
            $response = curl_exec($curl);
            $err = curl_error($curl);
            curl_close($curl);

            $payment = json_decode($response);

            $order->order_transactions()->update([
              'transaction_id' => $transaction_id
            ]);

            if ($payment?->data?->status == 'successful' && empty($err)) {
              self::updateOrderPaymentStatus($order, PaymentStatus::COMPLETED);
            }
      } else {
        self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
      }

      return redirect()->away(self::getReturnURL($order, $request));

    } catch (Exception $e) {

      return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
    }
  }
}

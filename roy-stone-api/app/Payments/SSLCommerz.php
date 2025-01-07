<?php

namespace  App\Payments;

use Exception;
use App\Models\Order;
use App\Helpers\Helpers;
use App\Enums\PaymentStatus;
use App\Http\Traits\PaymentTrait;
use App\Http\Traits\TransactionsTrait;
use App\GraphQL\Exceptions\ExceptionHandler;

class SSLCommerz {

  use TransactionsTrait, PaymentTrait;

  public static function getPaymentUrl()
  {
    $payment_base_url = 'https://securepay.sslcommerz.com';
    if (env('SSLC_SANDBOX_MODE')) {
      $payment_base_url = 'https://sandbox.sslcommerz.com';
    }

    return $payment_base_url;
  }

  public static function getIntent(Order $order, $request)
  {
    try {

      $transaction_id = uniqid();
      $url = self::getPaymentUrl()."/gwprocess/v4/api.php";
      $data = [
        'return_url' => self::getReturnURL($order, $request),
        'cancel_url' => self::getReturnURL($order, $request),
        'order_number' => $order->order_number
      ];

      $intent = [
        'store_id' => env('SSLC_STORE_ID'),
        'store_passwd' => env('SSLC_STORE_PASSWORD'),
        'total_amount' => Helpers::currencyConvert(Helpers::getDefaultCurrencyCode(),$order?->total),
        'currency' => Helpers::getDefaultCurrencyCode(),
        'tran_id' => uniqid(),
        'success_url' => route('sslcommerz.webhook', $data),
        'cancel_url' =>  route('sslcommerz.webhook', $data),
        'cus_name' => $order?->consumer['name'],
        'cus_email' => $order?->consumer['email'],
        'cus_add1' => 'N/A',
        'cus_add2' =>  "",
        'cus_city' => "",
        'cus_state' => "",
        'cus_postcode' => "",
        'cus_country' => "",
        'cus_phone' => "N/A",
        'cus_fax' => "",
        'ship_name' => 'N/A',
        'ship_add1' => 'N/A',
        'ship_add2' => 'N/A',
        'ship_city' => 'N/A',
        'ship_state' =>  'N/A',
        'ship_postcode' => 'N/A',
        'ship_phone' =>  'N/A',
        'ship_country' => 'N/A',
        'shipping_method' => 'NO',
        'product_name' => 'N/A',
        'product_category' => 'N/A',
        'product_profile' =>  'service',
      ];

      $handle = curl_init();
      curl_setopt($handle, CURLOPT_URL, $url );
      curl_setopt($handle, CURLOPT_TIMEOUT, 30);
      curl_setopt($handle, CURLOPT_CONNECTTIMEOUT, 30);
      curl_setopt($handle, CURLOPT_POST, 1 );
      curl_setopt($handle, CURLOPT_POSTFIELDS, $intent);
      curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, FALSE);

      $response = curl_exec($handle);
      $err = curl_error($handle);
      $code = curl_getinfo($handle, CURLINFO_HTTP_CODE);
      curl_close($handle);

      $payment = json_decode($response);
      if ($payment->status == 'SUCCESS' && empty($err)) {
        if (!self::verifyOrderTransaction($order?->id, $transaction_id)) {
          self::storeOrderTransaction($order, $transaction_id, $request->payment_method);
        }

        return [
          'order_number'=> $order->order_number,
          'url' => $payment->redirectGatewayURL,
          'transaction_id' => $transaction_id,
          'is_redirect' => true,
          'is_guest' => $order?->is_guest,
          'email' => $request['email'] ?? $order?->consumer['email']
        ];
      }

      return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);

    } catch (Exception $e) {

      return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
    }
  }

  public static function webhookHandler($request)
  {
    try {

      $payment = $request->all();
      $order = Helpers::getOrderByOrderNumber($payment['order_number']);
      if (!empty($payment) && isset($payment['tran_id'])) {
        $order->order_transactions()->update([
          'transaction_id' => $payment['tran_id']
        ]);
        if ($payment['status'] == 'VALID' && !$payment['error']) {
          self::updateOrderPaymentStatus($order, PaymentStatus::COMPLETED);

        } else if ($payment['status'] == 'UNATTEMPTED') {
          self::updateOrderPaymentStatus($order, PaymentStatus::PENDING);
        }

        return redirect()->away(self::getReturnURL($order, $request));
      }

      self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
      return redirect()->away($payment['cancel_url']);

    } catch (Exception $e) {

      self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }
}

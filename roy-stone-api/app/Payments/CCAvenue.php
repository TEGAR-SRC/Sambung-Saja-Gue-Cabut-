<?php

namespace  App\Payments;

use Exception;
use App\Models\Order;
use App\Helpers\Helpers;
use App\Enums\PaymentStatus;
use App\Http\Traits\PaymentTrait;
use App\Http\Traits\TransactionsTrait;
use App\GraphQL\Exceptions\ExceptionHandler;

class CCAvenue {

  use TransactionsTrait, PaymentTrait;

  public static function getPaymentUrl()
  {
    $payment_base_url = 'https://secure.ccavenue.com';
    if (env('CCAVENUE_SANDBOX_MODE')) {
      $payment_base_url = 'https://test.ccavenue.com';
    }

    return $payment_base_url;
  }

  public static function getIntent(Order $order, $request)
  {
    try {

      $transaction_id = uniqid();
      $merchant_data = "";
      $data = [
        'return_url' => self::getReturnURL($order, $request),
        'cancel_url' => self::getReturnURL($order, $request),
        'order_number' => $order->order_number
      ];

      $amount = Helpers::currencyConvert('INR',$order?->total);
      if (env('CCAVENUE_SANDBOX_MODE')) {
        $amount = 1.0;
      }

      $intent = [
        'merchant_id' => env('CCAVENUE_MERCHANT_ID'),
        'order_id' => $order->order_number,
        'amount' => $amount,
        'currency' => 'INR',
        'redirect_url' => route('ccavenue.webhook', $data),
        'cancel_url' => route('ccavenue.webhook', $data),
        'language' => 'EN',
      ];

      foreach ($intent as $key => $value) {
        $merchant_data .= $key . '=' . $value . '&';
      }

      $encrypted_data = self::encryptCC($merchant_data,  env('CCAVENUE_WORKING_KEY'));
      $url = self::getPaymentUrl() . '/transaction/transaction.do?command=initiateTransaction&encRequest=' .  $encrypted_data . '&access_code=' . env('CCAVENUE_ACCESS_CODE');

      if (!self::verifyOrderTransaction($order?->id, $transaction_id)) {
        self::storeOrderTransaction($order, $transaction_id, $request->payment_method);
      }

      return [
        'order_number'=> $order->order_number,
        'url' => $url,
        'transaction_id' => $transaction_id,
        'is_redirect' => true,
        'is_guest' => $order?->is_guest,
        'email' => $request['email'] ?? $order?->consumer['email']
      ];

    } catch (Exception $e) {

      return self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
    }
  }

  public static function encryptCC($plainText, $key)
  {
    $key = self::hextobin(md5($key));
    $initVector = pack("C*", 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f);
    $openMode = openssl_encrypt($plainText, 'AES-128-CBC', $key, OPENSSL_RAW_DATA, $initVector);
    $encryptedText = bin2hex($openMode);
    return $encryptedText;
  }

  public static function decryptCC($encryptedText, $key)
  {
    $key = self::hextobin(md5($key));
    $initVector = pack("C*", 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f);
    $encryptedText = self::hextobin($encryptedText);
    $decryptedText = openssl_decrypt($encryptedText, 'AES-128-CBC', $key, OPENSSL_RAW_DATA, $initVector);
    return $decryptedText;
  }

  public static function pkcs5_padCC($plainText, $blockSize)
  {
      $pad = $blockSize - (strlen($plainText) % $blockSize);
      return $plainText . str_repeat(chr($pad), $pad);
  }

  public static function hextobin($hexString)
  {
      $length = strlen($hexString);
      $binString = "";
      $count = 0;
      while ($count < $length) {
          $subString = substr($hexString, $count, 2);
          $packedString = pack("H*", $subString);
          if ($count == 0) {
              $binString = $packedString;
          } else {
              $binString .= $packedString;
          }

          $count += 2;
      }
      return $binString;
  }

  public static function webhookHandler($request)
  {
    try {

      error_reporting(0);
      $encPaymentRes = $request->encResp;
      $decPaymentRes = self::decryptCC($encPaymentRes, env('CCAVENUE_WORKING_KEY'));
      $paymentValues = explode('&', $decPaymentRes);

      for ($i = 0; $i < sizeof($paymentValues); $i++) {
        $payment = explode('=', $paymentValues[$i]);
        if ($i == 0) $order_id = next($payment);
        if ($i == 2) $transaction_id = next($payment);
        if ($i == 3) $payment_status = next($payment);
      }

      $order = Helpers::getOrderByOrderNumber($order_id);
      $order->order_transactions()->update([
        'transaction_id' => $transaction_id
      ]);

      if ($payment_status === PaymentStatus::SUCCESS) {
        self::updateOrderPaymentStatus($order, PaymentStatus::COMPLETED);
        return redirect()->away(self::getReturnURL($order, $request));
      }

      if ($payment_status === PaymentStatus::FAILURE || $payment_status === PaymentStatus::ABORTED) {
        self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
      }

      return redirect()->away($request->cancel_url);

    } catch (Exception $e) {

      self::updateOrderPaymentStatus($order, PaymentStatus::FAILED);
      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }
}

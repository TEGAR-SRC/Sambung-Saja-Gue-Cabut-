<?php
namespace App\Http\Traits;

use App\Models\Order;
use App\Helpers\Helpers;
use App\Models\OrderTransaction;

trait PaymentTrait {

  use UtilityTrait;

  public static function updateOrderPaymentStatus(Order $order, $status)
  {
    $order->update([
      'payment_status' => $status
    ]);

    Order::where('parent_id', $order->id)->update(['payment_status' => $status]);
    $order = $order->fresh();

    Helpers::updateProductStock($order);
    return $order;
  }

  public static function updateOrderPaymentMethod(Order $order, $method)
  {
    $order->update([
      'payment_method' => $method
    ]);

    $order = $order->fresh();
    return $order;
  }

  public static function storeOrderTransaction(Order $order, $transaction_id,$payment_method) : void
  {
    $order = self::updateOrderPaymentMethod($order, $payment_method);
    $order->order_transactions()->updateOrCreate(['order_id' => $order->id],
      ['transaction_id' => $transaction_id],
    );
  }

  public static function verifyOrderTransaction($order_id, $transaction_id)
  {
    return OrderTransaction::where([['order_id', $order_id],['transaction_id', $transaction_id]])?->first();
  }

  public static function getReturnURL($order, $request)
  {
    $settings = Helpers::getSettings();
    $url = $settings['general']['site_url'];
    if (!$url) {
      $url = config('app.url');
    }

    $email = $request['email'] ?? $order?->consumer['email'];
    $return_url = $url.'/order/details?order_number='.$order->order_number.'&email_or_phone='.$email;

    return $return_url;
  }
}

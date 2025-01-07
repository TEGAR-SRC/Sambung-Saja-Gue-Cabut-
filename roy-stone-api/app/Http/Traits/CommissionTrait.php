<?php
namespace App\Http\Traits;

use Exception;
use App\Models\Order;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Enums\OrderEnum;
use App\Enums\PaymentStatus;
use App\Enums\WalletPointsDetail;
use App\Models\CommissionHistory;
use App\GraphQL\Exceptions\ExceptionHandler;

trait CommissionTrait {

  use WalletPointsTrait;

  public function isExistsCommissionHistory(Order $order)
  {
    return CommissionHistory::where('order_id', $order->id)->exists();
  }

  public function getMonthlyVendorCommissions($monthlyCommssions)
  {
    return $monthlyCommssions->where('store_id', Helpers::getCurrentVendorStoreId())->pluck('vendor_commission')->toArray();
  }

  public function getMonthlyAdminCommissions($monthlyCommssions)
  {
    return $monthlyCommssions->pluck('admin_commission')->toArray();
  }

  public function getMonthlyCommissions($year, $roleName)
  {
    $months = range(1, 12);
    foreach($months as $month) {
      $perMonthCommissions = [];
      $commissionHistory = CommissionHistory::whereMonth('created_at', $month)->whereYear('created_at', $year)->whereNull('deleted_at');
      if ($roleName == RoleEnum::VENDOR) {
        $perMonthCommissions = $this->getMonthlyVendorCommissions($commissionHistory);
      } else {
        $perMonthCommissions = $this->getMonthlyAdminCommissions($commissionHistory);
      }

      $commissions[] = array_sum($perMonthCommissions);
    }

    return $commissions;
  }

  public function adminVendorCommission(Order $order)
  {
    try {

      $settings = Helpers::getSettings();
      if ($settings['vendor_commissions']['status'] && $settings['activation']['multivendor']) {
        if (($order->payment_status == PaymentStatus::COMPLETED) &&
          $order->order_status->name == OrderEnum::DELIVERED) {
            if ($order->sub_orders->isEmpty()) {
              $order->sub_orders = [$order];
            }

          foreach ($order->sub_orders as $sub_order) {
            $commissions = [];
            foreach ($sub_order->products as $product) {
              $subTotal = $product->pivot->subtotal;
              if ($settings['vendor_commissions']['is_category_based_commission']) {
                $commissionRate = (float) max(($product->categories->pluck('commission_rate')->toArray()));
                if (!$commissionRate) {
                  $commissionRate = $settings['vendor_commissions']['default_commission_rate'];
                }

              } else {
                $commissionRate = (float) $settings['vendor_commissions']['default_commission_rate'];
              }

              $commissions['admin'][] = $this->getAdminCommission($subTotal, $commissionRate);
              $commissions['vendor'][] = $this->getVendorCommission($subTotal, $commissionRate);
            }

            $store = Helpers::getStoreById($sub_order->store_id);
            if (!$this->isExistsCommissionHistory($sub_order)) {
              $vendorCommission = array_sum($commissions['vendor']);
              $this->creditVendorWallet($store->vendor->id, $vendorCommission, WalletPointsDetail::COMMISSION);
              $this->createCommissionHistory($sub_order, $store->id, $commissions);
            }
          }
        }
      }

    } catch (Exception $e) {

      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }

  public function getVendorCommission($subTotal, $commissionRate)
  {
    return ($subTotal - $this->getAdminCommission($subTotal, $commissionRate));
  }

  public function getAdminCommission($subTotal, $commissionRate)
  {
    return (($subTotal * $commissionRate )/100);
  }

  public function createCommissionHistory($sub_order, $store_id, $commissions)
  {
    $sub_order->commission_history()->create([
      'admin_commission' => array_sum($commissions['admin']),
      'vendor_commission' =>  array_sum($commissions['vendor']),
      'store_id' => $store_id,
    ]);

    return $sub_order;
  }
}

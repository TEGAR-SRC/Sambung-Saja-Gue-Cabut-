<?php
namespace App\Http\Traits;

use App\Models\User;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Models\Transaction;
use App\Enums\TransactionType;

trait TransactionsTrait {

  public function getRoleId()
  {
    $roleName = Helpers::getCurrentRoleName() ?? RoleEnum::ADMIN;
    if ($roleName == RoleEnum::ADMIN) {
      return User::role(RoleEnum::ADMIN)->first()->id;
    }

    return Helpers::getCurrentUserId();
  }

  public function debitTransaction($model, $amount, $detail, $order_id = null)
  {
    return $this->storeTransaction($model,TransactionType::DEBIT, $detail, $amount, $order_id);
  }

  public function creditTransaction($model, $amount, $detail, $order_id = null)
  {
    return $this->storeTransaction($model,TransactionType::CREDIT, $detail, $amount, $order_id);
  }

  public function storeTransaction($model, $type, $detail, $amount, $order_id = null)
  {
    return $model->transactions()->create([
      'amount' => $amount,
      'order_id' => $order_id,
      'detail' => $detail,
      'type' => $type,
      'from'  => $this->getRoleId()
    ]);
  }

  public function debitVendorTransaction($vendorWallet, $amount, $detail, $order_id = null)
  {
    return $this->storeVendorTransaction($vendorWallet,TransactionType::DEBIT, $detail, $amount, $order_id);
  }

  public function creditVendorTransaction($vendorWallet, $amount, $detail, $order_id = null)
  {
    return $this->storeVendorTransaction($vendorWallet,TransactionType::CREDIT, $detail, $amount, $order_id);
  }

  public function getTransactionOrders()
  {
    return Transaction::whereNotNull('order_id')?->whereNotNull('point_id')?->where('type','credit')?->pluck('order_id')->toArray();
  }

  public function storeVendorTransaction($vendorWallet, $type, $detail, $amount)
  {
    return $vendorWallet->transactions()?->create([
      'amount' => $amount,
      'vendor_id' => $vendorWallet->vendor_id,
      'detail' => $detail,
      'type' => $type,
      'from'  => $this->getRoleId(),
    ]);
  }
}

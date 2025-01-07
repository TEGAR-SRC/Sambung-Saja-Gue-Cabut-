<?php

namespace App\Http\Traits;

use Exception;
use App\Models\Point;
use App\Models\Wallet;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Models\VendorWallet;
use App\GraphQL\Exceptions\ExceptionHandler;

trait WalletPointsTrait
{
  use TransactionsTrait;

  // Wallet
  public function getWallet($consumer_id)
  {
    if (Helpers::walletIsEnable()) {
      $roleName = Helpers::getRoleNameByUserId($consumer_id);
      if ($roleName == RoleEnum::CONSUMER) {
        return Wallet::firstOrCreate(['consumer_id' => $consumer_id]);
      }

      throw new ExceptionHandler("user must be " . RoleEnum::CONSUMER, 400);
    }

    throw new ExceptionHandler('Wallet feature currently disabled. Turn it on in Settings > Activation.', 405);
  }

  public function getVendorWallet($vendor_id)
  {
    $roleName = Helpers::getRoleNameByUserId($vendor_id);
    if ($roleName == RoleEnum::VENDOR) {
      return VendorWallet::firstOrCreate(['vendor_id' => $vendor_id]);
    }
    throw new ExceptionHandler("user must be " . RoleEnum::VENDOR, 400);
  }

  public function getVendorWalletBalance($vendor_id)
  {
    return $this->getVendorWallet($vendor_id)->balance;
  }

  public function verifyWallet($consumer_id, $balance)
  {
    if (Helpers::isUserLogin()) {
      if ($balance > 0.00) {
        $roleName = Helpers::getCurrentRoleName();
        if ($roleName != RoleEnum::VENDOR) {
          if (Helpers::walletIsEnable()) {
            $walletBalance = $this->getWalletBalance($consumer_id);
            if ($walletBalance >= $balance) {
              return true;
            }
            throw new Exception('The wallet balance is not sufficient for this order.', 400);
          }
          throw new Exception("The option to use wallet balance for order is currently disabled.", 400);
        }
        throw new Exception("Vendors are unable to use wallet balance while creating orders.", 400);
      }
    }
    return false;
  }

  public function getWalletBalance($consumer_id)
  {
    return $this->getWallet($consumer_id)->balance;
  }

  public function creditWallet($consumer_id, $balance, $detail)
  {
    $wallet = $this->getWallet($consumer_id);
    if ($wallet) {
      $wallet->increment('balance', $balance);
    }

    $this->creditTransaction($wallet, $balance, $detail);
    return $wallet;
  }

  public function debitWallet($consumer_id, $balance, $detail)
  {
    $wallet = $this->getWallet($consumer_id);
    if ($wallet) {
      if ($wallet->balance >= $balance) {
        $wallet->decrement('balance', $balance);
        $this->debitTransaction($wallet, $balance, $detail);

        return $wallet;
      }

      throw new ExceptionHandler('The wallet balance is not sufficient for this order.', 400);
    }
  }

  public function creditVendorWallet($vendor_id, $balance, $detail)
  {
    $vendorWallet = $this->getVendorWallet($vendor_id);
    if ($vendorWallet) {
      $vendorWallet->increment('balance', $balance);
    }

    $this->creditVendorTransaction($vendorWallet, $balance, $detail);
    return $vendorWallet;
  }

  public function debitVendorWallet($vendor_id, $balance, $detail)
  {
    $vendorWallet = $this->getVendorWallet($vendor_id);
    if ($vendorWallet) {
      if ($vendorWallet->balance >= $balance) {
        $vendorWallet->decrement('balance', $balance);
        $this->debitVendorTransaction($vendorWallet, $balance, $detail);

        return $vendorWallet;
      }

      throw new ExceptionHandler('The vendor wallet balance is not sufficient for this order.', 400);
    }
  }

  // Points
  public function getPoints($consumer_id)
  {
    if (Helpers::pointIsEnable()) {
      return Point::firstOrCreate(['consumer_id' => $consumer_id]);
    }
    throw new ExceptionHandler('Points feature currently disabled. Turn it on in Settings > Activation.', 405);
  }

  public function getPointAmount($consumer_id)
  {
    return Helpers::formatDecimal($this->getPoints($consumer_id)->balance);
  }

  public function getRewardPoints($total)
  {
    $settings = Helpers::getSettings();
    $minPerOrderAmount = $settings['wallet_points']['min_per_order_amount'];
    $rewardPerOrderAmount = $settings['wallet_points']['reward_per_order_amount'];
    if ($total >= $minPerOrderAmount) {
      $rewardPoints = ($total / $minPerOrderAmount) * $rewardPerOrderAmount;
      return $rewardPoints;
    }
  }

  public function verifyPoints($consumerId, $pointBalance)
  {
    if (Helpers::isUserLogin()) {
      if ($pointBalance > 0) {
        $roleName = Helpers::getCurrentRoleName();
        if ($roleName != RoleEnum::VENDOR) {
          if (Helpers::pointIsEnable()) {
            $points = $this->getPointAmount($consumerId);
            $pointBalance = $this->currencyToPoints($pointBalance);
            if (round($points, 2) >= abs($pointBalance)) {
              return true;
            }

            throw new Exception('The point is not sufficient for this order.', 400);
          }

          throw new Exception('The option to use points for order is currently disabled', 400);
        }

        throw new Exception("Vendors are unable to use points while creating orders.", 400);
      }
    }

    return false;
  }

  public static function getPointRatio()
  {
    $settings = Helpers::getSettings();
    $pointRatio = $settings['wallet_points']['point_currency_ratio'];
    return $pointRatio == 0 ? 1 : $pointRatio;
  }

  public function pointsToCurrency($points)
  {
    $pointRatio = $this->getPointRatio();
    return Helpers::formatDecimal($points / $pointRatio);
  }

  public function currencyToPoints($currency)
  {
    $pointRatio = $this->getPointRatio();
    return Helpers::formatDecimal($currency * $pointRatio);
  }

  public function creditPoints($consumer_id, $balance, $detail, $order_id = null)
  {
    $points = $this->getPoints($consumer_id);
    if ($points) {
      $points->increment('balance', $balance);
    }

    $this->creditTransaction($points, $balance, $detail, $order_id);
    return $points;
  }

  public function debitPoints($consumer_id, $balance, $detail, $order_id = null)
  {
    $points = $this->getPoints($consumer_id);
    if ($points) {
      if ($points->balance >= $balance) {
        $points->decrement('balance', $balance);
        $this->debitTransaction($points, $balance, $detail, $order_id);
        return $points;
      }

      throw new ExceptionHandler('The points is not sufficient for this order.', 400);
    }
  }
}

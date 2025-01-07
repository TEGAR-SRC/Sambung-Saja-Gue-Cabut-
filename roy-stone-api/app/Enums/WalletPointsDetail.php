<?php

namespace App\Enums;

enum WalletPointsDetail:string {
  const SIGN_UP_BONUS = 'Welcome! Bonus credited.';
  const REWARD = 'Reward Points for placing an order.';
  const REFUND = 'Amount Returned.';
  const REJECTED = 'Request Not Approved.';
  const ADMIN_CREDIT = 'Admin has credited the balance.';
  const ADMIN_DEBIT = 'Admin has debited the balance.';
  const WALLET_ORDER= "Wallet amount successfully debited for Order";
  const POINTS_ORDER= "Point amount successfully debited for Order";
  const COMMISSION = 'Admin has sended a commission';
  const WITHDRAW = 'Balance Withdrawn Requested';
}

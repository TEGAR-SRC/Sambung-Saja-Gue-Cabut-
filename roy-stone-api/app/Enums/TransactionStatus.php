<?php

namespace App\Enums;

enum TransactionStatus:string {
  const CREATED = 'created';
  const ATTEMPTED = 'attempted';
  const PAID = 'paid';
  const FAILED = 'failed';
  const UNPAID = 'unpaid';
  const NO_PAYMENT_REQUIRED = 'no_payment_required';
}

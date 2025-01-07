<?php

namespace App\Enums;

enum PaymentStatus:string {
  const COD = 'CASH_ON_DELIVERY';
  const PENDING = 'PENDING';
  const PROCESSING = 'PROCESSING';
  const FAILED = 'FAILED';
  const FAILURE = 'Failure';
  const ABORTED = 'Aborted';
  const EXPIRED = 'EXPIRED';
  const REFUNDED = 'REFUND';
  const CREDIT = 'Credit';
  const SUCCESS = 'Success';
  const CANCELLED = 'CANCELLED';
  const AWAITING_FOR_APPROVAL = 'AWAITING_FOR_APPROVAL';
  const COMPLETED = 'COMPLETED';
}

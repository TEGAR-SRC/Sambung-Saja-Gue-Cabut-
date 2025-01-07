<?php

namespace App\Enums;

enum StripeEvent:string {
  const COMPLETED = 'checkout.session.complete';
  const ASYNC_PAYMENT_SUCCEEDED = 'checkout.session.async_payment_succeeded';
  const EXPIRED = 'checkout.session.expired';
  const ASYNC_PAYMENT_FAILED = 'checkout.session.async_payment_failed';
}

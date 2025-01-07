<?php

namespace App\Enums;

enum AmountEnum:string {
  const FIXED = 'fixed';
  const PERCENTAGE = 'percentage';
  const FREESHIPPING = 'free_shipping';
}

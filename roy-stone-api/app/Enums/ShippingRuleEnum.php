<?php

namespace App\Enums;

enum ShippingRuleEnum:string {
  const BASE_ON_WEIGHT = 'base_on_weight';
  const BASE_ON_PRICE = 'base_on_price';
}

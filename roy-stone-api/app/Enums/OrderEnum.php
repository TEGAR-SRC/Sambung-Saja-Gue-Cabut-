<?php

namespace App\Enums;

enum OrderEnum:string {
  const PENDING = 'pending';
  const PROCESSING = 'processing';
  const CANCELLED = 'cancelled';
  const SHIPPED = 'shipped';
  const OUT_FOR_DELIVERY = 'out_for_delivery';
  const DELIVERED = 'delivered';
}

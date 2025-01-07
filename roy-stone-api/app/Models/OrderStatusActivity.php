<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStatusActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'status',
        'order_id',
        'changed_at'
    ];

    protected $casts = [
        'order_id' => 'integer',
    ];
}

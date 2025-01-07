<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Currency extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The Attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code',
        'status',
        'symbol',
        'no_of_decimal',
        'exchange_rate',
        'created_by_id',
        'symbol_position',
        'decimal_separator',
        'thousands_separator',
        'system_reserve',
    ];

    protected $casts = [
        'exchange_rate' => 'float',
        'no_of_decimal' => 'integer',
        'status' => 'integer',
        'system_reserve' =>  'integer'
    ];

    public static function boot()
    {
        parent::boot();
        static::saving(function ($model) {
            $model->created_by_id = Helpers::getCurrentUserId();
        });
    }

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('currency')->id;
    }
}

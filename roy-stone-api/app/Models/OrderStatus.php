<?php

namespace App\Models;

use App\Enums\OrderEnum;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderStatus extends Model
{
    use Sluggable, HasFactory;

    protected $table = 'order_status';

    protected $fillable = [
        'id',
        'name',
        'slug',
        'status',
        'sequence',
        'created_by_id',
        'system_reserve',
    ];

    protected $casts = [
        'status' => 'integer',
        'sequence' => 'integer',
    ];

    public static function boot()
    {
        parent::boot();
        static::saving(function ($model) {
            $model->created_by_id = Helpers::getCurrentUserId() ?? User::role(RoleEnum::ADMIN)->first()?->id;
        });
    }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name',
                'onUpdate' => true,
            ]
        ];
    }

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('orderStatus')->id;
    }

    public function getAllSequences()
    {
        return $this->whereNull('deleted_at')->pluck('sequence')->toArray();
    }

    public function getSequenceByName($name)
    {
        return $this->where('name', $name)->whereNull('deleted_at')->value('sequence');
    }

    public function getExcludedSequenceForDigital()
    {
        $excludedOrderStatus = [
            OrderEnum::CANCELLED,
            OrderEnum::SHIPPED,
            OrderEnum::OUT_FOR_DELIVERY
        ];

        $excludedSequences = [];
        foreach($excludedOrderStatus as $orderStatus) {
            $excludedSequences[] = $this->getSequenceByName($orderStatus);
        }

        return $excludedSequences;
    }

    public function getNameBySequence($sequence)
    {
        return $this->where('sequence', $sequence)->whereNull('deleted_at')->value('name');
    }

    public function getCancelSequence()
    {
        return $this->getSequenceByName(OrderEnum::CANCELLED);
    }

    /**
     * @return BelongsTo
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}

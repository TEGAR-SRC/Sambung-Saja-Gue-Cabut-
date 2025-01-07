<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LicenseKey extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The Attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'license_key',
        'order_id',
        'product_id',
        'variation_id',
        'status',
        'purchased_by_id',
        'purchased_at',
        'created_by_id'
    ];

    protected $casts = [
        'product_id' => 'integer',
        'variation_id' => 'integer',
        'purchased_by_id' => 'integer',
        'status' => 'integer',
    ];

    protected $with = [
        'purchased_by:id,name,email',
        'product:id,name,slug',
        'variation:id,name'
    ];

    public static function boot()
    {
        parent::boot();
        static::saving(function ($model) {
            $model->created_by_id =  Helpers::getCurrentUserId() ?? Helpers::getAdmin()?->id;
        });
    }

    public function getItemAttributes()
    {
        if ($this->variation) {
            return $this->variation?->name;
        }

        if ($this->product) {
            return $this->product?->name;
        }
    }

    public function getPurchasedByAttributes()
    {
        if ($this->purchased_by) {
            return [
                'name' => $this->purchased_by?->name,
                'email' => $this->purchased_by?->email,
            ];
        }
    }

    public function toArray()
    {
        return [
            'id' => $this->id,
            'license_key' => $this->license_key,
            'product_id' => $this->product_id,
            'variation_id' => $this->variation_id,
            'purchased_by_id' => $this->purchased_by_id,
            'created_at' => $this->created_at,
            'status' => $this->status,
            'item_name' => $this->getItemAttributes(),
            'purchased_by' => $this->getPurchasedByAttributes()
        ];
    }

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('license_key')->id;
    }

    /**
     * @return BelongsTo
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    /**
     * @return BelongsTo
     */
    public function variation(): BelongsTo
    {
        return $this->belongsTo(Variation::class, 'variation_id');
    }

    /**
     * @return BelongsTo
     */
    public function purchased_by(): BelongsTo
    {
        return $this->belongsTo(User::class, 'purchased_by_id');
    }

    /**
     * @return BelongsTo
     */
    public function created_by(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DownloadFile extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The Attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'license_key_id',
        'product_id',
        'variation_id',
        'order_id',
        'consumer_id',
        'token',
        'download_at'
    ];

    protected $casts = [
        'product_id' => 'integer',
        'variation_id' => 'integer',
        'order_id' => 'integer',
        'license_key_id' => 'integer',
        'consumer_id' => 'integer',
    ];

    protected $with = [
        'order:id,order_number',
        'product:id,name,slug,product_thumbnail_id',
        'variation:id,name,variation_image_id',
        'license_key:id,license_key',
        'consumer:id,name'
    ];

    public function toArray()
    {
        return [
            'id' => $this->id,
            'item_name' => $this->getItemNameAttributes(),
            'item_image' => $this->getItemImageAttributes(),
            'can_download_file' => $this->getCanDownloadFileAttributes(),
            'can_download_license' => $this->getCanDownloadLicenseAttributes(),
        ];
    }

    public function getItemNameAttributes()
    {
        if ($this->variation) {
            return $this->variation?->name;
        }

        if ($this->product) {
            return $this->product?->name;
        }
    }

    public function getItemImageAttributes()
    {
        if ($this->variation) {
            return $this->variation?->variation_image?->original_url;
        }

        if ($this->product) {
            return $this->product?->product_thumbnail?->original_url;
        }
    }

    public function getCanDownloadFileAttributes()
    {
        if ($this->variation) {
            return $this->variation?->digital_files() ? true: false;
        }

        if ($this->product) {
            return $this->product?->digital_files() ? true : false;
        }
    }

    public function getCanDownloadLicenseAttributes()
    {
        if ($this->license_key_id) {
            return true;
        }

        return false;
    }

    /**
     * @return BelongsTo
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    /**
     * @return BelongsTo
     */
    public function consumer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'consumer_id');
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
    public function license_key(): BelongsTo
    {
        return $this->belongsTo(LicenseKey::class, 'license_key_id');
    }
}

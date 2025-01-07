<?php

namespace App\Models;

use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ThemeOption extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $casts = [
        'options' => 'json',
    ];

    /**
     * The Options that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'options',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function getOptionsAttribute($value)
    {
        $values = json_decode($value, true);
        $headerLogo = Attachment::find($values['logo']['header_logo_id']);
        $footerLogo = Attachment::find($values['logo']['footer_logo_id']);
        $faviconIcon = Attachment::find($values['logo']['favicon_icon_id']);
        $seoOGImage = Attachment::find($values['seo']['og_image_id']);

        $values['logo']['favicon_icon'] = $faviconIcon;
        $values['logo']['header_logo'] = $headerLogo;
        $values['logo']['footer_logo'] = $footerLogo;
        $values['seo']['og_image'] = $seoOGImage;

        return $values;
    }

    public function setOptionsAttribute($value)
    {
        $this->attributes['options'] = json_encode($value);
    }

    /**
     * @return BelongsTo
     */
    public function front_site_logo(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'front_site_logo_id');
    }

    /**
     * @return BelongsTo
     */
    public function front_site_favicon(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'front_site_favicon_id');
    }
}

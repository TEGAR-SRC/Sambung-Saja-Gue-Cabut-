<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Module extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The Modules that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'sequence'
    ];

    /**
     * @return HasMany
     */
    public function modulePermissions(): HasMany
    {
        return $this->hasMany(ModulePermission::class, 'module_id');
    }
}

<?php

namespace App\Models;

use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ModulePermission extends Model
{
    use HasFactory, HasRoles, SoftDeletes;

    /**
     * The Module Permissions that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'module_id',
        'permission_id'
    ];

    /**
     * @return BelongsTo
     */
    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class, 'module_id');
    }
}

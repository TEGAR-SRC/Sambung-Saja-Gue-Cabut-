<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppSetting extends Model
{
    use HasFactory;

    protected $casts = [
        'values' => 'json',
    ];

    /**
     * The values that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'values',
    ];

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('app-settings');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subscribe extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The values that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
    ];

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('subscribe')?->id;
    }
}

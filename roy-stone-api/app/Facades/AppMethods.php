<?php
namespace App\Facades;

use Illuminate\Support\Facades\App;

class AppMethods
{
    public function call($method, $data)
    {
        request()->merge($data);
        return App::call('App\Http\Controllers\\'.$method, $data);
    }
}

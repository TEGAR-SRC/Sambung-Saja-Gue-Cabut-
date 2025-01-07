<?php

namespace App\Http\Controllers;

use App\Http\Traits\CheckoutTrait;
use App\Http\Requests\CalculateCheckoutRequest;

class CheckoutController extends Controller
{
    use CheckoutTrait;

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function verifyCheckout(CalculateCheckoutRequest $request)
    {
        return $this->calculate($request);
    }
}

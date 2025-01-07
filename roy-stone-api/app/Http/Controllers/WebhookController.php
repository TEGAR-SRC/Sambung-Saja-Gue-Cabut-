<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Eloquents\WebhookRepository;

class WebhookController extends Controller
{
    protected $repository;

    public function __construct(WebhookRepository $repository){
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function paypal(Request $request)
    {
        return $this->repository->paypal($request);
    }

    /**
     * Display a listing of the resource.
     */
    public function stripe(Request $request)
    {
        return $this->repository->stripe($request);
    }

    /**
     * Display a listing of the resource.
     */
    public function razorpay(Request $request)
    {
        return $this->repository->razorpay($request);
    }

    /**
     * Display a listing of the resource.
     */
    public function mollie(Request $request)
    {
        return $this->repository->mollie($request);
    }

    /**
     * Display a listing of the resource.
     */
    public function instamojo(Request $request)
    {
        return $this->repository->instamojo($request);
    }

    public function ccavenue(Request $request)
    {
        return $this->repository->ccavenue($request);
    }

    public function flutterwave(Request $request)
    {
        return $this->repository->flutterwave($request);
    }

    public function sslcommerz(Request $request)
    {
        return $this->repository->sslcommerz($request);
    }
}

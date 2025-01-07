<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Order;
use App\Payments\Mollie;
use App\Payments\PayPal;
use App\Payments\Stripe;
use App\Payments\CCAvenue;
use App\Payments\RazorPay;
use App\Payments\InstaMojo;
use App\Payments\SSLCommerz;
use App\Payments\FlutterWave;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;

class WebhookRepository extends BaseRepository
{
    function model()
    {
        return Order::class;
    }

    public function paypal($request)
    {
        try {

            return PayPal::webhookHandler($request);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function stripe($request)
    {
        try {

            return Stripe::webhookHandler($request);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function mollie($request)
    {
        try {

            return Mollie::webhookHandler($request);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function razorpay($request)
    {
        try {

            return RazorPay::webhookHandler($request);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function instamojo($request)
    {
        try {

            return InstaMojo::webhookHandler($request);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function ccavenue($request)
    {
        try {

            return CCAvenue::webhookHandler($request);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function flutterwave($request)
    {
        try {

            return FlutterWave::webhookHandler($request);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function sslcommerz($request)
    {
        try {

            return SSLCommerz::webhookHandler($request);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}

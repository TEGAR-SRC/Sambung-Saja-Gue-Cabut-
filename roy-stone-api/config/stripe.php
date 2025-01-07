<?php
/**
 * Stripe Setting & API Credentials
 */

return [
    'publish_key' => env('STRIPE_API_KEY'),
    'secret_key' => env('STRIPE_SECRET_KEY'),
    'webhook_secret' => env('STRIPE_WEBHOOK_SECRET_KEY'),
];

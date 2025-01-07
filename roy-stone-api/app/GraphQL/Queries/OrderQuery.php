<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class OrderQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('OrderController@index', $args);
  }

  public function show($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('OrderController@show', $args);
  }

  public function trackOrder($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('OrderController@trackOrder', $args);
  }

  public function verifyPayment($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('OrderController@verifyPayment', $args);
  }

  public function getInvoiceUrl($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('OrderController@getInvoiceUrl', $args);
  }
}

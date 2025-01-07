<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class StoreQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('StoreController@index', $args);
  }

  public function getStoreBySlug($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('StoreController@getStoreBySlug', $args);
  }
}

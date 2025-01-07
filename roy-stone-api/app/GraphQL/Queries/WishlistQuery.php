<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class WishlistQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('WishlistController@index', $args);
  }
}

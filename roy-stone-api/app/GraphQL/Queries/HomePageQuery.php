<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class HomePageQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('HomePageController@index', $args);
  }
}

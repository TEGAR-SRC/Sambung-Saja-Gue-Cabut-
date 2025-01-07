<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class DashboardQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('DashboardController@index', $args);
  }

  public function chart($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('DashboardController@chart', $args);
  }
}

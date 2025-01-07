<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class PointsQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('PointsController@index', $args);
  }
}

<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class SubscribeQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('SubscribeController@index', $args);
  }

  public function getSubscribesExportUrl($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('SubscribeController@getSubscribesExportUrl', $args);
  }
}

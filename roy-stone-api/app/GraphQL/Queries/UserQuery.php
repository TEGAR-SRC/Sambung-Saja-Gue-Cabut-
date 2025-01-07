<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class UserQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('UserController@index', $args);
  }

  public function getUsersExportUrl($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('UserController@getUsersExportUrl', $args);
  }
}

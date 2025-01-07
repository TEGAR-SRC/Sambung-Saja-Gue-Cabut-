<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class PageQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('PageController@index', $args);
  }

  public function getPageBySlug($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('PageController@getPageBySlug', $args);
  }
}

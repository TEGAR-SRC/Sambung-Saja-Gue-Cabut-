<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class CategoryQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('CategoryController@index', $args);
  }

  public function getCategoriesExportUrl($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('CategoryController@getCategoriesExportUrl', $args);
  }
}

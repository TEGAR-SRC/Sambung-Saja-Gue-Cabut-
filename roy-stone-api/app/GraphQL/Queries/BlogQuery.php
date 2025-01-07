<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class BlogQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('BlogController@index', $args);
  }

  public function getBlogBySlug($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('BlogController@getBlogBySlug', $args);
  }
}

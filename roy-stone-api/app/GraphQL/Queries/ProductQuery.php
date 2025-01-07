<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class ProductQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('ProductController@index', $args);
  }

  public function getProductsExportUrl($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('ProductController@getProductsExportUrl', $args);
  }

  public function getProductBySlug($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('ProductController@getProductBySlug', $args);
  }

  public function getMinifyProduct($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('ProductController@getMinifyProduct', $args);
  }
}

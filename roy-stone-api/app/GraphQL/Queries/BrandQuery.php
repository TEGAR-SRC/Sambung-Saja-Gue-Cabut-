<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class BrandQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('BrandController@index', $args);
  }

  public function getBrandsExportUrl($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('BrandController@getBrandsExportUrl', $args);
  }

  public function getBrandBySlug($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('PageController@getBrandBySlug', $args);
  }
}

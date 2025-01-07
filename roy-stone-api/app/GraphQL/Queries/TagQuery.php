<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class TagQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('TagController@index', $args);
  }

  public function getTagsExportUrl($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('TagController@getTagsExportUrl', $args);
  }
}

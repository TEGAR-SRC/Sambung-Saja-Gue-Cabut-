<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class DownloadQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('DownloadController@index', $args);
  }

  public function downloadZipLink($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('DownloadController@downloadZipLink', $args);
  }

  public function downloadKeyLink($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('DownloadController@downloadKeyLink', $args);
  }

  public function adminDownloadZipLink($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('DownloadController@adminDownloadZipLink', $args);
  }
}

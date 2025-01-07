<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class LicenseKeyQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('LicenseKeyController@index', $args);
  }

  public function getLicenseKeysExportUrl($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('LicenseKeyController@getLicenseKeysExportUrl', $args);
  }
}

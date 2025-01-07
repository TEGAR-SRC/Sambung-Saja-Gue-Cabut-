<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class SettingsQuery
{
  public function index($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('SettingController@index', $args);
  }

  public function frontSettings($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('SettingController@frontSettings', $args);
  }
}

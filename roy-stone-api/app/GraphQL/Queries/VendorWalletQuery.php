<?php

namespace App\GraphQL\Queries;

use App\Facades\App;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class VendorWalletQuery
{
  public function vendorWalletTransactions($rootValue, array $args, GraphQLContext $context)
  {
    return App::call('VendorWalletController@index', $args);
  }
}

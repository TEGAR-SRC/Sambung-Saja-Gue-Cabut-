<?php

namespace App\GraphQL\Mutations;

use App\Facades\App;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class VendorWalletMutator
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */

    public function creditVendorWallet($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('VendorWalletController@credit', $args);
    }

    public function debitVendorWallet($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('VendorWalletController@debit', $args);
    }
}

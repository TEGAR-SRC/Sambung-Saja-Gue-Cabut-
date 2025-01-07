<?php

namespace App\GraphQL\Mutations;

use App\Facades\App;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class WalletMutator
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */

    public function creditWallet($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('WalletController@credit', $args);
    }

    public function debitWallet($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('WalletController@debit', $args);
    }
}

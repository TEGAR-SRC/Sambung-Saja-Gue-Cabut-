<?php

namespace App\GraphQL\Mutations;

use App\Facades\App;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class PaymentAccountMutator
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */

    public function store($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('PaymentAccountController@store', $args);
    }

    public function update($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('PaymentAccountController@update', $args);
    }

    public function destroy($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('PaymentAccountController@destroy', $args);
    }
}

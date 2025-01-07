<?php

namespace App\GraphQL\Mutations;

use App\Facades\App;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class CheckoutMutator
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function calculate($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('CheckoutController@verifyCheckout', $args);
    }
}

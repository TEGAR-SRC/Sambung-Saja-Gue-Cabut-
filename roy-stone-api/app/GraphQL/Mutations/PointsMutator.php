<?php

namespace App\GraphQL\Mutations;

use App\Facades\App;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class PointsMutator
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */

    public function creditPoints($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('PointsController@credit', $args);
    }

    public function debitPoints($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('PointsController@debit', $args);
    }
}

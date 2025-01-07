<?php

namespace App\GraphQL\Mutations;

use App\Facades\App;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class CurrencyMutator
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function store($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('CurrencyController@store', $args);
    }

    public function update($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('CurrencyController@update', $args);
    }

    public function destroy($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('CurrencyController@destroy', $args);
    }

    public function status($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('CurrencyController@status', $args);
    }

    public function deleteAll($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('CurrencyController@deleteAll', $args);
    }
}

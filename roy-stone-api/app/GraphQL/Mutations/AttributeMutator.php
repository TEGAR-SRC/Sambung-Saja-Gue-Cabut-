<?php

namespace App\GraphQL\Mutations;

use App\Facades\App;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class AttributeMutator
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function store($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AttributeController@store', $args);
    }

    public function update($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AttributeController@update', $args);
    }

    public function destroy($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AttributeController@destroy', $args);
    }

    public function status($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AttributeController@status', $args);
    }

    public function deleteAll($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AttributeController@deleteAll', $args);
    }

    public function import($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AttributeController@import', $args);
    }
}

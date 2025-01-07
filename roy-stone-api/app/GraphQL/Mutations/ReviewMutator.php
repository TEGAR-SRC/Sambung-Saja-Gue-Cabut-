<?php

namespace App\GraphQL\Mutations;

use App\Facades\App;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class ReviewMutator
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function store($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('ReviewController@store', $args);
    }

    public function update($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('ReviewController@update', $args);
    }

    public function destroy($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('ReviewController@destroy', $args);
    }

    public function deleteAll($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('ReviewController@deleteAll', $args);
    }
}

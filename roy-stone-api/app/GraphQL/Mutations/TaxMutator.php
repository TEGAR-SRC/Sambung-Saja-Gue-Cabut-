<?php

namespace App\GraphQL\Mutations;

use App\Facades\App;
use App\Models\Tax;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class TaxMutator
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */

    public function store($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('TaxController@store', $args);
    }

    public function update($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('TaxController@update', $args);
    }

    public function destroy($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('TaxController@destroy', $args);
    }

    public function status($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('TaxController@status', $args);
    }

    public function deleteAll($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('TaxController@deleteAll', $args);
    }
}

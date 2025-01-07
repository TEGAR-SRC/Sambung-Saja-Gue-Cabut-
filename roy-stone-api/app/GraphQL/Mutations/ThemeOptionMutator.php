<?php

namespace App\GraphQL\Mutations;

use App\Facades\App;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class ThemeOptionMutator
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function update($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('ThemeOptionController@update', $args);
    }
}

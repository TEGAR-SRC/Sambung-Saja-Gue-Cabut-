<?php

namespace App\GraphQL\Mutations;

use App\Facades\App;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class AccountMutator
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */

    public function updateProfile($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AccountController@updateProfile', $args);
    }

    public function updateProfilePassword($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AccountController@updatePassword', $args);
    }

    public function updateStoreProfile($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AccountController@updateStoreProfile', $args);
    }
}

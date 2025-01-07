<?php

namespace App\GraphQL\Mutations;

use App\Facades\App;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class AuthMutator
{

    public function login($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AuthController@login',$args);
    }

    public function backendLogin($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AuthController@backendLogin',$args);
    }

    public function register($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AuthController@register',$args);
    }

    public function forgotPassword($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return  App::call('AuthController@forgotPassword',$args);
    }

    public function updatePassword($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AuthController@updatePassword', $args);
    }

    public function logout($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AuthController@logout',$args);
    }

    public function verifytoken($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('AuthController@verifytoken', $args);
    }
}

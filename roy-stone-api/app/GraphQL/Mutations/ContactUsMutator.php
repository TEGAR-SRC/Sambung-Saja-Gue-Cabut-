<?php

namespace App\GraphQL\Mutations;

use App\Facades\App;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class ContactUsMutator
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */

    public function contactUs($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return App::call('ContactUsController@contactUs', $args);
    }
}

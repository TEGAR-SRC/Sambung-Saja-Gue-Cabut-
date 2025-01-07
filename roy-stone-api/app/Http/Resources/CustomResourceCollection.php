<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Arr;

class CustomResourceCollection extends AnonymousResourceCollection
{


  /**
   * Add the pagination information to the response.
   *
   * @param  Request  $request
   * @param  array  $paginated
   * @param  array  $default
   * @return array
   */
  public function paginationInformation($request, $paginated, $default)
  {
    unset($paginated['data']);
    return $paginated;
  }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactUsRequest;
use App\Repositories\Eloquents\ContactUsRepository;

class ContactUsController extends Controller
{
    public $repository;

    public function __construct(ContactUsRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function contactUs(ContactUsRequest $request)
    {
        return $this->repository->contactUs($request);
    }
}

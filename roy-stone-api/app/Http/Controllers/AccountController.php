<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateStoreProfileRequest;
use App\Repositories\Eloquents\AccountRepository;

class AccountController extends Controller
{
    protected $repository;

    public function __construct(AccountRepository $repository){
        $this->repository = $repository;
    }

    public function self()
    {
        return $this->repository->self();
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        return $this->repository->updatePassword($request);
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        return $this->repository->updateProfile($request);
    }

    public function updateStoreProfile(UpdateStoreProfileRequest $request)
    {
        return $this->repository->updateStoreProfile($request);
    }
}

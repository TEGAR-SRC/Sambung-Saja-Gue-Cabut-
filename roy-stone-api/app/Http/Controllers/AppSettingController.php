<?php

namespace App\Http\Controllers;

use App\Models\AppSetting;
use App\Http\Requests\UpdateAppSettingRequest;
use App\Repositories\Eloquents\AppSettingRepository;

class AppSettingController extends Controller
{
    public $repository;

    public function __construct(AppSettingRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->repository->first();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAppSettingRequest $request, AppSetting $appSetting)
    {
        return $this->repository->update($request->all(), null);
    }
}

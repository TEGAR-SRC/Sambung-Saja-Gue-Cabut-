<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateThemeOptionRequest;
use App\Repositories\Eloquents\ThemeOptionRepository;

class ThemeOptionController extends Controller
{
    public $repository;

    public function __construct(ThemeOptionRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->repository->latest('created_at')->first();
    }

    public function update(UpdateThemeOptionRequest $request, $id = null)
    {
        return $this->repository->update($request->all(), $id);
    }
}

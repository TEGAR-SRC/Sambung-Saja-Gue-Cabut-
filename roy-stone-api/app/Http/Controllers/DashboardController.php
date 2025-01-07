<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Eloquents\DashboardRepository;

class DashboardController extends Controller
{
    protected $repository;

    public function __construct(DashboardRepository $repository){
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->repository->index($request);
    }

    public function chart()
    {
        return $this->repository->chart();
    }
}

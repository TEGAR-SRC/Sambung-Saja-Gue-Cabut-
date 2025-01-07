<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Eloquents\BadgeRepository;

class BadgeController extends Controller
{
    protected $repository;

    public function __construct(BadgeRepository $repository){
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->repository->index($request);
    }
}

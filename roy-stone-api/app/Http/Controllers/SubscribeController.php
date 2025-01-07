<?php

namespace App\Http\Controllers;

use App\Models\Subscribe;
use Illuminate\Http\Request;
use App\Http\Requests\CreateSubscribeRequest;
use App\Http\Requests\UpdateSubscribeRequest;
use App\Repositories\Eloquents\SubscribeRepository;

class SubscribeController extends Controller
{
    public $repository;

    public function __construct(SubscribeRepository $repository)
    {
        $this->authorizeResource(Subscribe::class,'subscribe', [
            'except' => [ 'store' ],
        ]);

        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->repository->latest('created_at')->paginate($request->paginate ?? $this->repository->count());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateSubscribeRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subscribe $subscribe)
    {
        return $this->repository->show($subscribe->id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subscribe $subscribe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubscribeRequest $request, Subscribe $subscribe)
    {
        return $this->repository->update($request->all(), $subscribe->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Subscribe $subscribe)
    {
        return $this->repository->destroy($subscribe->getId($request));
    }

    public function getSubscribesExportUrl(Request $request)
    {
        return $this->repository->getSubscribesExportUrl($request);
    }

    public function export()
    {
        return $this->repository->export();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use App\Http\Requests\CreateStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Repositories\Eloquents\StoreRepository;

class StoreController extends Controller
{
    public $repository;

    public function __construct(StoreRepository $repository)
    {
        $this->authorizeResource(Store::class,'store',[
            'except' => [ 'index', 'show','store' ],
        ]);

        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $store = $this->filter($this->repository, $request);
        return $store->latest('created_at')->paginate($request->paginate ?? $this->repository->count());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateStoreRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Store $store)
    {
        return $this->repository->show($store->id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStoreRequest $request, Store $store)
    {
        return $this->repository->update($request->all(), $store->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Store $store)
    {
        return $this->repository->destroy($store->getId($request));
    }

    /**
     * Update Status the specified resource from storage.
     *
     * @param  int  $id
     * @param int $status
     * @return \Illuminate\Http\Response
     */
    public function status(Request $request)
    {
        return $this->repository->status($request->id, $request->status);
    }

    public function deleteAll(Request $request)
    {
        return $this->repository->deleteAll($request->ids);
    }

    public function approve($id, $status)
    {
        return $this->repository->approve($id, $status);
    }

    public function getStoreBySlug($slug)
    {
        return $this->repository->getStoreBySlug($slug);
    }


    public function filter($store, $request)
    {
        isset($store->first()->vendor)?
            $store->first()->vendor->makeHidden(['store']) : $store;

        if ($request->ids) {
            $ids = explode(',',$request->ids);
            $store = $store->whereIn('id',$ids);
        }

        if ($request->field && $request->sort) {
            $store = $store->orderBy($request->field, $request->sort);
        }

        if ($request->top_vendor && $request->filter_by) {
            $store = $store->having('orders_count', '>', 0)->orderByDesc('orders_count');
        }

        if (isset($request->status)) {
            $store = $store->where('status',$request->status);
        }

        return $store->with(config('enums.store.with'));
    }
}

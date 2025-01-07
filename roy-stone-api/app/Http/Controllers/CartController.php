<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SyncCartRequest;
use App\Http\Requests\CreateUpdateCartRequest;
use App\Repositories\Eloquents\CartRepository;

class CartController extends Controller
{
    public $repository;

    public function __construct(CartRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->repository->index($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUpdateCartRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CreateUpdateCartRequest $request)
    {
        return $this->repository->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Cart $cart)
    {
        return $this->repository->destroy($cart->getId($request));
    }

    /**
     * Replace the specified resource from storage.
     */
    public function replace(Request $request)
    {
        return $this->repository->replace($request);
    }

    /**
     * Replace the specified resource from storage.
     */
    public function sync(SyncCartRequest $request)
    {
        return $this->repository->syncCart($request);
    }

    /**
     * Clear the all resources from storage.
     */
    public function clear(Request $request)
    {
        return $this->repository->clear();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Http\Request;
use App\Http\Requests\CreateAddressRequest;
use App\Http\Requests\UpdateAddressRequest;
use App\Repositories\Eloquents\AddressRepository;

class AddressController extends Controller
{
    public $repository;

    public function __construct(AddressRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $address = $this->filter($this->repository, $request);
        return $address->latest('created_at')->paginate($request->paginate ?? $address->count());
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
    public function store(CreateAddressRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Address $address)
    {
        return $this->repository->show($address->id);
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
    public function update(UpdateAddressRequest $request, Address $address)
    {
        return $this->repository->update($request->all(), $address->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Address $address)
    {
        return $this->repository->destroy($address->getId($request));
    }

    public function filter($address, $request)
    {
        $roleName = Helpers::getCurrentRoleName();
        if ($roleName != RoleEnum::ADMIN) {
            $address = $address->where('user_id', Helpers::getCurrentUserId());
        }

        if ($request->field && $request->sort) {
            $address = $address->orderBy($request->field, $request->sort);
        }

        return $address;
    }
}

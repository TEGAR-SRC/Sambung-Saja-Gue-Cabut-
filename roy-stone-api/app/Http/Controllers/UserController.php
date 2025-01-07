<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Http\Request;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Repositories\Eloquents\UserRepository;

class UserController extends Controller
{
    protected $repository;

    public function __construct(UserRepository $repository)
    {
        $this->authorizeResource(User::class,'user');
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    */

    public function index(Request $request)
    {
        try {

            $users = $this->filter($this->repository, $request);
            return $users->latest('created_at')->paginate($request->paginate ?? $users->count());

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
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
     * @param CreateUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUserRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return $this->repository->show($user->id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        return $this->repository->update($request->all(), $user->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, User $user)
    {
       return  $this->repository->destroy($user->getId($request));
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

    public function deleteAddress(Request $request, User $user)
    {
        return $this->repository->deleteAddress($user->getId($request));
    }

    public function deleteAll(Request $request)
    {
        return $this->repository->deleteAll($request->ids);
    }

    public function import()
    {
        return $this->repository->import();
    }

    public function getUsersExportUrl(Request $request)
    {
        return $this->repository->getUsersExportUrl($request);
    }

    public function export()
    {
        return $this->repository->export();
    }

    public function filter($users, $request)
    {
        if (Helpers::isUserLogin()) {
            $roleName = Helpers::getCurrentRoleName();
            if ($roleName != RoleEnum::ADMIN) {
                $users = $users->where('created_by_id',Helpers::getCurrentUserId());
            }
        }

        if ($request->field && $request->sort) {
            $users = $users->orderBy($request->field, $request->sort);
        }

        if (isset($request->status)) {
            $users = $users->where('status',$request->status);
        }

        if ($request->isStoreExists) {
            $users = $users->whereIn('id', function ($query) {
                $query->select('vendor_id')->from('stores')->get();
            });

            if (!filter_var($request->isStoreExists, FILTER_VALIDATE_BOOLEAN)) {
                $users = $users->whereNotIn('id', function ($query) {
                    $query->select('vendor_id')->from('stores')->get();
                });
            }
        }

        if ($request->role) {
            $role = $request->role;
            $users = $users->whereHas("roles", function($query) use($role) {
                $query->whereName($role);
            });

        } else {
            $users = $users->whereHas("roles", function($query){
                $query->whereNotIn("name", [RoleEnum::ADMIN, RoleEnum::VENDOR]);
            });
        }

        return $users;
    }
}

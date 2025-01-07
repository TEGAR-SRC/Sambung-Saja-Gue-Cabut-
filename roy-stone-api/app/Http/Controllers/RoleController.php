<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Module;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Requests\CreateRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Repositories\Eloquents\RoleRepository;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
    public $module;
    public $repository;

    public function __construct(RoleRepository $repository, Module $module)
    {
        $this->authorizeResource(Role::class, 'role', [
            'except' => ['index', 'show'],
        ]);

        $this->repository = $repository;
        $this->module = $module;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        try {

            $roles = $this->filter($this->repository->with('permissions'), $request);
            return $roles->latest('created_at')->paginate($request->paginate ?? $roles->count());

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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(CreateRoleRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function show(Role $role)
    {
        return $this->repository->show($role->id);
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

    public function update(UpdateRoleRequest $request, Role $role)
    {
        return $this->repository->update($request->all(), isset($role->id) ? $role->id : $request->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy(Request $request, Role $role)
    {
        return $this->repository->destroy(isset($role->id) ? $role->id : $request->id);
    }

    public function modules()
    {
        return $this->module->with('modulePermissions')->orderBy('sequence', 'asc')->get();
    }

    public function deleteAll(Request $request)
    {
        return $this->repository->deleteAll($request->ids);
    }

    public function filter($roles, $request)
    {
        if (Helpers::isUserLogin()) {
            $roleName = Helpers::getCurrentRoleName();
            if ($roleName != RoleEnum::ADMIN) {
                $roles = $this->repository->whereNot('name', $roleName);
            }
        }

        if ($request->field && $request->sort) {
            $roles = $roles->orderBy($request->field, $request->sort);
        }

        return $roles;
    }
}

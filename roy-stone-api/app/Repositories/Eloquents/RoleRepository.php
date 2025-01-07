<?php

namespace App\Repositories\Eloquents;

use Exception;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class RoleRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'name' => 'like',
    ];

    public function boot()
    {
        try {

            $this->pushCriteria(app(RequestCriteria::class));

        } catch (ExceptionHandler $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    function model()
    {
        return Role::class;
    }

    public function show($id)
    {
        try {

            return $this->model->with('permissions')->findOrFail($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $role = $this->model->create(['guard_name' => 'web', 'name'=> $request->name]);
            $role->givePermissionTo($request->permissions);

            DB::commit();
            return $role;

        } catch (Exception $e){

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $role = $this->model->findOrFail($id);
            if ($role->system_reserve) {
                throw new Exception('This role is system reserved and not editable.',400);
            }

            $role->syncPermissions($request['permissions']);
            $role->update($request);

            DB::commit();
            return $role;

        } catch (Exception $e){

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            $role = $this->model->findOrFail($id);
            if ($role->system_reserve) {
                throw new Exception('This role is system reserved and cannot be deleted.',400);
            }

            return $role->destroy($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function deleteAll($ids)
    {
        try {

            $roles = $this->model->whereNot('system_reserve', true)->whereIn('id', $ids)->get();
            foreach($roles as $role) {
                $this->model->findOrFail($role->id)->destroy($role->id);
            }

            return true;

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}

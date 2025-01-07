<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\User;
use App\Models\Address;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Support\Arr;
use App\Imports\UserImport;
use App\Exports\UsersExport;
use App\Enums\WalletPointsDetail;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Facades\Excel;
use App\Events\SignUpBonusPointsEvent;
use App\Http\Traits\WalletPointsTrait;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class UserRepository extends BaseRepository
{
    use WalletPointsTrait;

    protected $role;
    protected $address;

    protected $fieldSearchable = [
        'name' => 'like',
        'email' => 'like',
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
        $this->role = new Role();
        $this->address = new Address();
        return User::class;
    }

    public function show($id)
    {
        try {

            return $this->model->with('roles', 'address')->findOrFail($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $user = $this->model->create([
                'name'     => $request->name,
                'email'    => $request->email,
                'country_code' => $request->country_code,
                'phone'    => (string) $request->phone,
                'status'    => $request->status,
                'password' => Hash::make($request->password),
            ]);

            if (Helpers::pointIsEnable()) {
                $settings = Helpers::getSettings();
                $signUpPoints = $settings['wallet_points']['signup_points'];

                $this->creditPoints($user->id, $signUpPoints, WalletPointsDetail::SIGN_UP_BONUS);
                event(new SignUpBonusPointsEvent($user));
                $user->point;
            }

            if (Helpers::walletIsEnable()) {
                $user->wallet()->create();
                $user->wallet;
            }

            $role = $this->role->where('name', RoleEnum::CONSUMER)->first();
            if ($request->role_id) {
                $role = $this->role->findOrFail($request->role_id);
            }

            $user->assignRole($role);

            DB::commit();
            return $user;

        } catch (Exception $e){

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {

        DB::beginTransaction();
        try {

            $request = Arr::except($request, ['password']);
            if (isset($request['phone'])) {
                $request['phone'] = (string) $request['phone'];
            }

            $user = $this->model->findOrFail($id);
            if ($user->system_reserve) {
                throw new Exception('This user is system reserved and not editable.',400);
            }

            $user->update($request);
            $user->address;

            if (isset($request['role_id'])) {
                $role = $this->role->find($request['role_id']);
                $user->syncRoles($role);
            }

            DB::commit();
            $user = $user->fresh();

           return $user;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            $user = $this->model->findOrFail($id);
            if ($user->hasRole(RoleEnum::ADMIN)) {
                throw new Exception('This user is system reserved and cannot be deleted.', 400);
            }

            return $user->destroy($id);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function status($id, $status)
    {
        try {

            $user = $this->model->findOrFail($id);
            $user->update(['status' => $status]);

            return $user;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function deleteAddress($id)
    {
        try {

            return $this->address->findOrFail($id)->destroy($id);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function deleteAll($ids)
    {
        try {

            return $this->model->whereIn('id', $ids)->whereHas('roles',
                function($role) {
                    $role->whereNot('name', '=', RoleEnum::ADMIN);
                }
            )->delete();

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function import()
    {
        try {

            $userImport = new UserImport();
            Excel::import($userImport, request()->file('users'));
            return $userImport->getImportedUsers();

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getUsersExportUrl()
    {
        try {

            return route('users.export');

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function export()
    {
        try {

            return Excel::download(new UsersExport, 'users.csv');

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}

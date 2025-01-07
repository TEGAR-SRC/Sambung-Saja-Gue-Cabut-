<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\User;
use App\Models\Store;
use App\Helpers\Helpers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class AccountRepository extends BaseRepository
{
    protected $store;

    protected $fields = [
        'name',
        'email',
        'phone',
        'country_code',
        'profile_image_id',
        'profile_image'
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
        $this->store = new Store();
        return User::class;
    }

    public function self()
    {
        try {

            $user_id = Helpers::getCurrentUserId();
            $user = $this->model->withCount(['orders' => function ($query) {
                $query->whereNull('parent_id');
            }])->with(config('enums.user.with'))->findOrFail($user_id);

            return $user->setAppends([
                'role', 'permission', 'store'
            ]);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function updateProfile($request)
    {
        DB::beginTransaction();
        try {

            $request['phone'] = (string) $request['phone'];
            $user = $this->model->findOrFail(Helpers::getCurrentUserId());
            $user->update($request->only($this->fields));

            if (isset($request['profile_image_id']) ) {
                $user->profile_image()->associate($request['profile_image_id']);
            }

            if ($request->hasFile('profile_image')) {
                $attachments = Helpers::createAttachment();
                $media = Helpers::storeImage([$request->profile_image], $attachments, 'attachment');
                $user->profile_image_id = head($media)->id;
                $user->profile_image()->associate(head($media)->id);
            }

            $user->save();
            $user->profile_image;
            if (!empty($request['address'])) {
                foreach($request['address'] as $addressData) {
                    if (empty($addressData['id'])) {
                        $user->address()->create($addressData);

                    } else {
                        $address = $user->address()->findOrFail($addressData['id']);
                        $address->update($addressData);
                    }
                }
            }

            $user->address;
            DB::commit();

            return $user;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function updatePassword($request)
    {
        DB::beginTransaction();
        try {

            $user_id = Helpers::getCurrentUserId();
            $user = $this->model->findOrFail($user_id);
            DB::commit();

            return $user->update(['password' => Hash::make($request->password)]);

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function updateStoreProfile($request)
    {
        DB::beginTransaction();
        try {

            $store = $this->store->findOrFail($request->id);
            $store->update($request->all());
            if (isset($request['store_logo_id'])) {
                $store->store_logo()->associate($request['store_logo_id']);
            }

            DB::commit();
            return $store;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}

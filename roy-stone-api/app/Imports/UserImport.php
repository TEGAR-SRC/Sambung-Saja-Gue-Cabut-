<?php

namespace App\Imports;

use App\Models\User;
use App\Enums\RoleEnum;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use App\GraphQL\Exceptions\ExceptionHandler;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class UserImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnError
{
    private $users = [];

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email,NULL,id,deleted_at,NULL'],
            'country_code' => ['required'],
            'phone' => ['required', 'digits_between:6,15','unique:users,phone,NULL,id,deleted_at,NULL'],
            'password' => ['required', 'min:8'],
            'status' => ['required'],
        ];
    }

    public function customValidationMessages()
    {
        return [
            'name.required' => 'name field is required',
            'email.required' => 'email field is required',
            'email.unique' => 'email has already been taken.',
            'phone.required' => 'phone field is required',
            'phone.unique' => 'phone has already been taken.',
            'phone.digits_between' => 'phone digits between 9 to 15.',
            'password.required' => 'password field is required',
            'status.required' => 'status field is required',
        ];
    }

    /**
     * @param \Throwable $e
     */
    public function onError(\Throwable $e)
    {
        throw new ExceptionHandler($e->getMessage() , 422);
    }

    public function getImportedUsers()
    {
        return $this->users;
    }

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $user = new User([
            'name'  => $row['name'],
            'email' => $row['email'],
            'phone' => (string) $row['phone'],
            'country_code' => $row['country_code'],
            'status' => $row['status'],
            'password' => Hash::make($row['password']),
        ]);

        $role = Role::where('name', RoleEnum::CONSUMER)->first();
        $user->assignRole($role);
        $user->save();
        if (isset($row['profile_image'])) {
            $media = $user->addMediaFromUrl($row['profile_image'])->toMediaCollection('attachment');
            $media->save();
            $user->profile_image_id = $media->id;
            $user->save();
        }

        $user = $user->fresh();

        $this->users[] = [
            'id' => $user->id,
            'name'  => $user->name,
            'email' => $user->email,
            'country_code' => $user->country_code,
            'phone' => $user->phone,
            'status' => $user->status,
            'profile_image' => $user->profile_image
        ];

        return $user;
    }
}

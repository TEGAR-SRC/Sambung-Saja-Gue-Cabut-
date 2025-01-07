<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Rules\ReCaptcha;
use App\Mail\ForgotPassword;
use App\Enums\MessageMethod;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Traits\MessageTrait;
use App\Http\Traits\UtilityTrait;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Validator;
use App\GraphQL\Exceptions\ExceptionHandler;

class AuthController extends Controller
{
    use UtilityTrait,MessageTrait;

    public function login(Request $request)
    {
        try {

            $user = $this->verifyLogin($request);
            if (!Hash::check($request->password, $user->password) || !$user->hasRole(RoleEnum::CONSUMER)) {
                throw new Exception('The entered credentials are incorrect, Please try Again!', 400);
            }

            $token = $user->createToken('auth_token')->plainTextToken;
            $user->tokens()->update([
                'role_type' => $user->getRoleNames()->first()
            ]);

            return [
                'access_token' => $token,
                'permissions'  => $user->getAllPermissions(),
                'success' => true
            ];

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function login_with_numb(Request $request)
    {
        try {

            if(Helpers::isSMSLoginEnable()) {

                $this->verifyLogin($request);
                $token = rand(11111, 99999);
                DB::table('auth_tokens')->insert([
                    'token' => $token,
                    'phone' => '+'.$request->country_code.$request->phone,
                    'created_at' => Carbon::now()
                ]);

                $message = [
                    'to' => '+'.$request->country_code.$request->phone,
                    'body' => 'Your OTP is '.$token
                ];

                $defaultMethod = Helpers::getDefaultSMSMethod();
                $this->sendMessage($message,$defaultMethod);

                return [
                    'message' => "We have sended otp in registered phone number!",
                    'success' => true
                ];
            }

            throw new Exception("The provided login method is not currently enable", 400);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function verify_auth_token(Request $request)
    {
        try {

            $validator = Validator::make($request->all(),[
                'country_code' => 'required',
                'phone'    => 'required|exists:users,phone,deleted_at,NULL|string',
                'token'    => 'required',
            ]);

            if ($validator->fails()) {
                throw new Exception($validator->messages()->first(), 422);
            }

            $verify_otp = DB::table('auth_tokens')
                    ->where('token',$request->token)
                    ->where('phone','+'.$request->country_code.$request->phone)
                    ->where('created_at','>',Carbon::now()->subHours(1))
                    ->first();

            if (!$verify_otp) {
                throw new Exception("The provided token is not recognized.", 400);
            }

            $user = User::where('phone',(string) $request->phone)->first();
            $token = $user->createToken('auth_token')->plainTextToken;
            $user->tokens()->update([
                'role_type' => $user->getRoleNames()->first()
            ]);

            return [
                'access_token' => $token,
                'permissions'  => $user->getAllPermissions(),
                'success' => true
            ];

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }

    }

    public function getAllSMSMethods()
    {
        $settings = Helpers::getSettings();
        $sms_methods = MessageMethod::ALL_MESSAGE_METHODS;
         foreach ($sms_methods as $sms_method) {
                $methods[] = [
                    "title" => $settings['sms_methods'][$sms_method]['title'],
                    "status" => $settings['sms_methods'][$sms_method]['status']
                ];
         }
         return $methods;
    }

    public function verifyVendor(User $vendor)
    {
        if (Helpers::isMultiVendorEnable()) {
            if ($vendor->store->first()->is_approved) {
                return true;
            }

            throw new Exception('Please await store approval before logging in.', 403);
        }

        throw new Exception('The multi-vendor feature is currently deactivated.', 403);
    }

    public function backendLogin(Request $request)
    {
        try {

            $user = $this->verifyLogin($request);
            if (!Hash::check($request->password, $user->password) || $user->hasRole(RoleEnum::CONSUMER)) {
                throw new Exception('The entered backend credentials are incorrect, Please try Again!', 400);
            }

            $token = $user->createToken('auth_token')->plainTextToken;
            if ($user->hasRole(RoleEnum::VENDOR)) {
                $this->verifyVendor($user);
            }

            $user->tokens()->update([
                'role_type' => $user->getRoleNames()->first()
            ]);

            return [
                'access_token' => $token,
                'permissions'  => $user->getAllPermissions(),
                'success' => true
            ];

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function verifyLogin(Request $request)
    {
        try {

            $validator = Validator::make($request->all(),[
                'email'    => ['nullable',Rule::requiredIf(!$request->phone),'email'],
                'password' => ['nullable',Rule::requiredIf(!$request->phone)],
                'recaptcha' => ['nullable', new ReCaptcha],
                'phone' => ['nullable',Rule::requiredIf(!$request->email)],
                'country_code' => ['nullable',Rule::requiredIf(!$request->email)]
            ]);

            if ($validator->fails()) {
                throw new Exception($validator->messages()->first(), 422);
            }

            $user = null;
            if ($request->email) {
                $user = User::where('email', $request->email)->whereNull('deleted_at')?->first();
            } elseif ($request->phone) {
                $user = User::where('phone', (String) $request->phone)->whereNull('deleted_at')?->first();
            }

            if (!$user && isset($request->email)) {
                throw new Exception("There is no account linked to the given email.", 400);
            }

            if (!$user && isset($request->phone)) {
                throw new Exception("There is no account linked to the given number.", 400);
            }

            if (!$user->status) {
                throw new Exception("You cannot log in with a disabled account.", 400);
            }

            return $user;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function register(Request $request)
    {
        DB::beginTransaction();
        try {

            $validator = Validator::make($request->all(),[
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,NULL,id,deleted_at,NULL',
                'password' => 'required|string|min:8|confirmed',
                'password_confirmation' => 'required',
                'country_code' => 'required',
                'phone' => 'required|min:9|unique:users,phone,NULL,id,deleted_at,NULL',
            ]);

            if ($validator->fails()) {
                throw new Exception($validator->messages()->first(), 422);
            }

            $user = $this->createAccount($request);
            $token = $user->createToken('auth_token')?->plainTextToken;
            $user->tokens()->update([
                'role_type' => $user->getRoleNames()?->first()
            ]);

            DB::commit();
            return [
                'access_token' => $token,
                'permissions'  =>  $user->getPermissionNames(),
                'success' => true
            ];

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getActiveUserByEmail($email)
    {
        return User::where('email', $email)->where('status', true)?->first();
    }

    Public function backendForgotPassword(Request $request)
    {
        try {

            $validator = Validator::make($request->all(),[
                'email' => 'required|email|exists:users,email,deleted_at,NULL|string',
            ]);

            if ($validator->fails()) {
                throw new Exception($validator->messages()->first(), 422);
            }

            $user = $this->getActiveUserByEmail($request->email);
            if ($user) {
                if (!$user->hasRole(RoleEnum::CONSUMER)) {
                    $token = rand(11111, 99999);
                    DB::table('password_resets')->insert([
                        'email' => $request->email,
                        'token' => $token,
                        'created_at' => Carbon::now()
                    ]);

                    try {

                        Mail::to($request->email)->queue(new ForgotPassword($token));

                    } catch (Exception $e) {

                        throw new Exception($e->getMessage(), $e->getCode());
                    }

                    return [
                        'message' => "We have e-mailed verification code in registered mail!",
                        'success' => true
                    ];
                }

                throw new Exception("Password reset is not available here for consumers.", 400);
            }

            throw new Exception("Provided email is not active.", 400);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function forgotPassword(Request $request)
    {
        try {

            $validator = Validator::make($request->all(),[
                'email' => 'required|email|exists:users,email,deleted_at,NULL|string',
            ]);

            if ($validator->fails()) {
                throw new Exception($validator->messages()->first(), 422);
            }

            $token = rand(11111, 99999);
            DB::table('password_resets')->insert([
                'email' => $request->email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);

            try {

                Mail::to($request->email)->queue(new ForgotPassword($token));

            } catch (Exception $e) {

                throw new Exception($e->getMessage(), $e->getCode());
            }

            return [
                'message' => "We have e-mailed verification code in registered mail!",
                'success' => true
            ];

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function verifyToken(Request $request)
    {
        try {

            $validator = Validator::make($request->all(),[
                'token' => 'required',
                'email' => 'required|email|max:255|exists:users,email,deleted_at,NULL|string',
            ]);

            if ($validator->fails()) {
                throw new Exception($validator->messages()->first(), 422);
            }

            $user = DB::table('password_resets')
                ->where('token',$request->token)
                ->where('email',$request->email)
                ->where('created_at','>',Carbon::now()->subHours(1))
                ->first();

            if (!$user) {
                throw new Exception('The provided email or token is not recognized.', 400);
            }

            return [
                'message' => "Verification token has been successfully verified.",
                'success' => true
            ];

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function updatePassword(Request $request)
    {
        DB::beginTransaction();
        try {

            $validator = Validator::make($request->all(),[
                'token' => 'required',
                'email' => 'required|email|max:255|exists:users,email,deleted_at,NULL|string',
                'password' => 'required|min:8|confirmed',
                'password_confirmation' => 'required'
            ]);

            if ($validator->fails()) {
                throw new Exception($validator->messages()->first(), 422);
            }

            $user = DB::table('password_resets')
                ->where('token',$request->token)
                ->where('email',$request->email)
                ->where('created_at','>',Carbon::now()->subHours(1))
                ->first();

            if (!$user) {
                throw new Exception('The provided email or token is not recognized.', 400);
            }

            User::where('email',$request->email)
                ->update(['password' => Hash::make($request->password)]);

            DB::table('password_resets')->where('email',$request->email)->delete();
            DB::commit();

            return [
                'message' => "Your password has been successfully changed!",
                'success' => true
            ];

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function logout(Request $request)
    {
        try {

            $token = PersonalAccessToken::findToken($request->bearerToken());
            if(!$token) {
                throw new Exception('The provided access token is not valid. Please try again.', 400);
            }

            $token->delete();
            return [
                'message' => "You are all logged out! We hope to see you soon again.",
                'success' => true
            ];

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}

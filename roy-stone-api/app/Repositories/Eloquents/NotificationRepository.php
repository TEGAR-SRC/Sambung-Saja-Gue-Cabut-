<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\User;
use App\Mail\TestMail;
use App\Helpers\Helpers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Config;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;

class NotificationRepository extends BaseRepository
{

    protected $notification;

    function model()
    {
        return User::class;
    }

    public function markAsRead($request)
    {
        DB::beginTransaction();
        try {

            $user_id = Helpers::getCurrentUserId();
            $user = $this->model->findOrFail($user_id);
            $user->unreadNotifications->markAsRead();
            DB::commit();

            return $user->notifications()->paginate($request->paginate);

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            $user_id = Helpers::getCurrentUserId();
            $user = $this->model->findOrFail($user_id)->first();
            return $user->notifications()->where('id', $id)->first()->destroy($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function test($request)
    {
        try {

            Config::set('mail.default', $request->mail_mailer ?? 'smtp');
            if ($request->mail_mailer == 'smtp' || $request->mail_mailer == 'sendmail') {
                Config::set('mail.mailers.smtp.host', $request->mail_host ?? '');
                Config::set('mail.mailers.smtp.port', $request->mail_port ?? 465);
                Config::set('mail.mailers.smtp.encryption', $request->mail_encryption ?? 'ssl');
                Config::set('mail.mailers.smtp.username', $request->mail_username ?? '');
                Config::set('mail.mailers.smtp.password', $request->mail_password ?? '');
                Config::set('mail.from.name', $request->mail_from_name ?? env('APP_NAME'));
                Config::set('mail.from.address', $request->mail_from_address ?? '');
            }

            if ($request->mail_mailer == 'mailgun') {
                Config::set('services.domain', $request->mailgun_domain ?? '');
                Config::set('services.secret', $request->mailgun_secret ?? '');
            }

            Mail::to($request->email)->queue(new TestMail());
            return [
                "message" => "Mail sent successfully!",
                "success" =>true
            ];

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}

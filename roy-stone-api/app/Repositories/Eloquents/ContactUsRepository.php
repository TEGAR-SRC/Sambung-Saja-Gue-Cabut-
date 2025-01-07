<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\ContactUs;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactUs as MailContactUs;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;

class ContactUsRepository extends BaseRepository
{
    function model()
    {
        return ContactUs::class;
    }

    public function contactUs($request)
    {
        try {

            try {
                Mail::to(env('MAIL_FROM_ADDRESS'))->send(new MailContactUs($request));
            } catch (Exception $e) {}
            return response()->json([
                'message' => 'Thank you for contact us, we will contact you shortly.' ,
                'success' => true
            ], 200);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}

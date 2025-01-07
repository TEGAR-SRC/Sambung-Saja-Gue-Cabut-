<?php

namespace App\Http\Traits;

use Exception;
use App\Messages\Twilio;
use App\Enums\MessageMethod;
use App\GraphQL\Exceptions\ExceptionHandler;

trait MessageTrait
{

   public function sendMessage($message,$message_method)
   {
      try {

         switch ($message_method) {
               case MessageMethod::TWILIO:
                  return Twilio::getIntent($message);

               default:
                  throw new Exception('The selected message method is not valid.', 400);
         }

      } catch (Exception $e) {

         throw new ExceptionHandler($e->getMessage(), $e->getCode());
      }

   }
}

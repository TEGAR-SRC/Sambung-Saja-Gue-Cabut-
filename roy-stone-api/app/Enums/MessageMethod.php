<?php

namespace App\Enums;

enum MessageMethod:string {
   const TWILIO = 'twilio';
   const ALL_MESSAGE_METHODS = [
    'twilio'
   ];
}
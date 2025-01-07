<?php

namespace App\Enums;

enum BadgeEnum:string {
  const PRODUCT = 'product';
  const STORE = 'store';
  const REFUND = 'refund';
  const QUESTION_AND_ANSWER = 'question_and_answer';
  const WITHDRAW_REQUEST = 'withdraw_request';
}

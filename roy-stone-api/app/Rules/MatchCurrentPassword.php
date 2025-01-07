<?php

namespace App\Rules;

use Closure;
use App\Helpers\Helpers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Validation\ValidationRule;

class MatchCurrentPassword implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!Helpers::isUserLogin()) {
            $fail('Unauthenticated.');
        }

        if (!Hash::check($value, auth()->user()->password)) {
            $fail('The current password does not match with old password.');
        }
    }
}

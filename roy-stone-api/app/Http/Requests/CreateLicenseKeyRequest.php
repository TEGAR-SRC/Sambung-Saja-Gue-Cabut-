<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use Illuminate\Contracts\Validation\Validator;

class CreateLicenseKeyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'license_keys.*' => ['required', 'unique:license_keys,license_key,NULL,id,deleted_at,NULL'],
            'separator' => ['required', 'in:new_line,double_new_line,comma,semicolon,pipe'],
            'product_id' => ['exists:products,id,deleted_at,NULL'],
            'variation_id' => ['nullable','exists:variations,id,deleted_at,NULL'],
            'status' => ['min:0','max:1'],
        ];
    }

    protected function prepareForValidation()
    {
        switch($this->separator) {
            case 'new_line':
                $license_keys = explode('\n', $this->license_key);
                break;
            case 'double_new_line':
                $license_keys = explode('\n\n', $this->license_key);
                break;
            case 'comma':
                $license_keys = explode(',', $this->license_key);
                break;
            case 'semicolon':
                $license_keys = explode(';', $this->license_key);
                break;
            case 'pipe':
                $license_keys = explode('|', $this->license_key);
                break;
            default:
                $license_keys = [];
        }

        $this->merge([
            'license_keys' => $license_keys,
        ]);
    }

    public function messages()
    {
        return [
            'separator.in' => 'Separator can be new_line or double_new_line or comma or semicolon or pipe',
            'license_keys.*.unique' => 'The license keys has already been taken.',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new ExceptionHandler($validator->errors()->first(), 422);
    }
}

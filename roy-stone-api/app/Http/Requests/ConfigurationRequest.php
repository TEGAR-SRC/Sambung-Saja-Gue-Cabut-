<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConfigurationRequest extends FormRequest
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
            'database.DB_HOST' => 'required', 'max:255', 'regex:/^\S*$/u',
            'database.DB_PORT' => 'required', 'regex:/^\S*$/u', 'max:10',
            'database.DB_USERNAME' => 'required', 'regex:/^\S*$/u', 'max:255',
            'database.DB_PASSWORD' => 'nullable',
            'database.DB_DATABASE' => 'required', 'regex:/^\S*$/u', 'max:255',
            'admin.first_name' => 'required', 'max:255',
            'admin.last_name' => 'required', 'max:255',
            'admin.email' => 'required', 'email', 'max:255',
            'admin.password' => 'required', 'confirmed', 'min:8',
        ];
    }

    public function attributes()
    {
        return [
            'database.DB_HOST' => 'host',
            'database.DB_PORT' => 'port',
            'database.DB_USERNAME' => 'database username',
            'database.DB_PASSWORD' => 'database password',
            'database.DB_DATABASE' => 'database name',
            'admin.first_name' => ' first name',
            'admin.last_name' => 'last name',
            'admin.email' => 'email',
            'admin.password' => 'password',
        ];
    }

    public function messages()
    {
        return [
            'database.DB_HOST.regex' => 'There should be no whitespace in host name',
            'database.DB_PORT.regex' => 'There should be no whitespace in port number',
            'database.DB_USERNAME.regex' => 'There should be no whitespace in username',
            'database.DB_DATABASE.regex' => 'There should be no whitespace in database name',
        ];
    }
}

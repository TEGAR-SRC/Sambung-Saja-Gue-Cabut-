@component('mail::message')
    <h1>Reset your account password</h1>
    You can use the following code to recover your account
    <h2>{{ $token }}</h2>
@endcomponent

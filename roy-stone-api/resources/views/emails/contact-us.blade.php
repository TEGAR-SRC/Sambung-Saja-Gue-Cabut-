@component('mail::message')
    <strong>User details: </strong><br>
    <strong>Name: </strong>{{ $contact->name }} <br>
    <strong>Email: </strong>{{ $contact->email }} <br>
    <strong>Phone: </strong>{{ $contact->phone }} <br>
    <strong>Subject: </strong>{{ $contact->subject }} <br>
    <strong>Message: </strong>{{ $contact->message }} <br><br>
@endcomponent

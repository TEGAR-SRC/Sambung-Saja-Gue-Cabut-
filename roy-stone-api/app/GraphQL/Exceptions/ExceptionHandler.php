<?php

namespace App\GraphQL\Exceptions;

use Exception;
use GraphQL\Error\ClientAware;
use GraphQL\Error\ProvidesExtensions;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Exceptions\HttpResponseException;

class ExceptionHandler extends Exception implements ClientAware, ProvidesExtensions
{
    protected $statusCode;

    public function __construct(string $message, $statusCode)
    {
        $statusCode = (is_int($statusCode) && ($statusCode > 0 && $statusCode<=500)) ?$statusCode : Response::HTTP_INTERNAL_SERVER_ERROR;
        parent::__construct($message, $statusCode);

        $this->message = $message;
        $this->statusCode = $statusCode;
    }

    public function isClientSafe(): bool
    {
        return true;
    }

    public function getCategory(): string
    {
        return trans('errors.get_category');
    }

    public function getExtensions() : array
    {
        throw new HttpResponseException(response()->json([
            "message" => $this->message,
            "success" => false
        ], $this->statusCode));
    }
}

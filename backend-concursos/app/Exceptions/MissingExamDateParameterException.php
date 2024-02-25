<?php

namespace App\Exceptions;

use Exception;

class MissingExamDateParameterException extends Exception
{
    public function __construct(string $message = null, int $code = 0)
    {
        parent::__construct($message, $code);
    }
}

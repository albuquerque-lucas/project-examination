<?php

namespace App\Exceptions;

use InvalidArgumentException;

class InvalidDateFormatException extends InvalidArgumentException
{
    public function __construct(string $message = null, int $code = 0)
    {
        parent::__construct($message, $code);
    }
}

<?php

namespace App\Exceptions;

use InvalidArgumentException;

class InvalidDateFormatException extends InvalidArgumentException
{
    protected $defaultMessage = 'Data inválida. Use o formato YYYY-MM-DD.';

    public function __construct(string $message)
    {
        $message = $message ?: $this->defaultMessage;
        parent::__construct($message);
    }
}

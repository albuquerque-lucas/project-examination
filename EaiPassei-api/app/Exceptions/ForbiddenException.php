<?php

class ForbiddenException extends Exception
{
    public function __construct($message = "Forbidden", $code = 403, Exception $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}
<?php

namespace App\Http\Middleware;

use App\Exceptions\InvalidDateFormatException;
use App\Exceptions\MissingExamDateParameterException;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidadeExamDateGetter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $registrationDate = $request->header('registrationDate');
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $registrationDate)) {
            throw new InvalidDateFormatException('Data inválida. Use o formato YYYY-MM-DD.');
        }



        if (!$registrationDate) {
            throw new MissingExamDateParameterException('Missing required parameter: examDate');
        }



        return $next($request);
    }
}

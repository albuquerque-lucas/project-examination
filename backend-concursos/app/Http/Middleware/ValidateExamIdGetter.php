<?php

namespace App\Http\Middleware;

use App\Exceptions\MissingIdParameterException;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateExamIdGetter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $id = $request->route('id');
        if (!$id) {
            throw new MissingIdParameterException('Missing required parameter: id');
        }
        return $next($request);
    }
}

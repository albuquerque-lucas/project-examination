<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use InvalidArgumentException;

class ValidateExamInstitutionGetter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $institution = $request->query('institution');
        if (!$institution) {
            throw new InvalidArgumentException('Missing required parameter: institution');
        }
        return $next($request);
    }
}

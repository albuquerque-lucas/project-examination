<?php

namespace App\Http\Middleware;

use App\Exceptions\MissingInstitutionParameterException;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateExamInstitutionGetter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $institution = $request->header('institution');
        if (!$institution) {
            throw new MissingInstitutionParameterException('Missing required parameter: institution');
        }
        return $next($request);
    }
}

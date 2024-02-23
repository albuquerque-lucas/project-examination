<?php

namespace App\Http\Middleware;

use App\Exceptions\MissingTitleParameterException;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateExamTitleGetter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $title = $request->header('title');
        if (!$title) {
            throw new MissingTitleParameterException('Missing required parameter: title');
        }
        return $next($request);
    }
}

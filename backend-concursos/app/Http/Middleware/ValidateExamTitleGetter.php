<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use InvalidArgumentException;
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
        $order = $request->input('order', 'desc');
        if (!$title) {
            throw new InvalidArgumentException('Missing required parameter: title');
        }
        return $next($request);
    }
}

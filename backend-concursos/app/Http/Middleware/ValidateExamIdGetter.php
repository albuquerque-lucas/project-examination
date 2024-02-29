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
        try {
            $id = filter_var($request->query('id'), FILTER_VALIDATE_INT);
            if (!$id) {
                throw new MissingIdParameterException('Missing required parameter: id', 400);
            }
            return $next($request);

        } catch (MissingIdParameterException $exception) {
            return response()->json(
                [
                    'message' => $exception->getMessage(),
                    'code' => $exception->getCode()
                ],
                $exception->getCode()
            );
        }
    }
}

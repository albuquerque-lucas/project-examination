<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Exceptions\MissingIdParameterException;

class ValidateEducationalLevelParameterGetter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $educationalLevelId = $request->header('educational-level');
            if (!$educationalLevelId) {
                throw new MissingIdParameterException('Nao e possivel concluir a requisicao. Falta o parametro educational-level', 400);
            }
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ], $exception->getCode());
        }
        return $next($request);
    }
}

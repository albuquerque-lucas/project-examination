<?php

namespace App\Http\Middleware;

use App\Exceptions\MissingRequiredParameter;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Exceptions\MissingIdParameterException;

class ValidateEducationalLevelGetter
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
                throw new MissingRequiredParameter('Nível de Escolaridade');
            }

            return $next($request);
        } catch (MissingRequiredParameter $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ],
                $exception->getCode()
            );
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ],
                $exception->getCode()
            );
        }
    }
}

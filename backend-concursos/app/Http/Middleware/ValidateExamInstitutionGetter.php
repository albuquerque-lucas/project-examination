<?php

namespace App\Http\Middleware;

use App\Exceptions\MissingInstitutionParameterException;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Exception;

class ValidateExamInstitutionGetter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $institution = $request->header('institution');
            if (!$institution) {
                throw new MissingInstitutionParameterException('E necessario informar a instituicao do concurso.', 400);
            }
            return $next($request);

        } catch (MissingInstitutionParameterException $missingInstitutionParameterException) {
            return response()->json(['message' => $missingInstitutionParameterException->getMessage(),
            'code' => $missingInstitutionParameterException->getCode()],
            $missingInstitutionParameterException->getCode(),
        );
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()]);
        }
    }
}

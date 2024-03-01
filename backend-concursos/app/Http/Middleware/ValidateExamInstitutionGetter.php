<?php

namespace App\Http\Middleware;

use App\Exceptions\MissingInstitutionParameterException;
use App\Exceptions\MissingRequiredParameter;
use App\Exceptions\WrongInputType;
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
            $institutionType = gettype($institution);

            if (!$institution) {
                throw new MissingRequiredParameter('Instituição');
            }

            if ($institutionType !== "string") {
                throw new WrongInputType('string', $institutionType);
            }

            return $next($request);
        } catch (MissingRequiredParameter $exception) {
            return response()->json([
                    'message' => $exception->getMessage(),
                    'code' => $exception->getCode()
                ],
                    $exception->getCode()
            );
        } catch (WrongInputType $exception) {
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

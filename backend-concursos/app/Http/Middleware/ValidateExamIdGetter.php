<?php

namespace App\Http\Middleware;

use App\Exceptions\MissingRequiredParameter;
use App\Exceptions\WrongInputType;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Exception;

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
            $idType = gettype($id);

            if (!$id) {
                throw new MissingRequiredParameter('Id');
            }

            if ($idType !== "integer") {
                throw new WrongInputType('integer', $idType);
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

<?php

namespace App\Http\Middleware;

use App\Exceptions\InvalidDateFormatException;
use App\Exceptions\MissingExamDateParameterException;
use App\Exceptions\MissingRequiredParameter;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Exception;

class ValidateExamDateGetter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $registrationDate = $request->header('registrationDate');
            
            if (!$registrationDate) {
                throw new MissingRequiredParameter('Data');
            }
            
            if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $registrationDate)) {
                throw new InvalidDateFormatException('Data informada no formato inválido. Utilize YYYY-MM-DD.', 400);
            }
    
    
            return $next($request);
        } catch (MissingRequiredParameter $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ],
                $exception->getCode(),
            );

        } catch (InvalidDateFormatException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ],
                $exception->getCode(),
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

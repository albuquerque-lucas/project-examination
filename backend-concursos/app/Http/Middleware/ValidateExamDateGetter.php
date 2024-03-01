<?php

namespace App\Http\Middleware;

use App\Exceptions\InvalidDateFormatException;
use App\Exceptions\MissingExamDateParameterException;
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
                throw new MissingExamDateParameterException('A requisicao nao pode ser completada. Faltando parametro registrationDate', 400);
            }
            
            if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $registrationDate)) {
                throw new InvalidDateFormatException('Data informada no formato inválido. Utilize YYYY-MM-DD.', 400);
            }
    
    
            return $next($request);
        } catch (MissingExamDateParameterException $missingParameterException) {
            return response()->json(
                ['message' => $missingParameterException->getMessage(),
                'code' => $missingParameterException->getCode()],
                $missingParameterException->getCode(),
            );

        } catch (InvalidDateFormatException $invalidFormatException) {
            return response()->json(['message' => $invalidFormatException->getMessage(),
            'code' => $invalidFormatException->getCode()],
            $invalidFormatException->getCode(),
        );
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'code' => $e->getCode()]);
        }

    }
}

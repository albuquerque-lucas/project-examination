<?php

namespace App\Http\Middleware;

use App\Exceptions\MissingRequiredParameter;
use App\Exceptions\MissingTitleParameterException;
use App\Exceptions\WrongInputType;
use Closure;
use Exception;
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
        try {
            $title = $request->header('title');
            $titleType = gettype($title);

            if (!$title) {
                throw new MissingRequiredParameter('Título');
            }

            if ($titleType !== 'string') {
                throw new WrongInputType('string', $titleType);
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

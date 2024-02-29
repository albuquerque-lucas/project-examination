<?php

namespace App\Http\Middleware;

use App\Exceptions\MissingTitleParameterException;
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
            if (!$title) {
                throw new MissingTitleParameterException('E necessario informar o titulo do concurso.', 400);
            }
            return $next($request);

        } catch( MissingTitleParameterException $missingParameterException) {
            return response()->json(
                [
                    'message' => $missingParameterException->getMessage(),
                    'code' => $missingParameterException->getCode()
                ],
                $missingParameterException->getCode()
            );
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], $exception->getCode());
        }
    }
}

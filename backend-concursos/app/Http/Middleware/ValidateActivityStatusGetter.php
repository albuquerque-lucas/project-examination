<?php

namespace App\Http\Middleware;

use App\Exceptions\MissingRequiredParameter;
use App\Exceptions\WrongInputType;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Spatie\FlareClient\Http\Exceptions\MissingParameter;
use Symfony\Component\HttpFoundation\Response;

class ValidateActivityStatusGetter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $isActive = $request->header('active');
            $isActiveType = gettype($isActive);

            if ($isActiveType !== "boolean") {
                throw new WrongInputType("boolean", $isActiveType);
            }

            if ($isActive === null) {
                throw new MissingRequiredParameter('Status');
            }

            return $next($request);
        } catch(MissingRequiredParameter $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ], $exception->getCode());

        } catch (WrongInputType $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ], $exception->getCode());
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ], $exception->getCode());

        }
    }
}

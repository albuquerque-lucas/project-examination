<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use InvalidArgumentException;

class ValidateOrderParam
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $order = $request->query('order', 'desc');
            if (!in_array($order, ['asc', 'desc'])) {
                throw new InvalidArgumentException('Parâmetro de ordenação inválido. Use "asc" ou "desc".', 400);
            }
    
            return $next($request);

        } catch (InvalidArgumentException $exception) {
            return response()->json(['message' => $exception->getMessage(),
            'code' => $exception->getCode()],
            $exception->getCode(),
            );
        }
    }
}

<?php

namespace App\Http\Middleware;

use App\Services\TokenService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class CekCookie
{
    private TokenService $tokenService;

    public function __construct()
    {
        $this->tokenService = new TokenService();
    }

    public function handle(Request $request, Closure $next): Response
    {
        $token = Cookie::get('vistoken');

        if (!$token) {
            Cookie::queue(Cookie::forget('vistoken'));
            return redirect('/auth');
        }

        $cookieIsValid = $this->tokenService->check();

        if(!$cookieIsValid) {
            Cookie::queue(Cookie::forget('vistoken'));
            return redirect('/auth');
        }

        return $next($request);

    }
}

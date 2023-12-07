<?php

namespace App\Http\Middleware;

use App\Services\TokenService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class RoleMiddleware
{
    private TokenService $tokenService;

    public function __construct()
    {
        $this->tokenService = new TokenService();
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        $user = User::find($this->tokenService->userId());

        if(!$user->hasRole($role)) {
            abort(401, 'Unauthorized');
        }

        return $next($request);
    }
}

<?php

namespace App\Http\Middleware;

use App\Models\School;
use App\Services\DashboardService;
use App\Services\TokenService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSchoolData
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
    public function handle(Request $request, Closure $next): Response
    {
        $data = School::where("user_id", $this->tokenService->userId())->first();

        if(!$data) {
            return redirect()->route('school.create');
        }

        return $next($request);
    }
}

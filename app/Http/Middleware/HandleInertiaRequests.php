<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    private TokenService $tokenService;

    public function __construct()
    {
        $this->tokenService = new TokenService();
    }

    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if ($this->tokenService->checkToken())
        {
            $currentUser = $this->tokenService->currentUser();

            $user = User::where("email", $currentUser->email)->first();
        }else{
            $user = null;
        }



        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ?? null,
                'roles'     => $user ? $user->getRoleNames(): [],
                'school' => $user->school ?? null,
                'teacher_school' => $user->teacherSchool ?? null
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}

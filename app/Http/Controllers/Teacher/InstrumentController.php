<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Component;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstrumentController extends Controller
{
    protected $tokenService;

    public function __construct(TokenService $tokenService)
    {
        $this->tokenService = $tokenService;
    }

    public function index()
    {
        $schoolId = $this->tokenService->getCurrentSchoolId();
        
        $components = Component::forSchool($schoolId)
            ->with('details')
            ->get();

        return Inertia::render("Teachers/Instrument", [
            'components' => $components
        ]);
    }
}

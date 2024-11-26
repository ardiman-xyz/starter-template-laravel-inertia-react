<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CalendarController extends Controller
{

    public function __construct(
        protected TokenService $tokenService
    ){}

    public function index()
    {
        return Inertia::render("Calendar/Index", []);
    }


    public function getUpcomingSupervisi()
    {

        $currentUser = $this->tokenService->currentUser();

        if(!$currentUser)
        {
            Cookie::forget('vistoken');

            return redirect()->route('auth.login');
        }

        $user = User::find($currentUser->id);

        if(!$user)
        {
            Cookie::forget('vistoken');

            return redirect()->route('auth.login');
        }


        return DB::table('assessments as a')
            ->join('users as t', 'a.teacher_id', '=', 't.id')
            ->leftJoin('academic_semesters as sem', 'a.academic_semester_id', '=', 'sem.id')
            ->where('a.school_id',  $user->school->id)
            ->where('a.status', '!=', 'completed')
            ->where('a.started_at', '>=', now()->startOfMonth())
            ->select([
                'a.id',
                'a.title',
                'a.started_at as start',
                'a.finished_at as end',
                'a.status',
                't.name as teacher_name',
                'sem.semester',
                'sem.academic_year',
                DB::raw("CASE 
                    WHEN a.status = 'completed' THEN '#22c55e' 
                    ELSE '#f97316'                              
                END as color")
            ])
            ->orderBy('a.started_at')
            ->get();
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Vacancy;
use App\Models\Application;


class DashboardController extends Controller
{
    public function dashboard()
    {
        $vacancies = Vacancy::all();
        $applications = Application::all();
        return Inertia::render('Dashboard',[
            'vacancies' => $vacancies,
            'applications' => $applications,  
        ]);
    }

    public function viewApplicantList($id): Response
    {
        // dd('success');
        $applications = Application::where('vacancy_uuid', $id)->get();
        $vacancies = Vacancy::all();
        // dd($applications);
        return Inertia::render('ApplicationReceived/ApplicationReceivedIndex', [
            'applications' => $applications,
            'vacancies' => $vacancies,
        ]);
    }

}

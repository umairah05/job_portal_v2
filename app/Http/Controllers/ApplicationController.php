<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Application;
use App\Models\Vacancy;

class ApplicationController extends Controller
{
    public function applicationIndex() :Response
    {
        $vacancies = Vacancy::where('start_date','<=',now())->where('end_date','>=',now())->get();
        // dd($application);
        return Inertia::render('Application/ApplicationIndex', [
            'vacancies' => $vacancies
        ]);
    }

    public function saveApplication(Request $request): RedirectResponse
    {
    //    dd($request->all());
       $application_snapshot_json = json_encode($request->all());
    //    dd($application_snapshot_json);
    //  dd('test');

       $validated = $request->validate([
            'name' => 'required|string|max:255',
            'ic_number' => 'required|string|max:255',
            'age' => 'required|string|max:255',
            'education' => 'required|array|max:255',
            "employers" => 'required|array|max:255',
            "familyMembers" => 'required|array|max:255',
            "medical_condition" => 'required|string',
            "dateOfBirth" => 'required|string|max:255',
            "gender" => 'required|string|max:255',
            "marital_status" => 'required|string|max:255',
            "ethnicity" => 'required|string|max:255',
            "children_num" => 'nullable|string',
            "address" => 'required|string|max:255',
            "address_postal" => 'nullable|string',
            "no_phone" => 'required|string|max:255',
            "email" => 'required|string|max:255',
            "phone_home" => 'nullable|string',
            "expected_salary" => 'required|string|max:255',  
            "start_date" => 'required|string|max:255',
            "salary" => 'required|string|max:255',
            "bonus" => 'nullable|string',
            "allowance" => 'nullable|string',
            "bonus_date" => 'nullable|string',
            "report_to" => 'required|string|max:255',
            "report_count" => 'required|string|max:255',
            "notice_period" => 'required|string|max:255',
            "language_malay" => 'required|string|max:255',
            "language_english" => 'required|string|max:255',
            "language" => 'nullable|string',
            "other_language" => 'nullable|string',
            "crime_charge" => 'required|string|max:255',
            "bankruptcy" => 'required|string|max:255',
            "business_involvement" => 'required|string|max:255',
            "license" => 'required|string|max:255',
            "smoker" => 'required|string|max:255',
            "drinker" => 'required|string|max:255',
            "physical_disability" => 'required|string',
            "pregnancy_status" => 'required|string',
            "achievement" => 'required|string|max:255',
            "reference_name_1" => 'required|string|max:255',
            "reference_relationship_1" => 'required|string|max:255',
            "reference_phone_1" => 'required|string|max:255',
            "reference_name_2" => 'required|string|max:255',
            "reference_phone_2" => 'required|string|max:255',
            "reference_company_2" => 'required|string|max:255',
            "reference_position_2" => 'required|string|max:255',
            "resume" => 'required',
            'vacancy_uuid' => 'required',
       ]);
    //    dd($validated);
        $application= new application();
        // $application= json_encode($application_snapshot_json->application_snapshot);
        $application->vacancy_uuid = $validated['vacancy_uuid'];
        $application->application_snapshot = $application_snapshot_json;
        $application->candidate_nric = $validated['ic_number'];
        // dd($application);
        $application->save();

        return Redirect::route('application');
    }

    public function applicationReceivedIndex() :Response
    {
        $applications = Application::all();
        $vacancies = Vacancy::all();
        // dd($applications);
        return Inertia::render('ApplicationReceived/ApplicationReceivedIndex', [
            'applications' => $applications,
            'vacancies' => $vacancies,
        ]);
    }

    //papar 
    public function viewApplicationReceived($id): Response
    {
        // dd($id);
        // $applications = Application::all();
        $application = Application::findOrFail($id);
        // dd($application);
        return Inertia::render('ApplicationReceived/ViewApplicationReceived', [
            'application' => $application,
        ]);
    }

    //padam
    public function deleteApplication(Request $requestd): RedirectResponse
    {
        // dd($request->all());
        Application::findOrFail($requestd->id)->delete();
        
        return Redirect::route('application')->with('success', 'Vacancy deleted successfully.');

         
    }
}

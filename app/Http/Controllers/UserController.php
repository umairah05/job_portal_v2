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
use App\Models\User;

class UserController extends Controller
{
    public function userIndex(): Response
    {
        $user = User::all();
        // dd($user);
        return Inertia::render('User/UserIndex', [
            'user' => $user,
        ]);
    }
}

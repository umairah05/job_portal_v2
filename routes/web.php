<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VacancyController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\IndexController;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

    Route::get('/', [IndexController::class, 'welcome'])->name('welcome');

    //application
    Route::get('/application', [ApplicationController::class, 'applicationIndex'])->name('application');
    Route::post('/application', [ApplicationController::class, 'saveApplication'])->name('application.save');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    //user
    Route::get('/user', [UserController::class, 'userIndex'])->name('user');

    //vacancy
    Route::get('/vacancy', [VacancyController::class, 'vacancyIndex'])->name('vacancy');
    Route::post('/vacancy', [VacancyController::class, 'saveVacancy'])->name('vacancy.save');
    Route::post('/vacancy/delete', [VacancyController::class, 'deleteVacancy'])->name('vacancy.delete');

    //applicationReceiver
    Route::get('/application-received', [ApplicationController::class, 'applicationReceivedIndex'])->name('applicationReceived');
    Route::get('/application-received/view/{id}', [ApplicationController::class, 'viewApplicationReceived'])->name('viewApplicationReceived');
    Route::post('/application-received/delete', [ApplicationController::class, 'deleteApplication'])->name('application.delete');

    //profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

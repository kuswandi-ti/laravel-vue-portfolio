<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ClientController;
use App\Http\Controllers\API\AppointmentController;
use App\Http\Controllers\API\DashboardStatusController;
use App\Http\Controllers\API\AppointmentStatusController;

use App\Http\Controllers\API\AboutController;
use App\Http\Controllers\API\SkillController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

// About
Route::get('/about', [AboutController::class, 'index']);
Route::post('/about/{id}', [AboutController::class, 'update']);

// Skills
Route::get('/skills', [SkillController::class, 'index']);
Route::post('/skills', [SkillController::class, 'store']);
Route::post('/skills/{id}', [SkillController::class, 'update']);
Route::delete('/skills/{id}', [SkillController::class, 'destroy']);
Route::delete('/skills', [SkillController::class, 'bulkDelete']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::post('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::post('/users/{id}/change-role', [UserController::class, 'changeRole']);
    Route::delete('/users', [UserController::class, 'bulkDelete']);

    Route::get('/clients', [ClientController::class, 'index']);
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::get('/appointments/{id}', [AppointmentController::class, 'edit']);
    Route::post('/appointments/{id}', [AppointmentController::class, 'update']);
    Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);

    Route::get('/appointment-status', [AppointmentStatusController::class, 'getStatusWithCount']);

    Route::get('/status/appointments', [DashboardStatusController::class, 'appointments']);    

    Route::post('/logout', [UserController::class, 'logout']);
});

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
use App\Http\Controllers\API\EducationController;
use App\Http\Controllers\API\WorkExperienceController;
use App\Http\Controllers\API\PortfolioController;

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

Route::post('/login', [UserController::class, 'login']);

// Route::middleware('auth:sanctum')->group(function () {
    // About
    Route::get('/about', [AboutController::class, 'index']);
    Route::post('/about/{id}', [AboutController::class, 'update']);

    // Skills
    Route::get('/skills', [SkillController::class, 'index']);
    Route::post('/skills', [SkillController::class, 'store']);
    Route::post('/skills/{id}', [SkillController::class, 'update']);
    Route::delete('/skills/{id}', [SkillController::class, 'destroy']);
    Route::delete('/skills', [SkillController::class, 'bulkDelete']);

    // Education
    Route::get('/educations', [EducationController::class, 'index']);
    Route::post('/educations', [EducationController::class, 'store']);
    Route::post('/educations/{id}', [EducationController::class, 'update']);
    Route::delete('/educations/{id}', [EducationController::class, 'destroy']);
    Route::delete('/educations', [EducationController::class, 'bulkDelete']);

    // Work Experience
    Route::get('/work_experiences', [WorkExperienceController::class, 'index']);
    Route::post('/work_experiences', [WorkExperienceController::class, 'store']);
    Route::post('/work_experiences/{id}', [WorkExperienceController::class, 'update']);
    Route::delete('/work_experiences/{id}', [WorkExperienceController::class, 'destroy']);
    Route::delete('/work_experiences', [WorkExperienceController::class, 'bulkDelete']);

    // Portfolio
    Route::get('/portfolios', [PortfolioController::class, 'index']);
    Route::post('/portfolios', [PortfolioController::class, 'store']);
    Route::get('/portfolios/{id}', [PortfolioController::class, 'edit']);
    Route::post('/portfolios/{id}', [PortfolioController::class, 'update']);
    Route::delete('/portfolios/{id}', [PortfolioController::class, 'destroy']);
    Route::get('/portfolios/categories/all', [PortfolioController::class, 'portfolioCategories']);

    Route::post('/logout', [UserController::class, 'logout']);
// });

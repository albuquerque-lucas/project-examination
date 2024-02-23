<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExaminationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/users/all', [UserController::class, 'getAll']);


Route::get('/examinations/all', [ExaminationController::class, 'getAll']);
Route::get('/examinations/examDate', [ExaminationController::class, 'getByExamDate']);
Route::get('/examinations/institution', [ExaminationController::class, 'getByInstitution']);
Route::get('/examinations/title', [ExaminationController::class, 'getByTitle']);
Route::get('/examinations/{id}', [ExaminationController::class, 'getById']);

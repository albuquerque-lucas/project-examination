<?php

use App\Http\Controllers\UserController;
use App\Http\Middleware\ValidateExamIdGetter;
use App\Http\Middleware\ValidateExamInstitutionGetter;
use App\Http\Middleware\ValidateOrderParam;
use App\Http\Middleware\ValidatePostExaminationsInputs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExaminationController;
use App\Http\Middleware\ValidadeExamDateGetter;
use App\Http\Middleware\ValidateExamTitleGetter;

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

Route::get('/users/all', [UserController::class, "getAll"]);


Route::get("/examinations/all", [ExaminationController::class, 'getAll'])
->middleware(ValidateOrderParam::class);

Route::post("/create/examination", [ExaminationController::class, "create"]);

Route::get('/examinations/registrationDate', [ExaminationController::class, "getByRegistrationDate"])
  ->middleware(ValidateOrderParam::class, ValidadeExamDateGetter::class);

Route::get('/examinations/institution', [ExaminationController::class, "getByInstitution"])
  ->middleware(ValidateOrderParam::class, ValidateExamInstitutionGetter::class);

Route::get('/examinations/title', [ExaminationController::class, "getByTitle"])
  ->middleware(ValidateOrderParam::class, ValidateExamTitleGetter::class);

Route::get('/examinations/{id}', [ExaminationController::class, "getById"])
  ->middleware(ValidateExamIdGetter::class);

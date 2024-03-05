<?php

use App\Http\Controllers\NoticeController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ValidateEducationalLevelGetter;
use App\Http\Middleware\ValidateExamIdGetter;
use App\Http\Middleware\ValidateExamInstitutionGetter;
use App\Http\Middleware\ValidateOrderParam;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExaminationController;
use App\Http\Middleware\ValidateExamDateGetter;
use App\Http\Middleware\ValidateExamTitleGetter;
use App\Http\Middleware\ValidateActivityStatusGetter;

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

// ROTAS DE EXAMINATIONS

Route::get("/examinations/all", [ExaminationController::class, 'getAll'])
->middleware(ValidateOrderParam::class);

Route::post("/create/examination", [ExaminationController::class, "create"]);

Route::patch("/examinations/update/{id}", [ExaminationController::class, "update"]);

Route::delete("/examinations/delete/{id}", [ExaminationController::class, "delete"]);

Route::get('/examinations/registration-date', [ExaminationController::class, "getByRegistrationDate"])
  ->middleware(ValidateOrderParam::class, ValidateExamDateGetter::class);

Route::get('/examinations/institution', [ExaminationController::class, "getByInstitution"])
  ->middleware(ValidateOrderParam::class, ValidateExamInstitutionGetter::class);

Route::get('/examinations/title', [ExaminationController::class, "getByTitle"])
  ->middleware(ValidateOrderParam::class, ValidateExamTitleGetter::class);

Route::get('/examinations/examination-id', [ExaminationController::class, "getById"])
  ->middleware(ValidateExamIdGetter::class);

  Route::get('/examinations/educational-level', [ExaminationController::class, 'getByEducationalLevel'])
  ->middleware(ValidateOrderParam::class, ValidateEducationalLevelGetter::class);

  Route::get('/examinations/activity-status', [ExaminationController::class, 'getByActivityStatus'])
  ->middleware(ValidateOrderParam::class);


  // ROTAS DE NOTICES

  Route::get('/notices/all', [NoticeController::class, 'getAll']);

  Route::get('/notices/{id}', [NoticeController::class, 'getById']);

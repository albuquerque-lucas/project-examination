<?php

use App\Http\Controllers\NoticeController;
use App\Http\Controllers\StudyAreaController;
use App\Http\Controllers\SubjectController;
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
->middleware(ValidateOrderParam::class);

Route::get('/examinations/institution', [ExaminationController::class, "getByInstitution"])
->middleware(ValidateOrderParam::class);

Route::get('/examinations/title', [ExaminationController::class, "getByTitle"])
->middleware(ValidateOrderParam::class);

Route::get('/examinations/educational-level/{id}', [ExaminationController::class, 'getByEducationalLevel'])
->middleware(ValidateOrderParam::class);

Route::get('/examinations/activity-status', [ExaminationController::class, 'getByActivityStatus'])
->middleware(ValidateOrderParam::class);

Route::get('/examinations/{id}', [ExaminationController::class, "getById"]);

  // ROTAS DE NOTICES
  Route::get('/notices/all', [NoticeController::class, 'getAll'])
  ->middleware(ValidateOrderParam::class);;
  
  Route::post('/notices/create', [NoticeController::class, 'create']);

  Route::get('/notices/{id}', [NoticeController::class, 'getById']);


  Route::patch('/notices/update/{id}', [NoticeController::class, 'update']);

  Route::delete('/notices/delete/{id}', [NoticeController::class, 'delete']);

  Route::delete('/notices/delete/examination/{id}', [NoticeController::class, 'deleteByExamination']);


  // ROTAS DE SUBJECTS
  Route::get('/subjects/all', [SubjectController::class, 'getAll'])
  ->middleware(ValidateOrderParam::class);;

  Route::get('/subjects/title', [SubjectController::class, 'getByTitle']);
  
  Route::get('/subjects/{id}', [SubjectController::class, 'getById']);

  Route::post('/subjects/create', [SubjectController::class, 'create']);

  Route::patch('/subjects/update/{id}', [SubjectController::class, 'update']);

  Route::delete('/subjects/delete/{id}', [SubjectController::class, 'delete']);


  // ROTAS DE STUDY AREAS

  ROUTE::get('/study-areas/all', [StudyAreaController::class, 'getAll']);
  ROUTE::get('/study-areas/area', [StudyAreaController::class, 'getByArea']);
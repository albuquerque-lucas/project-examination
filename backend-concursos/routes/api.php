<?php

use App\Http\Controllers\ExamController;
use App\Http\Controllers\ExamQuestionController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\StudyAreaController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ValidateOrderParam;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExaminationController;
use App\Http\Controllers\EducationalLevelController;
use App\Http\Controllers\AccountPlanController;

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
  ->middleware(ValidateOrderParam::class);
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
  Route::get('/study-areas/all', [StudyAreaController::class, 'getAll']);
  Route::get('/study-areas/{id}', [StudyAreaController::class, 'getById']);
  Route::get('/study-areas/area', [StudyAreaController::class, 'getByArea']);
  Route::post('/study-areas/create', [StudyAreaController::class, 'create']);
  Route::patch('/study-areas/update/{id}', [StudyAreaController::class, 'update']);
  Route::delete('/study-areas/delete/{id}', [StudyAreaController::class, 'delete']);


// ROTAS DE TOPIC
Route::get('/topics/all', [TopicController::class,'getAll']);
Route::get('/topics/{id}', [TopicController::class,'getById']);
Route::post('/topics/create', [TopicController::class,'create']);
Route::patch('/topics/update/{id}', [TopicController::class,'update']);
Route::delete('/topics/delete/{id}', [TopicController::class,'delete']);

// ROTAS DE EXAMS
Route::get('/exams/all', [ExamController::class,'getAll']);
Route::get('/exams/{id}', [ExamController::class,'getById']);
Route::post('/exams/create', [ExamController::class,'create']);
Route::patch('/exams/update/{id}', [ExamController::class,'update']);
Route::delete('/exams/delete/{id}', [ExamController::class,'delete']);

// ROTAS DE EXAM QUESTIONS
Route::get('/exam-questions/all', [ExamQuestionController::class,'getAll']);
Route::get('/exam-questions/{id}', [ExamQuestionController::class,'getById']);
Route::post('/exam-questions/create', [ExamQuestionController::class,'create']);
Route::patch('/exam-questions/update/{id}', [ExamQuestionController::class,'update']);
Route::delete('/exam-questions/delete/{id}', [ExamQuestionController::class,'delete']);

// ROTAS DE EXAM QUESTIONS ALTERNATIVES
// Route::get('/questions-alternatives/all', [ExamQuestionController::class,'getAll']);
// Route::get('/questions-alternatives/{id}', [ExamQuestionController::class,'getById']);
// Route::post('/questions-alternatives/create', [ExamQuestionController::class,'create']);
// Route::patch('/questions-alternatives/update/{id}', [ExamQuestionController::class,'update']);
// Route::delete('/questions-alternatives/delete/{id}', [ExamQuestionController::class,'delete']);

// ROTAS DE EDUCATIONAL LEVELS
Route::get('/educational-levels/all', [EducationalLevelController::class, 'getAll']);
Route::get('/educational-levels/{id}', [EducationalLevelController::class, 'getById']);
Route::get('/educational-levels/name', [EducationalLevelController::class, 'getByName']);
Route::post('/educational-levels/create', [EducationalLevelController::class, 'create']);
Route::patch('/educational-levels/update/{id}', [EducationalLevelController::class, 'update']);
Route::delete('/educational-levels/delete/{id}', [EducationalLevelController::class, 'delete']);

// ROTAS DE ACCOUNT PLANS
Route::get('/account-plans/all', [AccountPlanController::class, 'getAll']);
Route::get('/account-plans/{id}', [AccountPlanController::class,'getById']);
Route::get('/account-plans/name', [AccountPlanController::class,'getByName']);
Route::post('/account-plans/create', [AccountPlanController::class,'create']);
Route::patch('/account-plans/update/{id}', [AccountPlanController::class, 'update']);
Route::delete('/account-plans/delete/{id}', [AccountPlanController::class, 'delete']);
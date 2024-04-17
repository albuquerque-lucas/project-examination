<?php

use App\Http\Controllers\AccessLevelController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ExamQuestionAlternativeController;
use App\Http\Controllers\ExamQuestionController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\StudyAreaController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
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
| routes are examinationsLoaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// ROTAS DE USERS
Route::get('/users/all', [UserController::class, "getAll"]);
Route::get('/users/id/{id}', [UserController::class, "getById"]);
Route::get('/users/name/{name}', [UserController::class, "getByName"]);
Route::post('/users/create', [UserController::class, "create"]);
Route::patch('/users/update/{id}', [UserController::class, "update"]);
Route::delete('/users/delete/{id}', [UserController::class, "delete"]);

// ROTAS LOGIN
Route::post('/admin/login', [AuthController::class, "login"]);
Route::post('/admin/logout', [AuthController::class, "logout"]);
Route::get('/admin/user', [AuthController::class, "user"]);

// ROPTAS DE ACCESS LEVELS
Route::get('/access-levels/all', [AccessLevelController::class, "getAll"]);

// ROTAS DE EXAMINATIONS
Route::get("/examinations/all", [ExaminationController::class, 'getAll']);
Route::get('/examinations/id/{id}', [ExaminationController::class, "getById"]);
Route::post("/examinations/create", [ExaminationController::class, "create"]);
Route::post('/examinations/create/many', [ExaminationController::class, "createMany"]);
Route::patch("/examinations/update/{id}", [ExaminationController::class, "update"]);
Route::delete("/examinations/delete/{id}", [ExaminationController::class, "delete"]);
Route::get('/examinations/registration-date', [ExaminationController::class, "getByRegistrationDate"]);
Route::get('/examinations/institution', [ExaminationController::class, "getByInstitution"]);
Route::get('/examinations/title', [ExaminationController::class, "getByTitle"]);
Route::get('/examinations/educational-level/{id}', [ExaminationController::class, 'getByEducationalLevel']);
Route::get('/examinations/activity-status', [ExaminationController::class, 'getByActivityStatus']);


  // ROTAS DE NOTICES
  Route::get('/notices/all', [NoticeController::class, 'getAll']);
  Route::post('/notices/create', [NoticeController::class, 'create']);
  Route::post('/notices/uploadFile', [NoticeController::class, 'uploadFile']);
  Route::get('/notices/id/{id}', [NoticeController::class, 'getById']);
  Route::patch('/notices/update/{id}', [NoticeController::class, 'update']);
  Route::delete('/notices/delete', [NoticeController::class, 'delete']);
  Route::delete('/notices/delete/examination/{id}', [NoticeController::class, 'deleteByExamination']);


  // ROTAS DE SUBJECTS
  Route::get('/subjects/all', [SubjectController::class, 'getAll']);;
  Route::get('/subjects/title', [SubjectController::class, 'getByTitle']);
  Route::get('/subjects/id/{id}', [SubjectController::class, 'getById']);
  Route::post('/subjects/create', [SubjectController::class, 'create']);
  Route::patch('/subjects/update/{id}', [SubjectController::class, 'update']);
  Route::delete('/subjects/delete/{id}', [SubjectController::class, 'delete']);


  // ROTAS DE STUDY AREAS
  Route::get('/study-areas/all', [StudyAreaController::class, 'getAll']);
  Route::get('/study-areas/id/{id}', [StudyAreaController::class, 'getById']);
  Route::get('/study-areas/area', [StudyAreaController::class, 'getByArea']);
  Route::post('/study-areas/create', [StudyAreaController::class, 'create']);
  Route::patch('/study-areas/update/{id}', [StudyAreaController::class, 'update']);
  Route::delete('/study-areas/delete/{id}', [StudyAreaController::class, 'delete']);


// ROTAS DE TOPIC
Route::get('/topics/all', [TopicController::class,'getAll']);
Route::get('/topics/id/{id}', [TopicController::class,'getById']);
Route::post('/topics/create', [TopicController::class,'create']);
Route::patch('/topics/update/{id}', [TopicController::class,'update']);
Route::delete('/topics/delete/{id}', [TopicController::class,'delete']);


// ROTAS DE EXAMS
Route::get('/exams/all', [ExamController::class,'getAll']);
Route::get('/exams/id/{id}', [ExamController::class,'getById']);
Route::post('/exams/create', [ExamController::class,'create']);
Route::patch('/exams/update/{id}', [ExamController::class,'update']);
Route::delete('/exams/delete/{id}', [ExamController::class,'delete']);


// ROTAS DE EXAM QUESTIONS
Route::get('/exam-questions/all', [ExamQuestionController::class,'getAll']);
Route::post('/exam-questions/statement', [ExamQuestionController::class,'getByStatement']);
Route::get('/exam-questions/id/{id}', [ExamQuestionController::class,'getById']);
Route::post('/exam-questions/create', [ExamQuestionController::class,'create']);
Route::patch('/exam-questions/update/{id}', [ExamQuestionController::class,'update']);
Route::delete('/exam-questions/delete/{id}', [ExamQuestionController::class,'delete']);


// ROTAS DE EXAM QUESTIONS ALTERNATIVES
Route::get('/questions-alternatives/all', [ExamQuestionAlternativeController::class,'getAll']);
Route::get('/questions-alternatives/id/{id}', [ExamQuestionAlternativeController::class,'getById']);
Route::post('/questions-alternatives/create', [ExamQuestionAlternativeController::class,'create']);
Route::patch('/questions-alternatives/update/{id}', [ExamQuestionAlternativeController::class,'update']);
Route::delete('/questions-alternatives/delete/{id}', [ExamQuestionAlternativeController::class,'delete']);


// ROTAS DE EDUCATIONAL LEVELS
Route::get('/educational-levels/all', [EducationalLevelController::class, 'getAll']);
Route::get('/educational-levels/id/{id}', [EducationalLevelController::class, 'getById']);
Route::get('/educational-levels/name', [EducationalLevelController::class, 'getByName']);
Route::post('/educational-levels/create', [EducationalLevelController::class, 'create']);
Route::patch('/educational-levels/update/{id}', [EducationalLevelController::class, 'update']);
Route::delete('/educational-levels/delete/{id}', [EducationalLevelController::class, 'delete']);


// ROTAS DE ACCOUNT PLANS
Route::get('/account-plans/all', [AccountPlanController::class, 'getAll']);
Route::get('/account-plans/id/{id}', [AccountPlanController::class,'getById']);
Route::get('/account-plans/name', [AccountPlanController::class,'getByName']);
Route::post('/account-plans/create', [AccountPlanController::class,'create']);
Route::patch('/account-plans/update/{id}', [AccountPlanController::class, 'update']);
Route::delete('/account-plans/delete/{id}', [AccountPlanController::class, 'delete']);
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ExaminationService;

class ExaminationController extends Controller
{
    protected $examinationService;

    public function __construct(ExaminationService $examinationService)
    {
        $this->examinationService = $examinationService;
    }

    public function index()
    {
        $response = $this->examinationService->getAll();
        return response()->json($response->data(), $response->status());
    }
}

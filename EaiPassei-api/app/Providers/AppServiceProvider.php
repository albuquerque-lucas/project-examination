<?php

namespace App\Providers;

use App\Http\Controllers\NoticeController;
use App\Models\Examination;
use App\Policies\ExaminationPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton('NoticeController', NoticeController::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
        date_default_timezone_set('America/Sao_Paulo');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Pagination\LengthAwarePaginator;
use DateTime;
use Illuminate\Database\Eloquent\Builder;

class Examination extends Model
{
    use HasFactory;

    protected $fillable = [
        'educational_level_id', // ID do nivel educacional associado ao concurso
        'title',        // Título do concurso
        'active',       // Indica se o concurso está ativo
        'institution',  // Instituição responsável pelo concurso
        'registration_start_date',     // Data de início do período de inscrição
        'registration_end_date', // Data to termino do periodo de inscricao
        'exams_start_date', // Data do periodo de inicio das provas
        'exams_end_date' // Data do periodo de fim das provas
    ];

    protected $casts = [
        'registration_start_date' => 'date:Y-m-d',
        'registration_end_date' => 'date:Y-m-d',
        'exams_start_date' => 'date:Y-m-d',
        'exams_end_date' => 'date:Y-m-d',
        'active' => 'boolean'
    ];
    
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function notice(): HasOne
    {
        return $this->hasOne(Notice::class);
    }

    public function exams(): HasMany
    {
        return $this->hasMany(Exam::class);
    }

    public function subjects(): BelongsToMany
    {
        return $this->belongsToMany(Subject::class);
    }

    public function studyAreas(): BelongsToMany
    {
        return $this->belongsToMany(StudyArea::class)->as('areas');
    }

    public function educationalLevel(): BelongsTo
    {
        return $this->belongsTo(EducationalLevel::class);
    }

    public static function getAllOrdered(string $order, string $orderBy = 'id'): LengthAwarePaginator
    {
        return self::orderBy($orderBy, $order)->paginate();
    }

    public static function getById(int $id): self
    {
        return self::where('id', $id)->first();
    }

    public static function getByTitle(string $title, string $order = 'desc'): LengthAwarePaginator
    {
        return self::where('title', 'like', "%{$title}%")->orderBy('id', $order)->paginate();
    }

    public static function getByInstitution(string $institution, string $order = 'desc'): LengthAwarePaginator
    {
        return self::where('institution', 'like', "%{$institution}%")->orderBy('id', $order)->paginate();
    }

    public static function getByRegistrationDate(DateTime $registrationDate, string $order, string $position): LengthAwarePaginator
    {
        return self::where("registration_{$position}_date", $registrationDate->format('Y-m-d'))->orderBy('id', $order)->paginate();
    }

    public static function getByEducationalLevel(int $educationalLevelId, string $order): LengthAwarePaginator
    {
        return self::where('educational_level_id', $educationalLevelId)->orderBy('id', $order)->paginate();
    }

    public static function getByActivityStatus(bool $activityStatus, string $order): LengthAwarePaginator
    {
        return self::where('active', $activityStatus)->orderBy('id', $order)->paginate();
    }
}

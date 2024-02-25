<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Examination extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',        // Título do concurso
        'active',       // Indica se o concurso está ativo
        'institution',  // Instituição responsável pelo concurso
        'educational_level', // Nivel de escolaridade exigido pelo concurso
        'study_area', // Area de estudo e atuacao do concurso
        'registration_start_date',     // Data de início do período de inscrição
        'registration_end_date', // Data to termino do periodo de inscricao
        'exams_start_date', // Data do periodo de inicio das provas
        'exams_end_date' // Data do periodo de fim das provas
    ];

    protected $casts = [
        'registration_start_date' => 'date',
        'registration_end_date' => 'date',
        'exams_start_date' => 'date',
        'exams_end_date' => 'date'
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
        return $this->belongsToMany(StudyArea::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Examination extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',        // Título do concurso
        'active',       // Indica se o concurso está ativo
        'notice',       // Edital do concurso (pode ser nulo)
        'institution',  // Instituição responsável pelo concurso
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
    
    public function accounts(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function notice(): HasOne
    {
        return $this->hasOne(Notice::class);
    }
}

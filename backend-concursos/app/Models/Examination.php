<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Examination extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',        // Título do concurso
        'active',       // Indica se o concurso está ativo
        'notice',       // Edital do concurso (pode ser nulo)
        'institution',  // Instituição responsável pelo concurso
        'exam_date',    // Data do exame do concurso (pode ser nulo)
    ];

    protected $casts = [
        'exam_date' => 'datetime' // Converte 'exam_date' para um objeto DateTime automaticamente
    ];
    
    public function accounts(): BelongsToMany
    {
        return $this->belongsToMany(Account::class);
    }
}

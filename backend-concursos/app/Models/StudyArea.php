<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class StudyArea extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function examinations(): BelongsToMany
    {
        return $this->belongsToMany(Examination::class);
    }

    public function subjects(): BelongsToMany
    {
        return $this->BelongsToMany(Subject::class);
    }

    public function topics(): HasManyThrough
    {
        return $this->hasManyThrough(Topic::class, Subject::class);
    }

    public function examQuestions(): HasManyThrough
    {
        return $this->hasManyThrough(ExamQuestion::class, Subject::class);
    }


}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function subjects(): HasMany
    {
        return $this->hasMany(Subject::class);
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

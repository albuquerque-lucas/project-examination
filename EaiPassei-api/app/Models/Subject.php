<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Pagination\LengthAwarePaginator;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'educational_level_id',
        'study_area_id',
        'title',
    ];

    protected $casts = [
        'title' => 'string',
    ];

    public function examinations(): BelongsToMany
    {
        return $this->belongsToMany(Examination::class);
    }

    public function exams(): BelongsToMany
    {
        return $this->belongsToMany(Exam::class);
    }

    public function examQuestions(): HasMany
    {
        return $this->hasMany(ExamQuestion::class);
    }

    public function topics(): HasMany
    {
        return $this->hasMany(Topic::class);
    }

    public function studyArea(): BelongsTo
    {
        return $this->belongsTo(StudyArea::class);
    }

    public function educationalLevel(): BelongsTo
    {
        return $this->belongsTo(EducationalLevel::class);
    }

    public static function getAllOrdered(string $order, string $orderBy = 'id'): LengthAwarePaginator
    {
        return self::orderBy($orderBy, $order)->paginate();
    }

    public static function getById(int $id): self | null
    {
        return self::where('id', $id)->first();
    }

    public static function getByTitle(string $title, string $order): LengthAwarePaginator
    {
        return self::where('title', 'like', "%$title%")->orderBy('id', $order)->paginate();
    }
}

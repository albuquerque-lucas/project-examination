<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExamQuestionAlternative extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_question_id',
        'letter',
        'text',
        'is_answer',
    ];

    protected $casts = [
        'letter' => 'string',
        'text' => 'string',
        'is_answer' => 'boolean',
    ];

    public function examQuestion(): BelongsTo
    {
        return $this->belongsTo(ExamQuestion::class);
    }
}

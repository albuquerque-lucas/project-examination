<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Notice extends Model
{
    use HasFactory;

    protected $fillable = [
        'file',
        'file_name',
        'publication_date',
    ];

    protected $casts = [
        'publication_date' => 'date',
    ];

    public function examination(): BelongsTo
    {
        return $this->belongsTo(Examination::class);
    }
}

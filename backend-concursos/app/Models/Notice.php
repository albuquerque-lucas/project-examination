<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Pagination\LengthAwarePaginator;

class Notice extends Model
{
    use HasFactory;

    protected $fillable = [
        'examination_id',
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

    public static function getAllOrdered(string $order, string $orderBy = 'id'): LengthAwarePaginator
    {
        return self::orderBy($orderBy, $order)->paginate();
    }
}

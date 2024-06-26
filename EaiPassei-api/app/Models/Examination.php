<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
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
    ];

    protected $casts = [
        'active' => 'boolean'
    ];
    
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function notice(): HasMany
    {
        return $this->hasMany(Notice::class);
    }

    public function exams(): HasMany
    {
        return $this->hasMany(Exam::class);
    }

    public function studyAreas(): BelongsToMany
    {
        return $this->belongsToMany(StudyArea::class);
    }

    public function educationalLevel(): BelongsTo
    {
        return $this->belongsTo(EducationalLevel::class);
    }

    public static function getAllOrdered(string $order, string $orderBy = 'id', array $params = []): LengthAwarePaginator
    {
        // dd($params);
        $query = self::orderBy($orderBy, $order);
        foreach ($params as $key => $value) {
            if (!is_null($value)) {
                $query = $query->where($key, 'like', "%$value%");
            }
        }
        return $query->paginate();
    }

    public static function getById(int $id): self | null
    {
        return self::where('id', $id)->first();
    }
}

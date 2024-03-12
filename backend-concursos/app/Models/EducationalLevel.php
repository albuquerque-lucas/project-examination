<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Pagination\LengthAwarePaginator;

class EducationalLevel extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
    ];

    public function examinations(): HasMany
    {
        return $this->hasMany(Examination::class);
    }

    public function subjects(): HasMany
    {
        return $this->hasMany(Subject::class);
    }

    public static function getAllOrdered(string $order, string $orderBy = 'id'): LengthAwarePaginator
    {
        return self::orderBy($orderBy, $order)->paginate();
    }

    public static function getById(int $id): self | null
    {
        return self::where('id', $id)->first();
    }

    public static function getByName(string $name, string $order): LengthAwarePaginator
    {
        return self::where('name', 'like', "%$name%")->orderBy('id', $order)->paginate();
    }
}

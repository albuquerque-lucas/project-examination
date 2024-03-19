<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Pagination\LengthAwarePaginator;

class AccessLevel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',            // Nome do nível de acesso (ex: Nível 1, Nível 2, etc.)
        'level',           // Nível de acesso (ex: 1, 2, 3, etc.)
        'description',     // Descrição do nível de acesso (pode ser nulo)
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function accountPlan(): HasMany
    {
        return $this->hasMany(AccountPlan::class);
    }

    public static function getAllOrdered(string $order, string $orderBy = 'id'): LengthAwarePaginator
    {
        return self::orderBy($orderBy, $order)->paginate();
    }

    public static function getById(int $id): self | null
    {
        return self::where('id', $id)->first();
    }
}

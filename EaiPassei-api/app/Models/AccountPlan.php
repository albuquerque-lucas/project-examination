<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AccountPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',            // Nome do plano (ex: Plano Regular, Plano Premium, etc.)
        'description',     // Descrição do plano (pode ser nulo)
        'price',           // Preço do plano
        'duration_days',   // Duração do plano em dias (pode ser nulo)
    ];

    /**
     * Define o relacionamento Many-to-Many com a tabela accounts.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
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

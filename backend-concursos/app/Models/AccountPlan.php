<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Pagination\LengthAwarePaginator;

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
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
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

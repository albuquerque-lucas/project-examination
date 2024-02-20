<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
    public function accounts(): BelongsToMany
    {
        return $this->belongsToMany(Account::class);
    }
}

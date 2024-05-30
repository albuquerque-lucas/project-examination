<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceResponse extends Model
{
    use HasFactory;
    private int $status;
    private object $data;
    public function status(): int
    {
        return $this->status;
    }
    public function data(): object
    {
        return $this->data;
    }
    public function setAttributes(int $status, object $data): void
    {
        $this->status = $status;
        $this->data = $data;
    }

    // Criação de registro

    public function createdSuccessfully(string $field = null): string
    {
        if ($field) {
            return "$field criado(a) com sucesso.";
        }
        return "Registro criado com sucesso.";
    }

    public function createdManySuccessfully(string $field = null): string
    {
        if ($field) {
            return "Vários $field criados com sucesso.";
        }
        return "Os dados foram registrados com sucesso.";
    }

    // Atualizações de registro

    public function changesSaved(): string
    {
        return "Alterações salvas com sucesso.";
    }

    public function noChangesToBeMade(): string
    {
        return "Nenhuma alteração a ser feita.";
    }

    public function failedToUpdateRecord(): string
    {
        return "Falha ao alterar o registro. Por favor, verifique os dados enviados.";
    }

    // Exclusão de registro

    public function deletedSuccessfully(string $field = null): string
    {
        if ($field) {
            return "$field excluído com sucesso.";
        }
        return "Registro deletado com sucesso.";
    }

    public function errorTryingToDelete(): string
    {
        return "Falha ao excluir o registro. Por favor, verifique os dados enviados.";
    }

    // Erros

    public function badRequest(): string
    {
        return "Pedimos desculpas, mas não conseguimos completar sua solicitação neste momento.";
    }

    public function validationFailed(): string
    {
        return "A validação falhou. Por favor, verifique os dados enviados.";
    }

    public function failedToCreateRecord(): string
    {
        return "Os dados informados já existem na tabela.";
    }

    // Registro não encontrado

    public function recordsNotFound(string $field = null): string
    {
        if ($field) {
            return "Não conseguimos encontrar nenhum registro correspondente à sua solicitação para $field.";
        }
        return "Não conseguimos encontrar nenhum registro correspondente à sua solicitação.";
    }
}
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
}

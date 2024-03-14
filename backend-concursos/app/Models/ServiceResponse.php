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

    // Record Creation

public function createdSuccessfully(string $field = null): string
{
    if ($field) {
        return "$field created successfully.";
    }
    return "Record created successfully.";
}

    // Record Updates

    public function changesSaved(): string
    {
        return "Changes saved successfully.";
    }

    public function noChangesToBeMade(): string
    {
        return "No changes to be made.";
    }

    public function failedToUpdateRecord(): string
    {
        return "Failed to change record. Please check the submitted data.";
    }

    // Record Deletion

    public function deletedSuccessfully(string $field = null): string
    {
        if ($field) {
            return "$field deleted successfully.";
        }
        return "Record deleted successfully.";
    }

    public function errorTryingToDelete(): string
    {
        return "Failed to delete record. Please check the submitted data.";
    }

    // Errors

    public function badRequest(): string
    {
        return "We apologize, but we were unable to complete your request at this time.";
    }

    public function validationFailed(): string
    {
        return "Validation failed. Please check the submitted data.";
    }

    public function failedToCreateRecord(): string
    {
        return "Failed to create record. Please check the submitted data.";
    }

    // Record Not Found

    public function recordsNotFound(): string
    {
        return "We couldn't find any records matching your request.";
    }
}

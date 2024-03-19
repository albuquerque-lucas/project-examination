<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => "$this->first_name $this->last_name",
            'username' => $this->username,
            'email' => $this->email,
            'account_plan' => $this->accountPlan->name,
            'subscription_fee' => $this->accountPlan->price,
            'subscription_duration_days' => $this->accountPlan->duration_days,
            'subscription_date' => null,
            'subscription_missing_days' => null, 
            'phone_number' => $this->phone_number,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

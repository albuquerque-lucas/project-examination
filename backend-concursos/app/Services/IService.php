<?php

namespace App\Services;
use App\Models\ServiceResponse;

interface IService {
  public function getAll(string $order, string $orderBy = 'id'): ServiceResponse;
  public function getById(int $id);
  public function create(array $data): ServiceResponse;
  public function update(int $id, array $data, bool $hasFile): ServiceResponse;
  public function delete(int $id): ServiceResponse;
}
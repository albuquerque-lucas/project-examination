<?php

namespace App\Services;

use App\Http\Resources\StudyAreaResource;
use App\Models\ServiceResponse;
use App\Interfaces\IService;
use App\Models\StudyArea;
use Exception;
use Spatie\FlareClient\Http\Exceptions\NotFound;

class StudyAreaService implements IService
{

    protected ServiceResponse $serviceResponse;

    public function __construct(ServiceResponse $serviceResponse)
    {
        $this->serviceResponse = $serviceResponse;
    }
    public function getAll(string $order, string $orderBy = 'id'): ServiceResponse
    {
        try {
            $studyAreas = StudyArea::getAllOrdered($order, $orderBy);

            $decoded = $studyAreas->toArray();
            if (empty($decoded['data'])) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            };

            $collection = StudyAreaResource::collection($studyAreas);
            $this->serviceResponse->setAttributes(200, $collection);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'info' => 'Nao foram encontrados registros.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'Nao foi possivel concluir a solicitacao.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }
    public function getById(int $id): ServiceResponse
    {

    }

    public function getByArea(string $area, string $order): ServiceResponse
    {
        try {
            $studyAreas = StudyArea::getByArea($area, $order);
            $decoded = $studyAreas->toArray();

            if (empty($decoded['data'])) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            };

            $this->serviceResponse->setAttributes(200, $studyAreas);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'Ocorreu um erro inesperado.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }
    public function create(array $data): ServiceResponse
    {

    }
    public function update(int $id, array $data, bool $hasFile): ServiceResponse
    {

    }
    public function delete(int $id): ServiceResponse
    {

    }
}
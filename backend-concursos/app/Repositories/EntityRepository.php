<?php

namespace App\Repositories;

use App\Http\Resources\ExaminationResource;
use App\Models\DataRepository;
use App\Models\ServiceResponse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Exception;
use Spatie\FlareClient\Http\Exceptions\NotFound;

class EntityRepository
{
    protected Model $model;
    protected JsonResource $resource;
    public function __construct(Model $model, ExaminationResource $resource)
    {
        $this->model = $model;
        $this->resource = $resource;
    }

    public function getAll(string $order, string $orderBy = 'id', ServiceResponse $serviceResponse): ServiceResponse
    {
        try {
            $examinations = $this->model::getAllOrdered($order, $orderBy);

            $decoded = $examinations->toArray();
            if (empty($decoded['data'])) {
                $serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $serviceResponse;
            };
            $collection = $this->resource::collection($examinations);
            $serviceResponse->setAttributes(200, $collection);
            return $serviceResponse;
        } catch(NotFound $exception) {
            $serviceResponse->setAttributes(404, (object)[
                'info' => 'Nao foram encontrados registros.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $serviceResponse;
        } catch(Exception $exception) {
            $serviceResponse->setAttributes(400, (object)[
                'info' => 'Nao foi possivel concluir a solicitacao.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $serviceResponse;
        }
    }

    public function getById(): ServiceResponse
    {

    }
}
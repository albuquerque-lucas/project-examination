<?php

namespace App\Services;

use App\Http\Resources\SubjectResource;
use App\Models\ServiceResponse;
use App\Models\Subject;
use Exception;
use Spatie\FlareClient\Http\Exceptions\NotFound;


class SubjectService implements IService
{
    private $serviceResponse;

    public function __construct(ServiceResponse $serviceResponse)
    {
        $this->serviceResponse = $serviceResponse;
    }

    public function getAll(string $order, string $orderBy = 'id'): ServiceResponse
    {
        try {
            $subjects = Subject::getAllOrdered($order, $orderBy);

            $decoded = $subjects->toArray();
            if (empty($decoded['data'])) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            };
            $collection = SubjectResource::collection($subjects);
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

    public function getById(int $id): ServiceResponse {
        try {
            $notice = Subject::getById($id);
            if ($notice === null) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            }
            $resource = new SubjectResource($notice);
            $this->serviceResponse->setAttributes(200, $resource);
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
    public function create(array $data): ServiceResponse {

    }
    public function update(int $id, array $data, bool $hasFile): ServiceResponse {

    }
    public function delete(int $id): ServiceResponse {

    }
}
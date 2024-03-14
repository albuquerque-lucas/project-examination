<?php

namespace App\Services;

use App\Http\Resources\NoticeResource;
use App\Models\ServiceResponse;
use Exception;
use PDOException;
use Nette\Schema\ValidationException;
use Spatie\FlareClient\Http\Exceptions\NotFound;
use App\Models\Notice;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Storage;
use App\Interfaces\IService;

class NoticeService implements IService
{
    private $serviceResponse;

    public function __construct(ServiceResponse $serviceResponse)
    {
        $this->serviceResponse = $serviceResponse;
    }

    public function getAll(string $order, string $orderBy = 'id'): ServiceResponse
    {
        try {
            $notices = Notice::getAllOrdered($order, $orderBy);

            $collection = NoticeResource::collection($notices);
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
        try {
            $notice = Notice::getById($id);

            if ($notice === null) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            }

            $resource = new NoticeResource($notice);
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
                'info' => 'Não foi possível concluir a solicitação.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function create(array $data): ServiceResponse
    {
        try {
            $notice = Notice::create($data);

            if (!$notice) {
                $this->serviceResponse->setAttributes(422, (object)[
                    'message' => 'Nao foi possivel processar a requisicao.'
                ]);
                return $this->serviceResponse;
            }

            $responseData = (object)[
                'message' => 'Notice created successfully.',
                'id' => $notice->id,
                'file_name' => $notice->file_name,
                'file_path' => $notice->file,
            ];

            $this->serviceResponse->setAttributes(201, $responseData);
            return $this->serviceResponse;
        } catch (ValidationException $exception) {
            $this->serviceResponse->setAttributes(422, (object)[
                'info' => 'Error validation failed. Please check errors.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (PDOException $exception) {
            $this->serviceResponse->setAttributes(409, (object)[
                'info' => 'Failed to create record. Please check the submitted data.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'An unexpected error occurred.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function update(int $id, array $data, bool $hasFile): ServiceResponse
    {
        try {
                $notice = Notice::find($id);
                if (!$notice) {
                    $this->serviceResponse->setAttributes(404, (object)[
                        'message' => "Notice not found."
                    ]);
                    return $this->serviceResponse;
                }

                if ($hasFile && Storage::disk('public')->exists($notice->notice()->file_name)) {
                    dd("Parando aplicação antes de deletar do Storage");
                    Storage::disk('public')->delete($notice->notice()->file_name);
                }

                $notice->fill($data);

                $responseModel = (object)[
                    'message' => 'Your changes have been applied.',
                    'id' => $notice->id,
                ];

                if ($notice->isDirty()) {
                    $notice->save();
                    $this->serviceResponse->setAttributes(200, $responseModel);
                } else {
                    $this->serviceResponse->setAttributes(200, (object)[
                        'message' => 'No changes to be made.',
                        'notice' => $notice
                    ]);
                }
                return $this->serviceResponse;
            } catch (PDOException $exception) {
                $this->serviceResponse->setAttributes(409, (object)[
                    'info' => 'Failed to create record. Please check the submitted data.',
                    'message' => $exception->getMessage(),
                    'code' => $exception->getCode()
                ]);
                return $this->serviceResponse;
            } catch (Exception $exception) {
                $this->serviceResponse->setAttributes(400, (object)[
                    'info' => 'An unexpected error occurred.',
                    'message' => $exception->getMessage(),
                    'code' => $exception->getCode()
                ]);
                return $this->serviceResponse;
            }
    }

    public function delete(int $id): ServiceResponse
    {
        try {
            $notice = Notice::findOrFail($id);

            if (!$notice) {
                $this->serviceResponse->setAttributes(404, (object)[
                    'message' => 'Notice not found.',
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $isDeleted = $notice->delete();
    
            if (!$isDeleted) {
                $this->serviceResponse->setAttributes(400, (object)[
                    'message' => 'Record could not be deleted.',
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $this->serviceResponse->setAttributes(200, (object)[
                'mensagem' => 'Notice deleted successfully.',
                'deleted' => true,
            ]);

            return $this->serviceResponse;
        } catch (ModelNotFoundException $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => 'No record found with the provided data.',
                'deleted' => false,
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => 'An error occurred while trying to update the record.',
                'deleted' => false,
                'info' => $exception->getMessage(),
            ]);
            return $this->serviceResponse;
        }

    }

    public function deleteByExamination(int $id): ServiceResponse
    {
        try {
            $notice = Notice::query()->where('examination_id', $id)->first();
            if (!$notice) {
                $this->serviceResponse->setAttributes(404, (object)[
                    'message' => 'Edital nao encontrado.',
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $isDeleted = $notice->delete();
    
            if (!$isDeleted) {
                $this->serviceResponse->setAttributes(400, (object)[
                    'message' => 'Record could not be deleted.',
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $this->serviceResponse->setAttributes(200, (object)[
                'mensagem' => 'Notice deleted successfully.',
                'deleted' => true,
            ]);

            return $this->serviceResponse;

        } catch (ModelNotFoundException $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => 'No record found with the provided data.',
                'deleted' => false,
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => 'An error occurred while trying to update the record.',
                'deleted' => false,
                'info' => $exception->getMessage(),
            ]);
            return $this->serviceResponse;
        }
    }
}
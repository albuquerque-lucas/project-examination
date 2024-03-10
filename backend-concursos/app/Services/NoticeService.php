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

            $decoded = $notices->toArray();
            if (empty($decoded['data'])) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            };
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
                'info' => 'Nao foi possivel concluir a solicitacao.',
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
                'message' => 'Concurso adicionado com sucesso.',
                'id' => $notice->id,
                'file_name' => $notice->file_name,
                'file_path' => $notice->file,
            ];

            $this->serviceResponse->setAttributes(201, $responseData);
            return $this->serviceResponse;
        } catch (ValidationException $exception) {
            $this->serviceResponse->setAttributes(422, (object)[
                'info' => 'Validação falhou. Verifique os erros.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (PDOException $exception) {
            $this->serviceResponse->setAttributes(409, (object)[
                'info' => 'Não foi possível criar o registro. Verifique os dados informados.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
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

    public function update(int $id, array $data, bool $hasFile): ServiceResponse
    {
        try {
                $notice = Notice::find($id);
                if (!$notice) {
                    $this->serviceResponse->setAttributes(404, (object)[
                        'message' => "Não foi encontrado nenhum edital com este id: $id"
                    ]);
                    return $this->serviceResponse;
                }

                if ($hasFile && Storage::disk('public')->exists($notice->notice()->file_name)) {
                    dd("Parando aplicação antes de deletar do Storage");
                    Storage::disk('public')->delete($notice->notice()->file_name);
                }

                $notice->fill($data);

                $responseModel = (object)[
                    'message' => 'Alteração feita com sucesso.',
                    'id' => $notice->id,
                ];

                if ($notice->isDirty()) {
                    $notice->save();
                    $this->serviceResponse->setAttributes(200, $responseModel);
                } else {
                    $this->serviceResponse->setAttributes(200, (object)[
                        'message' => 'Nenhuma alteração a ser feita.',
                        'notice' => $notice
                    ]);
                }
                return $this->serviceResponse;
            } catch (PDOException $exception) {
                $this->serviceResponse->setAttributes(409, (object)[
                    'info' => 'Não foi possível criar o registro. Verifique os dados informados.',
                    'message' => $exception->getMessage(),
                    'code' => $exception->getCode()
                ]);
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

    public function delete(int $id): ServiceResponse
    {
        try {
            $notice = Notice::findOrFail($id);

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
                    'message' => 'Erro ao tentar deletar o registro.',
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $this->serviceResponse->setAttributes(200, (object)[
                'mensagem' => 'Edital excluido com sucesso.',
                'deleted' => true,
            ]);

            return $this->serviceResponse;
        } catch (ModelNotFoundException $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => 'Nao foi encontrado nenhum registro com os dados fornecidos.',
                'deleted' => false,
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => 'Ocorreu um erro ao tentar alterar o registro.',
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
                    'message' => 'Erro ao tentar deletar o registro.',
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $this->serviceResponse->setAttributes(200, (object)[
                'mensagem' => 'Edital excluido com sucesso.',
                'deleted' => true,
            ]);

            return $this->serviceResponse;

        } catch (ModelNotFoundException $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => 'Nao foi encontrado nenhum registro com os dados fornecidos.',
                'deleted' => false,
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => 'Ocorreu um erro ao tentar alterar o registro.',
                'deleted' => false,
                'info' => $exception->getMessage(),
            ]);
            return $this->serviceResponse;
        }
    }
}
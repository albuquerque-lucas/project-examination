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
use Illuminate\Support\Facades\DB;

class NoticeService
{
    private $serviceResponse;

    public function __construct(ServiceResponse $serviceResponse)
    {
        $this->serviceResponse = $serviceResponse;
    }

    public function getAll(string $order, string $orderBy = 'id', array $params = []): ServiceResponse
    {
        try {
            $notices = Notice::getAllOrdered($order, $orderBy, $params);

            $collection = NoticeResource::collection($notices);
            $this->serviceResponse->setAttributes(200, $collection);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'info' => $this->serviceResponse->recordsNotFound(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => $this->serviceResponse->badRequest(),
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
                'info' => $this->serviceResponse->recordsNotFound(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => $this->serviceResponse->badRequest(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function create(array $data): ServiceResponse
    {
        try {
            $noticeIds = [];
            unset($data['notice_file']);
            // DB::transaction(function () use ($data, &$noticeIds) {
                // foreach ($data as $noticeData) {
                    // dd($data);
                    $notice = Notice::create($data);
                    // dd($notice);
                    if (!$notice) {
                        throw new Exception('Failed to create notice');
                    }
                    // $noticeIds[] = $notice->id;
                // }
            // });
            // dd($noticeIds);
            $responseData = (object)[
                'message' => $this->serviceResponse->createdSuccessfully(),
                'notice_ids' => $noticeIds,
            ];
        
            $this->serviceResponse->setAttributes(201, $responseData);
            return $this->serviceResponse;
        } catch (ValidationException $exception) {
            $this->serviceResponse->setAttributes(422, (object)[
                'info' => $this->serviceResponse->validationFailed(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (PDOException $exception) {
            $this->serviceResponse->setAttributes(409, (object)[
                'info' => $this->serviceResponse->failedToCreateRecord(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => $this->serviceResponse->badRequest(),
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
                        'message' => $this->serviceResponse->recordsNotFound('Notice'),
                    ]);
                    return $this->serviceResponse;
                }

                if ($hasFile && Storage::disk('public')->exists($notice->notice()->file_name)) {
                    dd("Parando aplicação antes de deletar do Storage");
                    Storage::disk('public')->delete($notice->notice()->file_name);
                }

                $notice->fill($data);

                $responseModel = (object)[
                    'message' => $this->serviceResponse->changesSaved(),
                    'id' => $notice->id,
                ];

                if ($notice->isDirty()) {
                    $notice->save();
                    $this->serviceResponse->setAttributes(200, $responseModel);
                } else {
                    $this->serviceResponse->setAttributes(200, (object)[
                        'message' => $this->serviceResponse->noChangesToBeMade(),
                        'notice' => $notice
                    ]);
                }
                return $this->serviceResponse;
            } catch (PDOException $exception) {
                $this->serviceResponse->setAttributes(409, (object)[
                    'info' => $this->serviceResponse->failedToCreateRecord(),
                    'message' => $exception->getMessage(),
                    'code' => $exception->getCode()
                ]);
                return $this->serviceResponse;
            } catch (Exception $exception) {
                $this->serviceResponse->setAttributes(400, (object)[
                    'info' => $this->serviceResponse->badRequest(),
                    'message' => $exception->getMessage(),
                    'code' => $exception->getCode()
                ]);
                return $this->serviceResponse;
            }
    }

    public function delete(array $deletionList)
    {
        try {
            return DB::transaction(function () use ($deletionList) {
                foreach ($deletionList['ids'] as $id) {
                    $notice = Notice::find($id);
    
                    if (!$notice) {
                        $this->serviceResponse->setAttributes(200, (object)[
                            'message' => "Nenhum edital com o id informado: $id",
                            'deleted' => false,
                        ]);
                        return $this->serviceResponse;
                    }
    
                    $isDeleted = $notice->delete();
    
                    if (!$isDeleted) {
                        $this->serviceResponse->setAttributes(400, (object)[
                            'message' => $this->serviceResponse->errorTryingToDelete(),
                            'deleted' => false,
                        ]);
                        return $this->serviceResponse;
                    }
                }
    
                $this->serviceResponse->setAttributes(200, (object)[
                    'message' => $this->serviceResponse->deletedSuccessfully('Notice'),
                    'deleted' => true,
                ]);
    
                return $this->serviceResponse;
            });
        } catch (ModelNotFoundException $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $this->serviceResponse->recordsNotFound(),
                'deleted' => false,
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => $this->serviceResponse->badRequest(),
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
                    'message' => $this->serviceResponse->recordsNotFound('Notice'),
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $isDeleted = $notice->delete();
    
            if (!$isDeleted) {
                $this->serviceResponse->setAttributes(400, (object)[
                    'message' => $this->serviceResponse->errorTryingToDelete(),
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $this->serviceResponse->setAttributes(200, (object)[
                'message' => $this->serviceResponse->deletedSuccessfully('Notice'),
                'deleted' => true,
            ]);

            return $this->serviceResponse;

        } catch (ModelNotFoundException $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $this->serviceResponse->recordsNotFound(),
                'deleted' => false,
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => $this->serviceResponse->badRequest(),
                'deleted' => false,
                'info' => $exception->getMessage(),
            ]);
            return $this->serviceResponse;
        }
    }
}
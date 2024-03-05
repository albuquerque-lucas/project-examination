<?php

namespace App\Services;

use App\Http\Resources\NoticeResource;
use App\Models\ServiceResponse;
use Spatie\FlareClient\Http\Exceptions\NotFound;
use App\Models\Notice;

class NoticeService
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
            // dd($notices);
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
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }
}
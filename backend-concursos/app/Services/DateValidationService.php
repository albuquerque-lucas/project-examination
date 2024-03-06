<?php

namespace App\Services;

use Carbon\Carbon;
use DateTime;
use App\Exceptions\InvalidDateFormatException;
use Exception;

class DateValidationService
{
    public static function validateAndFormatDates(array &$requestData)
    {
        $dateFields = ['registration_start_date', 'registration_end_date', 'exams_start_date', 'exams_end_date'];
        foreach ($dateFields as $field) {
            if (isset($requestData[$field]) && !empty($requestData[$field])) {
                try {
                    $formattedDate = Carbon::createFromFormat('Y-m-d', $requestData[$field])->format('Y-m-d');
                    $requestData[$field] = $formattedDate;
                } catch (Exception $e) {
                    throw new InvalidDateFormatException('Data inválida. Use o formato YYYY-MM-DD.');
                }
            }
        }
    }

    public static function validateDateFormat($date)
    {
        $parsedDate = DateTime::createFromFormat('Y-m-d', $date);
        if (!$parsedDate) {
            throw new InvalidDateFormatException('Data inválida. Use o formato YYYY-MM-DD.', 400);
        }

        return $parsedDate;
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class BaseEntityModel extends Model
{
    use HasFactory;

    public static function getAllOrdered(string $order, string $orderBy = 'id'): LengthAwarePaginator
    {
        return self::orderBy($orderBy, $order)->paginate();
    }

    public static function getById(int $id): self | null
    {
        return self::where('id', $id)->first();
    }

    public static function getDateBetween(int $start, int $end, string $field, string $orderBy = 'id'): LengthAwarePaginator
    {
        return self::whereBetween($field, [$start, $end])->orderBy($orderBy)->paginate();
    }

    public static function getDateField(string $field, Datetime $date): string
    {
        return self::where($field, $date)->first();
    }

    public static function getByArea(string $area, string $order = 'desc'): LengthAwarePaginator
    {
        return self::where('area', 'like', "%{$area}%")->orderBy('id', $order)->paginate();
    }

    public static function getFieldLike(string $field, string $value, string $order = 'desc'): LengthAwarePaginator
    {
        return self::where($field, 'like',$value)->orderBy('id', $order)->paginate();
    }

    public static function getField(string $field, string $value, string $order = 'desc'): LengthAwarePaginator
    {
        return self::where($field, $value)->orderBy('id', $order)->paginate();
    }
}

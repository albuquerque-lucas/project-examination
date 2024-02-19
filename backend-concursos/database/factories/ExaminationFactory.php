<?php

namespace Database\Factories;

use App\Models\Examination;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ExaminationFactory extends Factory
{
    /**
     * Define o modelo de fábrica correspondente.
     *
     * @var string
     */
    protected $model = Examination::class;

    /**
     * Define os atributos padrão para o modelo.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->fake()->sentence(),
            'active' => $this->fake()->boolean(),
            'notice' => null,
            'institution' => $this->fake()->company(),
            'exam_date' => $this->fake()->date(),
        ];
    }
}


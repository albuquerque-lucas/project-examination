<?php

namespace Database\Factories;

use App\Models\Examination;
use Illuminate\Database\Eloquent\Factories\Factory;

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
            'title' => $this->faker->sentence,
            'active' => $this->faker->boolean,
            'notice' => $this->faker->text,
            'institution' => $this->faker->company,
            'exam_date' => $this->faker->date,
        ];

    }
}


<?php

namespace Database\Factories;

use App\Models\Examination;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

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

        $registrationStartDate = $this->faker->date;
        $examsStartDate = $this->faker->date;

        return [
            'title' => $this->faker->words(3, true),
            'active' => $this->faker->boolean,
            'institution' => $this->faker->company,
            'registration_start_date' => $registrationStartDate,
            'registration_end_date' => Carbon::parse($registrationStartDate)->addWeeks(3)->toDateString(),
            'exams_start_date' => $examsStartDate,
            'exams_end_day' => Carbon::parse($examsStartDate)->addWeeks(3)->toDateString(),
        ];

    }
}


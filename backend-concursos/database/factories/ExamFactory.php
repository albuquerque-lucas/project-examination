<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use App\Models\Examination;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exam>
 */
class ExamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $examStartTime = $this->faker->time();

        $examinationIds = Examination::pluck('id')->toArray();

        return [
            'examination_id' => $this->faker->randomElement($examinationIds),
            'title' => $this->faker->words(2, true),
            'description' => $this->faker->text(100),
            'date' => $this->faker->date(),
            'start_time' => $examStartTime,
            'end_time' => Carbon::parse($examStartTime)->addHours(4),
        ];
    }
}

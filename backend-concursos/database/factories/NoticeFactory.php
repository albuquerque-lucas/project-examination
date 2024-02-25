<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notice>
 */
class NoticeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'file' => 'storage/notice_files/no-file.jpg',
            'file_name' => "no-file-{$this->faker->firstName()}",
            'extension' => 'jpg',
            'publication_date' => $this->faker->date(),
        ];
    }
}

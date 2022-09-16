<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'task_name'    => $this->faker->realText(rand(15,40)),
            'description'  => $this->faker->realText(rand(15,40)),
            'display_flag' => true,
            'created_at'   => now(),
            'updated_at'   => now()
        ];
    }
}

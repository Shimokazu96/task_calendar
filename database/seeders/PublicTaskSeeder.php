<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\Section;

class PublicTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $task = Task::inRandomOrder()
            ->first();
        $section = Section::inRandomOrder()
            ->first();
        $ary = array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        $date = array("2022-09-30", "2022-10-30", "2022-10-01", "2022-10-5", "2022-10-15", "2022-10-20", "2022-10-03", "2022-09-30", "2022-10-13", "2022-9-8");

        for ($i = 0; $i < 100; $i++) {
            \DB::table('public_tasks')->insert([
                [
                    'task_id' => $task->id,
                    'section_id' => $section->id,
                    'required_personnel' => array_rand($ary, 1),
                    'determined_personnel' => array_rand($ary, 1),
                    'description' => array_rand($date, 1),
                    'date' => "2022-09-30",
                    'start_time' => "13:00",
                    'end_time' => "14:00",
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }
}

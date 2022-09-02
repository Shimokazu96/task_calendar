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
        $ary = array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        $date = array("2022-09-30", "2022-10-30", "2022-10-01", "2022-10-05", "2022-10-15", "2022-10-20", "2022-10-03", "2022-09-30", "2022-10-13", "2022-12-08");
        $time = array("2022-09-30", "2022-10-30", "2022-10-01", "2022-10-05", "2022-10-15", "2022-10-20", "2022-10-03", "2022-09-30", "2022-10-13", "2022-12-08");

        for ($i = 0; $i < 100; $i++) {
            $task = Task::inRandomOrder()
                ->first();
            $section = Section::inRandomOrder()
                ->first();
            \DB::table('public_tasks')->insert([
                [
                    'task_id' => $task->id,
                    'section_id' => $section->id,
                    'required_personnel' => $ary[array_rand($ary, 1)],
                    'determined_personnel' => 0,
                    'description' => "test",
                    'date' => $date[array_rand($date, 1)],
                    'start_time' => "13:00",
                    'end_time' => "14:00",
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }
}

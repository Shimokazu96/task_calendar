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
        $date = array("2022-09-20", "2022-09-30", "2022-10-30", "2022-10-01", "2022-10-05", "2022-10-15", "2022-10-20", "2022-10-03", "2022-09-15", "2022-10-13", "2022-12-08");
        $start_time = array("09:00", "09:30","10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00");
        $end_time = array("13:30", "14:00","14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30");

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
                    'start_time' => $start_time[array_rand($start_time, 1)],
                    'end_time' => $end_time[array_rand($end_time, 1)],
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }
}

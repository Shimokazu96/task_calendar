<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('tasks')->insert([
            [
                'task_name' => 'ロビー清掃',
                'description' => 'ロビー清掃',
                'color' => 'primary',
                'display_flag' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'task_name' => '朝食配膳',
                'description' => '朝食配膳',
                'color' => 'secondary',
                'display_flag' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'task_name' => 'DM作業',
                'description' => 'DM作業',
                'color' => 'warning',
                'display_flag' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

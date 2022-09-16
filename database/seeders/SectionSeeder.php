<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Section;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('sections')->insert([
            [
                'section_name' => 'フロント',
                'color' => 'primary',
                'display_flag' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'section_name' => '厨房',
                'color' => 'secondary',
                'display_flag' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'section_name' => 'レストラン',
                'color' => 'warning',
                'display_flag' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

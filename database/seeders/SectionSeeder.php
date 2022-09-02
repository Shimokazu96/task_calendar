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
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'section_name' => '厨房',
                'color' => 'secondary',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'section_name' => 'レストラン',
                'color' => 'warning',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

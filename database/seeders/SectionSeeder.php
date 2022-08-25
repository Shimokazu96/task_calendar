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
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'section_name' => '厨房',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'section_name' => 'レストラン',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

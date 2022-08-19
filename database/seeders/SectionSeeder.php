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
        Section::factory()->count(10)->create();
    }
}

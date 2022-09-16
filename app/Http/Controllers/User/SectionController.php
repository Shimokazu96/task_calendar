<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Section;
use App\Http\Requests\SectionRequest;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function getResourceTimeGridSection()
    {
        $resources = [];
        $sections = Section::where('display_flag', true)->get(['id', 'section_name']);
        foreach($sections as $key=> $section) {
            $resources[] = ["id" => $section->id, "title" => $section->section_name];
        }
        return response()->json($resources, 200) ?? abort(404);
    }
}

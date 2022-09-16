<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Section;
use App\Http\Requests\SectionRequest;
use Illuminate\Http\Request;

class SectionController extends Controller
{

    public function index()
    {
        return Section::orderByDesc('id')->get();
    }


    public function store(SectionRequest $request, Section $section)
    {
        $section->fill($request->all());
        $section->save();

        return $section
            ? response()->json($section, 201)
            : response()->json([], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function show(Section $section)
    {
        return response()->json($section, 200) ?? abort(404);
    }


    public function update(SectionRequest $request, Section $section)
    {
        $section->fill($request->all());
        $section->save();

        return $section->update()
            ? response()->json($section)
            : response()->json([], 500);
    }


    public function destroy(Section $section)
    {
        return $section->delete()
            ? response()->json(200)
            : response()->json([], 500);
    }
    public function getSectionName()
    {
        return Section::where('display_flag', true)->get(['id', 'section_name']);
    }
    public function getResourceTimeGridSection()
    {
        $resources = [];
        $sections = Section::get(['id', 'section_name']);
        foreach($sections as $key=> $section) {
            $resources[] = ["id" => $section->id, "title" => $section->section_name];
        }
        return response()->json($resources, 200) ?? abort(404);
    }
}

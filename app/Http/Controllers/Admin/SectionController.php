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
        // abort(500);
        // return [];
        return Section::orderByDEsc('id')->get();
    }


    public function store(SectionRequest $request)
    {
        $Section = Section::create($request->all());

        return $Section
        ? response()->json($Section, 201)
        : response()->json([], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Section  $Section
     * @return \Illuminate\Http\Response
     */
    public function show(Section $Section)
    {
        //
    }


    public function update(SectionRequest $request, Section $Section)
    {
        $Section->title = $request->title;

        return $Section->update()
        ? response()->json($Section)
        : response()->json([], 500);
    }


    public function destroy(Section $Section)
    {
        return $Section->delete()
        ? response()->json($Section)
        : response()->json([], 500);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\About;
use App\Models\Skill;
use App\Models\Education;
use App\Models\WorkExperience;

class FrontController extends Controller
{
    public function index()
    {
        $about = About::latest()->first();
        $skills = Skill::all();
        $educations = Education::all();
        $work_experiences = WorkExperience::orderBy('work_experience_year_from', 'desc')->get();

        return view('front', compact('about', 'skills', 'educations', 'work_experiences'));
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\About;
use App\Models\Skill;
use App\Models\Education;

class FrontController extends Controller
{
    public function index()
    {
        $about = About::latest()->first();
        $skills = Skill::all();
        $educations = Education::all();

        return view('front', compact('about', 'skills', 'educations'));
    }
}

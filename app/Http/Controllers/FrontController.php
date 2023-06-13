<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\About;
use App\Models\Skill;

class FrontController extends Controller
{
    public function index()
    {
        $about = About::latest()->first();
        $skills = Skill::all();

        return view('front', compact('about', 'skills'));
    }
}

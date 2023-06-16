<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\About;
use App\Models\Skill;
use App\Models\Education;
use App\Models\WorkExperience;
use App\Models\Contact;
use App\Models\Portfolio;
use App\Models\PortfolioCategory;

class FrontController extends Controller
{
    public function index()
    {
        $about = About::latest()->first();
        $skills = Skill::all();
        $educations = Education::all();        
        $work_experiences = WorkExperience::orderBy('work_experience_year_from', 'desc')->get();
        $portfolio_categories = PortfolioCategory::all();
        $portfolios = Portfolio::all();

        return view('front', compact(
            'about', 
            'skills', 
            'educations', 
            'work_experiences',
            'portfolio_categories',
            'portfolios',
        ));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required'
        ]);

        $input = $request->all();

        Contact::create($input);

        return redirect()->back()->with(['success' => 'Contact Form Submit Successfully']);
    }
}

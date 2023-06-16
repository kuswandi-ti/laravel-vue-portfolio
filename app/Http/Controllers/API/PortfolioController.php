<?php

namespace App\Http\Controllers\API;

use App\Models\Portfolio;
use App\Models\PortfolioCategory;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PortfolioController extends Controller
{
    public function index()
    {
        try {
            $portfolios = Portfolio::query()
                ->when(request('query'), function ($query, $searchQuery) {
                    $query->where('project_name', 'like', "%{$searchQuery}%");
                })
                ->orderBy('id', 'desc')
                ->with('portfolio_category:id,category_name')
                ->latest()
                ->paginate(env('CUSTOM_PAGING'))
                ->through(fn ($portfolio) => [
                    'id' => $portfolio->id,
                    'project_name' => $portfolio->project_name,
                    'portfolio_category' => $portfolio->portfolio_category,
                    'project_year' => $portfolio->project_year,
                    'project_year' => $portfolio->project_year,
                    'project_url' => $portfolio->project_url,
                    'project_description' => $portfolio->project_description,                    
                ]);

            $response = [
                'success' => true,
                'data' => $portfolios,
                'message' => 'Get data Portfolios successfully'
            ];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'project_name' => 'required',
                'portfolio_category_id' => 'required',
                'project_year' => 'required|numeric',
                'project_url' => 'required',
                'project_description' => 'required',
            ], [
                'project_name.required' => 'The project name field is required.',
                'portfolio_category_id.required' => 'The category project field is required.',
                'project_year.required' => 'The project year field is required.',
                'project_year.numeric' => 'The project year field is numeric format.',
                'project_url.required' => 'The project url field is required.',
                'project_description.required' => 'The project description field is required.',
            ]);

            if ($validator->fails()) {
                $response = [
                    'success' => false,
                    'message' => $validator->errors()
                ];
                return response()->json($response, 400);
            }

            $portfolio = Portfolio::create([
                'project_name' => $request->project_name,
                'portfolio_category_id' => $request->portfolio_category_id,
                'project_year' => $request->project_year,
                'project_url' => $request->project_url,
                'project_description' => $request->project_description,
            ]);

            $response = [
                'success' => true,
                'data' => $portfolio,
                'message' => 'Insert data Portfolio successfully'
            ];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function edit($id)
    {
        try {
            $portfolio = Portfolio::find($id);

            $response = [
                'success' => true,
                'data' => $portfolio,
                'message' => 'Edit data Portfolio successfully'
            ];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'project_name' => 'required',
                'portfolio_category_id' => 'required',
                'project_year' => 'required|numeric',
                'project_url' => 'required',
                'project_description' => 'required',
            ], [
                'project_name.required' => 'The project name field is required.',
                'portfolio_category_id.required' => 'The category project field is required.',
                'project_year.required' => 'The project year field is required.',
                'project_year.numeric' => 'The project year field is numeric format.',
                'project_url.required' => 'The project url field is required.',
                'project_description.required' => 'The project description field is required.',
            ]);

            if ($validator->fails()) {
                $response = [
                    'success' => false,
                    'message' => $validator->errors()
                ];
                return response()->json($response, 400);
            }

            $portfolio = Portfolio::find($id);

            $portfolio->update([
                'project_name' => $request->project_name,
                'portfolio_category_id' => $request->portfolio_category_id,
                'project_year' => $request->project_year,
                'project_url' => $request->project_url,
                'project_description' => $request->project_description,
            ]);

            $response = [
                'success' => true,
                'data' => $portfolio,
                'message' => 'Update data Portfolio successfully'
            ];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $portfolio = Portfolio::find($id);

            $portfolio->delete();

            $response = [
                'success' => true,
                'message' => 'Delete data Portfolios successfully'
            ];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function portfolioCategories()
    {
        try {
            $portfolio_categories = PortfolioCategory::latest()->orderBy('category_name', 'asc')->get();

            $response = [
                'success' => true,
                'data' => $portfolio_categories,
                'message' => 'Get data Portfolio Categories successfully'
            ];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}

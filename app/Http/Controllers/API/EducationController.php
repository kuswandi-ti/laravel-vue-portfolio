<?php

namespace App\Http\Controllers\API;

use App\Models\Education;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EducationController extends Controller
{
    public function index()
    {
        try {
            $skills = Education::query()
                ->when(request('query'), function ($query, $searchQuery) {
                    $query->where('education_name', 'like', "%{$searchQuery}%");
                })
                ->orderBy('id', 'asc')
                ->latest()
                ->paginate(env('CUSTOM_PAGING'));

            $response = [
                'success' => true,
                'data' => $skills,
                'message' => 'Get data Education successfully'
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
                'education_name' => 'required',
                'education_city' => 'required',
                'education_year_from' => 'required|numeric',
                'education_year_to' => 'required|numeric',
                'education_gpa' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                $response = [
                    'success' => false,
                    'message' => $validator->errors()
                ];
                return response()->json($response, 400);
            }

            $education = Education::create([
                'education_name' => $request->education_name,
                'education_city' => $request->education_city,
                'education_major' => $request->education_major,
                'education_year_from' => $request->education_year_from,
                'education_year_to' => $request->education_year_to,
                'education_gpa' => $request->education_gpa,
            ]);

            $response = [
                'success' => true,
                'data' => $education,
                'message' => 'Insert data Education successfully'
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
                'education_name' => 'required',
                'education_city' => 'required',
                'education_year_from' => 'required|numeric',
                'education_year_to' => 'required|numeric',
                'education_gpa' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                $response = [
                    'success' => false,
                    'message' => $validator->errors()
                ];
                return response()->json($response, 400);
            }

            $education = Education::find($id);

            $education->update([
                'education_name' => $request->education_name,
                'education_city' => $request->education_city,
                'education_major' => $request->education_major,
                'education_year_from' => $request->education_year_from,
                'education_year_to' => $request->education_year_to,
                'education_gpa' => $request->education_gpa,
            ]);

            $response = [
                'success' => true,
                'data' => $education,
                'message' => 'Update data Education successfully'
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
            $education = Education::find($id);

            $education->delete();

            $response = [
                'success' => true,
                'message' => 'Delete data Education successfully'
            ];

            return response()->json($response, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function bulkDelete(Request $request)
    {
        try {
            $education = Education::whereIn('id', $request->ids);

            $education->delete();

            $response = [
                'success' => true,
                'message' => 'Bulk Delete data Education successfully'
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

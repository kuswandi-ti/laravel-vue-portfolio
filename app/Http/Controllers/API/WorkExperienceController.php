<?php

namespace App\Http\Controllers\API;

use App\Models\WorkExperience;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WorkExperienceController extends Controller
{
    public function index()
    {
        try {
            $work_experiences = WorkExperience::query()
                ->when(request('query'), function ($query, $searchQuery) {
                    $query->where('work_experience_name', 'like', "%{$searchQuery}%");
                })
                ->orderBy('id', 'asc')
                ->latest()
                ->paginate(env('CUSTOM_PAGING'));

            $response = [
                'success' => true,
                'data' => $work_experiences,
                'message' => 'Get data Work Experiences successfully'
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
                'we_name' => 'required',
                'we_city' => 'required',
                'we_year_from' => 'required|numeric',
                'we_year_to' => 'required|numeric',
                'we_position' => 'required',
                'we_job_description' => 'required',
                'we_reason_to_leave' => 'required',                
            ]);

            if ($validator->fails()) {
                $response = [
                    'success' => false,
                    'message' => $validator->errors()
                ];
                return response()->json($response, 400);
            }

            $work_experiences = WorkExperience::create([
                'work_experience_name' => $request->we_name,
                'work_experience_city' => $request->we_city,
                'work_experience_year_from' => $request->we_year_from,
                'work_experience_year_to' => $request->we_year_to,
                'work_experience_position' => $request->we_position,
                'work_experience_job_description' => $request->we_job_description,
                'work_experience_reason_to_leave' => $request->we_reason_to_leave,                
            ]);

            $response = [
                'success' => true,
                'data' => $work_experiences,
                'message' => 'Insert data Work Experience successfully'
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
                'we_name' => 'required',
                'we_city' => 'required',
                'we_year_from' => 'required|numeric',
                'we_year_to' => 'required|numeric',
                'we_position' => 'required',
                'we_job_description' => 'required',
                'we_reason_to_leave' => 'required',                
            ]);

            if ($validator->fails()) {
                $response = [
                    'success' => false,
                    'message' => $validator->errors()
                ];
                return response()->json($response, 400);
            }

            $work_experiences = WorkExperience::find($id);

            $work_experiences->update([
                'work_experience_name' => $request->we_name,
                'work_experience_city' => $request->we_city,
                'work_experience_year_from' => $request->we_year_from,
                'work_experience_year_to' => $request->we_year_to,
                'work_experience_position' => $request->we_position,
                'work_experience_job_description' => $request->we_job_description,
                'work_experience_reason_to_leave' => $request->we_reason_to_leave,                
            ]);

            $response = [
                'success' => true,
                'data' => $work_experiences,
                'message' => 'Update data Work Experience successfully'
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
            $work_experiences = WorkExperience::find($id);

            $work_experiences->delete();

            $response = [
                'success' => true,
                'message' => 'Delete data Work Experience successfully'
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
            $work_experiences = WorkExperience::whereIn('id', $request->ids);

            $work_experiences->delete();

            $response = [
                'success' => true,
                'message' => 'Bulk Delete data Work Experience successfully'
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

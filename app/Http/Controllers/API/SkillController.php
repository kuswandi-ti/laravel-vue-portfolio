<?php

namespace App\Http\Controllers\API;

use App\Models\Skill;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SkillController extends Controller
{
    public function index()
    {
        try {
            $skills = Skill::query()
                ->when(request('query'), function ($query, $searchQuery) {
                    $query->where('skill_name', 'like', "%{$searchQuery}%");
                })
                ->orderBy('id', 'desc')
                ->latest()
                ->paginate(env('CUSTOM_PAGING'));

            $response = [
                'success' => true,
                'data' => $skills,
                'message' => 'Get data Skill successfully'
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
                'skill_name' => 'required',
                'skill_experience' => 'required|numeric',
            ], [
                'skill_value.numeric' => 'The skill value field must numeric format.'
            ]);

            if ($validator->fails()) {
                $response = [
                    'success' => false,
                    'message' => $validator->errors()
                ];
                return response()->json($response, 400);
            }

            $skill = Skill::create([
                'skill_name' => $request->skill_name,
                'skill_experience' => $request->skill_experience,
            ]);

            $response = [
                'success' => true,
                'data' => $skill,
                'message' => 'Insert data Skill successfully'
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
                'skill_name' => 'required',
                'skill_experience' => 'required|numeric',
            ], [
                'skill_value.numeric' => 'The skill value field must numeric.'
            ]);

            if ($validator->fails()) {
                $response = [
                    'success' => false,
                    'message' => $validator->errors()
                ];
                return response()->json($response, 400);
            }

            $skill = Skill::find($id);

            $skill->update([
                'skill_name' => $request->skill_name,
                'skill_experience' => $request->skill_experience,
            ]);

            $response = [
                'success' => true,
                'data' => $skill,
                'message' => 'Update data Skill successfully'
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
            $skill = Skill::find($id);

            $skill->delete();

            $response = [
                'success' => true,
                'message' => 'Delete data Skill successfully'
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
            $skill = Skill::whereIn('id', $request->ids);

            $skill->delete();

            $response = [
                'success' => true,
                'message' => 'Bulk Delete data Skill successfully'
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

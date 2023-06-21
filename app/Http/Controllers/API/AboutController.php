<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Image;

class AboutController extends Controller
{
    public function index()
    {
        try {
            $about = About::all();

            $response = [
                'success' => true,
                'data' => $about,
                'message' => 'Get data About successfully'
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
                'name' => 'required',
                'job_title' => 'required',
                'job_description' => 'required',
                'place_of_birth' => 'required',
                'date_of_birth' => 'required',
                'address' => 'required',
                'email' => 'required|email|unique:abouts,email,' . $id,
                'phone' => 'required',
                'about_description' => 'required',
            ]);

            if ($validator->fails()) {
                $response = [
                    'success' => false,
                    'message' => $validator->errors()
                ];
                return response()->json($response, 400);
            }

            // Upload Image
            $photo = $request->file('photo');
            $extension_photo = $photo->getClientOriginalExtension();
            $timestamp_name_photo = "photo_".time() . '.' . $extension_photo;
            $path_photo = 'images/photo/';
            !is_dir($path_photo) && mkdir($path_photo, 0777, true);
            $new_photo = $path_photo . $timestamp_name_photo;
            Image::make($photo)->resize(300, 300)->save($new_photo);

            // Upload Cv
            $cv = $request->file('cv');
            $extension_cv = $cv->getClientOriginalExtension();
            $timestamp_name_cv = "cv_".time() . '.' . $extension_cv;
            $path_cv = 'document/pdf/';
            !is_dir($path_cv) && mkdir($path_cv, 0777, true);
            $new_cv = $path_cv . $timestamp_name_cv;
            $cv->move($path_cv, $timestamp_name_cv);

            $data = [
                'name' => $request->name,
                'job_title' => $request->job_title,
                'job_description' => $request->job_description,
                'place_of_birth' => $request->place_of_birth,
                'date_of_birth' => $request->date_of_birth,
                'address' => $request->address,
                'email' => $request->email,
                'phone' => $request->phone,
                'about_description' => $request->about_description,
                'photo' => $new_photo,
                'cv' => $new_cv,
            ];

            if (About::where('id', $id)->exists()) {
                $about = About::find($id);
                $about->update($data);
            } else {
                $about = About::create($data);
            }

            $response = [
                'success' => true,
                'data' => $about,
                'message' => 'Update data About successfully'
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',               
        'job_title',
        'job_description',
        'place_of_birth',
        'date_of_birth',
        'address',
        'email',
        'phone',
        'about_description',
        'photo',
        'cv',
    ];
}

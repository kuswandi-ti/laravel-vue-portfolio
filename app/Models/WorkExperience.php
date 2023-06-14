<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkExperience extends Model
{
    use HasFactory;

    protected $fillable = [
        'work_experience_name',
        'work_experience_city',
        'work_experience_year_from',
        'work_experience_year_to',
        'work_experience_position',
        'work_experience_job_description',
        'work_experience_reason_to_leave',        
    ];
}

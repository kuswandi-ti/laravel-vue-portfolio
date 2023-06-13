<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $table = 'educations';

    protected $fillable = [
        'education_name',
        'education_city',
        'education_major',
        'education_year_from',
        'education_year_to',
        'education_gpa',
    ];
}

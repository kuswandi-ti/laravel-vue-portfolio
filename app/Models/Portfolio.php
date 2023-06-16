<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_name',
        'portfolio_category_id',
        'project_year',
        'project_url',
        'project_description',
    ];

    public function portfolio_category()
    {
        return $this->belongsTo(PortfolioCategory::class);
    }
}

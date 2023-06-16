<?php

namespace Database\Seeders;

use App\Models\PortfolioCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PortfolioCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PortfolioCategory::create([
            'category_name' => 'LARAVEL',
        ]);
        PortfolioCategory::create([
            'category_name' => 'VUE',
        ]);
        PortfolioCategory::create([
            'category_name' => 'DESKTOP',
        ]);
    }
}

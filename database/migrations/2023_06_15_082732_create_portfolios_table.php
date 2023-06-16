<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('portfolios', function (Blueprint $table) {            
            $table->id();
            $table->string('project_name');
            $table->biginteger('portfolio_category_id')->unsigned();            
            $table->integer('project_year')->nullable();
            $table->string('project_url')->nullable();
            $table->string('project_image_1')->nullable();
            $table->string('project_image_2')->nullable();
            $table->string('project_image_3')->nullable();
            $table->text('project_description')->nullable();
            $table->foreign('portfolio_category_id')->references('id')->on('portfolio_categories');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('portfolios');
    }
};

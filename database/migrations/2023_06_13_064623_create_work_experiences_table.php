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
        Schema::create('work_experiences', function (Blueprint $table) {
            $table->id();
            $table->string('work_experience_name');
            $table->string('work_experience_city');
            $table->integer('work_experience_year_from')->default(0);
            $table->integer('work_experience_year_to')->default(0);
            $table->string('work_experience_position');
            $table->text('work_experience_job_description');
            $table->string('work_experience_reason_to_leave');            
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
        Schema::dropIfExists('work_experiences');
    }
};

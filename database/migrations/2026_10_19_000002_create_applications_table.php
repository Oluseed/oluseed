<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('type', 20)->default('job')->index();
            $table->string('job_id', 80)->nullable();
            $table->string('job_title', 160);
            $table->string('name', 120);
            $table->string('email', 200);
            $table->string('phone', 40)->nullable();
            $table->string('portfolio', 300)->nullable();
            $table->text('cover_letter')->nullable();
            $table->string('cv_path', 300)->nullable();
            $table->string('status', 20)->default('new')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};

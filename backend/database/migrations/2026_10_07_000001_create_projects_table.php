<?php

use App\Enums\ProjectCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Schema mirrors PRD.txt §5 "TABLE: projects".
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->string('slug', 255)->unique();
            $table->enum('category', ProjectCategory::values());
            $table->string('tagline', 255);
            $table->string('client_region', 100)->nullable();
            $table->string('featured_image', 500);
            $table->text('overview');
            $table->text('challenges_solutions');
            $table->json('results_metrics');
            $table->json('tech_stack');
            $table->string('live_preview_url', 500)->nullable();
            $table->string('github_url', 500)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();

            $table->index(['category', 'order']);
            $table->index(['is_featured', 'order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};

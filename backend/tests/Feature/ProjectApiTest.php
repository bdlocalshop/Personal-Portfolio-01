<?php

namespace Tests\Feature;

use App\Enums\ProjectCategory;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_projects_with_standardized_json_structure(): void
    {
        Project::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/projects');

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'slug',
                        'category',
                        'category_label',
                        'tagline',
                        'client_region',
                        'featured_image',
                        'featured_image_url',
                        'overview',
                        'challenges_solutions',
                        'results_metrics',
                        'tech_stack',
                        'live_preview_url',
                        'github_url',
                        'is_featured',
                        'order',
                    ],
                ],
                'meta' => [
                    'total',
                    'per_page',
                    'current_page',
                    'last_page',
                ],
            ]);

        $this->assertEquals(3, $response->json('meta.total'));
    }

    public function test_can_filter_projects_by_category(): void
    {
        Project::factory()->create(['category' => ProjectCategory::WebDev, 'title' => 'Web App']);
        Project::factory()->create(['category' => ProjectCategory::MobileApp, 'title' => 'Mobile App']);
        Project::factory()->create(['category' => ProjectCategory::UiUx, 'title' => 'Design Project']);

        $response = $this->getJson('/api/v1/projects?category=web-dev');

        $response->assertOk();
        $this->assertEquals(1, $response->json('meta.total'));
        $this->assertEquals('Web App', $response->json('data.0.title'));
        $this->assertEquals('web-dev', $response->json('data.0.category'));
    }

    public function test_can_filter_projects_by_featured_flag(): void
    {
        Project::factory()->create(['is_featured' => true, 'title' => 'Featured One']);
        Project::factory()->create(['is_featured' => false, 'title' => 'Standard One']);

        $response = $this->getJson('/api/v1/projects?featured=1');

        $response->assertOk();
        $this->assertEquals(1, $response->json('meta.total'));
        $this->assertEquals('Featured One', $response->json('data.0.title'));
    }

    public function test_can_view_single_project_by_slug(): void
    {
        $project = Project::factory()->create([
            'title' => 'Unique Project',
            'slug' => 'unique-project',
        ]);

        $response = $this->getJson('/api/v1/projects/unique-project');

        $response->assertOk()
            ->assertJsonPath('data.title', 'Unique Project')
            ->assertJsonPath('data.slug', 'unique-project');
    }

    public function test_returns_404_for_non_existent_slug(): void
    {
        $response = $this->getJson('/api/v1/projects/non-existent-slug');

        $response->assertNotFound();
    }
}

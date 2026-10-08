<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\ProjectCategory;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    /**
     * GET /api/v1/projects
     *
     * Query params (all optional):
     *  - category: all|web-dev|mobile-app|ui-ux
     *  - featured: 1|0
     *  - per_page: 1-50 (default 12)
     *  - page: int
     */
    public function index(Request $request): ProjectCollection
    {
        $validated = $request->validate([
            'category' => ['nullable', Rule::in(['all', ...ProjectCategory::values()])],
            'featured' => ['nullable', 'boolean'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:50'],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);

        $projects = Project::query()
            ->category($validated['category'] ?? null)
            ->when($request->has('featured'), fn ($q) => $q->where('is_featured', $request->boolean('featured')))
            ->ordered()
            ->paginate($validated['per_page'] ?? 12)
            ->withQueryString();

        return new ProjectCollection($projects);
    }

    /**
     * GET /api/v1/projects/{project:slug}
     */
    public function show(Project $project): ProjectResource
    {
        return new ProjectResource($project);
    }
}

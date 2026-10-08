<?php

namespace App\Models;

use App\Enums\ProjectCategory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'tagline',
        'client_region',
        'featured_image',
        'overview',
        'challenges_solutions',
        'results_metrics',
        'tech_stack',
        'live_preview_url',
        'github_url',
        'is_featured',
        'order',
    ];

    protected $attributes = [
        'is_featured' => false,
        'order' => 0,
    ];

    protected function casts(): array
    {
        return [
            'category' => ProjectCategory::class,
            'results_metrics' => 'array',
            'tech_stack' => 'array',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ];
    }

    /**
     * Resolve route-model binding by slug (GET /api/v1/projects/{slug}).
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('order')->orderBy('id');
    }

    public function scopeCategory(Builder $query, ProjectCategory|string|null $category): Builder
    {
        if ($category === null || $category === '' || $category === 'all') {
            return $query;
        }

        $value = $category instanceof ProjectCategory ? $category->value : $category;

        return $query->where('category', $value);
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Public representation of a case study (PRD.txt §5 projects).
 *
 * @mixin \App\Models\Project
 */
class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'category' => $this->category->value,
            'category_label' => $this->category->label(),
            'tagline' => $this->tagline,
            'client_region' => $this->client_region,
            'featured_image' => $this->featured_image,
            'featured_image_url' => $this->featuredImageUrl(),
            'overview' => $this->overview,
            'challenges_solutions' => $this->challenges_solutions,
            'results_metrics' => $this->results_metrics ?? [],
            'tech_stack' => $this->tech_stack ?? [],
            'live_preview_url' => $this->live_preview_url,
            'github_url' => $this->github_url,
            'is_featured' => $this->is_featured,
            'order' => $this->order,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }

    /**
     * Absolute URL for the image: passes through external URLs,
     * otherwise resolves against the public storage disk.
     */
    private function featuredImageUrl(): ?string
    {
        if (blank($this->featured_image)) {
            return null;
        }

        if (filter_var($this->featured_image, FILTER_VALIDATE_URL)) {
            return $this->featured_image;
        }

        return asset('storage/'.ltrim($this->featured_image, '/'));
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * Wraps project lists in the standardized envelope:
 * { "data": [], "meta": { "total": 0, "per_page": 12, ... } }
 */
class ProjectCollection extends ResourceCollection
{
    public $collects = ProjectResource::class;

    public function toArray(Request $request): array
    {
        return ['data' => $this->collection];
    }

    /**
     * Structure pagination meta information clearly.
     */
    public function paginationInformation(Request $request, array $paginated, array $default): array
    {
        return [
            'meta' => [
                'total' => $paginated['total'],
                'per_page' => $paginated['per_page'],
                'current_page' => $paginated['current_page'],
                'last_page' => $paginated['last_page'],
                'next_page_url' => $paginated['next_page_url'],
                'prev_page_url' => $paginated['prev_page_url'],
            ],
        ];
    }
}

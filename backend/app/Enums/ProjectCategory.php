<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

/**
 * Project categories as defined in PRD.txt §5 (projects.category).
 */
enum ProjectCategory: string implements HasLabel
{
    case WebDev = 'web-dev';
    case MobileApp = 'mobile-app';
    case UiUx = 'ui-ux';

    public function label(): string
    {
        return match ($this) {
            self::WebDev => 'Web Development',
            self::MobileApp => 'Mobile Apps',
            self::UiUx => 'UI/UX Design',
        };
    }

    /** Used by Filament selects, filters and badges. */
    public function getLabel(): string
    {
        return $this->label();
    }

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

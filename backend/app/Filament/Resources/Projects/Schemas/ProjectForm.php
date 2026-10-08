<?php

namespace App\Filament\Resources\Projects\Schemas;

use App\Enums\ProjectCategory;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(3)
            ->components([
                Section::make('Case Study')
                    ->columnSpan(2)
                    ->columns(2)
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            // Auto-fill slug from title until the slug is edited manually.
                            ->afterStateUpdated(function (Get $get, Set $set, ?string $old, ?string $state) {
                                if (blank($get('slug')) || $get('slug') === Str::slug((string) $old)) {
                                    $set('slug', Str::slug((string) $state));
                                }
                            }),
                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->alphaDash()
                            ->unique(ignoreRecord: true),
                        Select::make('category')
                            ->options(ProjectCategory::class)
                            ->required()
                            ->native(false),
                        TextInput::make('client_region')
                            ->maxLength(100)
                            ->placeholder('e.g. United States'),
                        TextInput::make('tagline')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Textarea::make('overview')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),
                        Textarea::make('challenges_solutions')
                            ->label('Challenges & Solutions')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),
                    ]),

                Section::make('Publishing')
                    ->columnSpan(1)
                    ->schema([
                        FileUpload::make('featured_image')
                            ->image()
                            ->disk('public')
                            ->directory('projects')
                            ->visibility('public')
                            ->maxSize(4096)
                            ->required(),
                        Toggle::make('is_featured')
                            ->label('Featured on homepage')
                            ->default(false),
                        TextInput::make('order')
                            ->label('Display order')
                            ->required()
                            ->integer()
                            ->default(0)
                            ->helperText('Lower numbers appear first. You can also drag rows in the table.'),
                    ]),

                Section::make('Results Metrics')
                    ->columnSpan(2)
                    ->schema([
                        // Stored as [{"metric": "0.6s Average", "label": "Load Speed"}] per PRD §5.
                        Repeater::make('results_metrics')
                            ->hiddenLabel()
                            ->schema([
                                TextInput::make('label')
                                    ->required()
                                    ->maxLength(50)
                                    ->placeholder('Load Speed'),
                                TextInput::make('metric')
                                    ->required()
                                    ->maxLength(100)
                                    ->placeholder('0.6s Average'),
                            ])
                            ->columns(2)
                            ->required()
                            ->minItems(1)
                            ->maxItems(6)
                            ->reorderable()
                            ->defaultItems(1)
                            ->addActionLabel('Add metric'),
                    ]),

                Section::make('Tech & Links')
                    ->columnSpan(1)
                    ->schema([
                        TagsInput::make('tech_stack')
                            ->required()
                            ->placeholder('Add technology')
                            ->suggestions(['Next.js', 'Laravel API', 'Tailwind CSS', 'Framer Motion', 'React Native', 'Expo', 'Redis', 'Stripe']),
                        TextInput::make('live_preview_url')
                            ->label('Live preview URL')
                            ->url()
                            ->maxLength(500),
                        TextInput::make('github_url')
                            ->label('GitHub URL')
                            ->url()
                            ->maxLength(500),
                    ]),
            ]);
    }
}

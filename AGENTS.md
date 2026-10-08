# Antigravity Workspace Protocol: Headless Portfolio Platform

## 1. System Overview & Monorepo Structure
This repository is a decoupled, headless full-stack developer portfolio. It is organized into two isolated applications under a monorepo root:
- `/backend`: Headless Laravel API (v11+) + Filament Admin Panel (v3+) + SQLite/PostgreSQL.
- `/frontend`: Next.js (v15+ App Router) + Tailwind CSS + Framer Motion + Lucide React.

```
/
├── PRD.txt
├── AGENTS.md
├── backend/            # Isolated Laravel workspace
│   ├── app/
│   ├── config/
│   ├── database/
│   └── routes/api.php
└── frontend/           # Isolated Next.js workspace
    ├── src/app/
    ├── src/components/
    └── src/lib/
```

---

## 2. Agent Operational Boundaries & Constraints

### Global Rules
1. **Directory Isolation**: Never execute Node.js commands (`npm`, `pnpm`, `bun`) inside `/backend`, and never execute PHP/Composer commands inside `/frontend`.
2. **Deterministic Context**: Ground every feature, field name, enum value, and mock data directly in `PRD.txt`. Do not introduce unplanned fields or dependencies without explicit instruction.
3. **No Monolithic Generations**: Deliver changes modularly. Implement backend schema and seeders first, confirm API contracts, then implement frontend consumers.

---

## 3. Backend Directives (`/backend`)

### Architectural Standards
- **Headless Enforcement**: The Laravel backend is an API provider and CMS only. No public-facing Blade views or Livewire components on the frontend domain.
- **Admin CMS**: All administrative CRUD interfaces must use **Filament PHP**. Do not build custom Blade admin views.
- **API Formatting**:
  - Base URL prefix: `/api/v1`
  - Public routes must be throttled and stateless.
  - Return standardized JSON payloads using `JsonResource` classes:
    ```json
    {
      "data": [],
      "meta": { "total": 0 }
    }
    ```
- **CORS Configuration**: Explicitly allow `http://localhost:3000` (and production frontend origins) with credentials support in `config/cors.php`.

### Database & Seeders
- Strict data typing on all migrations matching `PRD.txt`:
  - `projects`: `title`, `slug`, `category` (enum: `web-dev`, `mobile-app`, `ui-ux`), `tagline`, `client_region`, `featured_image`, `overview`, `challenges_solutions`, `results_metrics` (json), `tech_stack` (json), `live_preview_url`, `github_url`, `is_featured` (boolean), `order` (integer).
  - `inquiries`: `name`, `email`, `service_interested`, `budget_range`, `message`, `status` (enum: `new`, `contacted`, `archived`).
- Provide an idempotent `DatabaseSeeder` containing the exact 3 flagship projects specified in `PRD.txt` (ApexPulse, NovaPay, Lumina Studio).

---

## 4. Frontend Directives (`/frontend`)

### Architectural Standards
- **Next.js App Router**: Use `src/app/` structure with React Server Components (RSC) as the default.
- **Client Boundaries**: Restrict `'use client'` strictly to leaf components requiring event listeners, hooks (`useState`, `useEffect`), or Framer Motion transitions.
- **Data Fetching & Caching**:
  - Implement Incremental Static Regeneration (ISR): `fetch(url, { next: { revalidate: 60 } })`.
  - Handle backend unavailability gracefully: if the Laravel API is unreachable during build or runtime, fall back safely to fallback constants without crashing the UI.
- **Design & Performance Requirements**:
  - Maintain a dark, technical, high-contrast palette (`slate-950`/`zinc-900` backgrounds with vivid accents).
  - Enforce zero cumulative layout shifts (CLS): define explicit aspect ratios for device mockups and bento cards.
  - Icons: Exclusively use `lucide-react`.

---

## 5. Incremental Build Workflow (Execution Sequence)

Agents executing instructions in this repository must operate according to these distinct, sequential phases:

```
[Phase 1: Backend Scaffolding]
  ├── Initialize Laravel into /backend
  ├── Configure SQLite database & CORS settings
  ├── Create Migrations, Models, & Factory for Projects and Inquiries
  └── Seed PRD dummy content & verify via Tinker or CLI

[Phase 2: Filament CMS & API Endpoints]
  ├── Install Filament v3 Admin Panel
  ├── Generate Filament Resources: ProjectResource & InquiryResource
  ├── Build API Controllers & JsonResources (/api/v1/projects, /api/v1/inquiries)
  └── Test endpoint JSON output

[Phase 3: Frontend Scaffolding & Foundation]
  ├── Initialize Next.js 15 App Router into /frontend (Tailwind CSS, TypeScript)
  ├── Install dependencies: framer-motion, lucide-react, clsx, tailwind-merge
  └── Configure font family, responsive container wrappers, and theme tokens

[Phase 4: Component Construction]
  ├── Hero Section: Positioning badge, headline, and dual conversion CTAs
  ├── Bento Showcase: Featured project cards with metrics pills and tech tags
  ├── Services Switcher: Tabbed breakdown of Web, Mobile, and UI/UX offerings
  └── Contact Modal / Page: Inquiry form wired to POST /api/v1/inquiries

[Phase 5: Integration & Verification]
  ├── Verify end-to-end form submission with validation handling
  ├── Verify ISR data fetching from the backend
  └── Run production build audits (npm run build and php artisan test)
```

---

## 6. Error Prevention & Troubleshooting Rules
- **PHP Memory / Extension Issues**: If SQLite or PDO drivers are missing during initialization, notify the user immediately rather than attempting destructive global modifications.
- **Hydration Mismatches**: Avoid random ID generation or rendering browser-only attributes (e.g., `window.innerWidth`) directly in the initial SSR pass. Use standard Framer Motion layout props or deferred mount hooks.
- **API Environment Variables**: Store backend endpoints in `.env.local` as `NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1`. Do not hardcode localhost URLs directly in components.
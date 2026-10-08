export type ProjectCategory = "web-dev" | "mobile-app" | "ui-ux";

export interface ResultMetric {
  metric: string;
  label: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: ProjectCategory;
  category_label: string;
  tagline: string;
  client_region: string | null;
  featured_image: string;
  featured_image_url: string | null;
  overview: string;
  challenges_solutions: string;
  results_metrics: ResultMetric[];
  tech_stack: string[];
  live_preview_url: string | null;
  github_url: string | null;
  is_featured: boolean;
  order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    per_page?: number;
    current_page?: number;
    last_page?: number;
    next_page_url?: string | null;
    prev_page_url?: string | null;
  };
}

export interface InquiryPayload {
  name: string;
  email: string;
  service_interested: string;
  budget_range: string;
  message: string;
}

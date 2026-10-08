import { Project } from "@/types";

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "ApexPulse",
    slug: "apexpulse",
    category: "web-dev",
    category_label: "Web Development",
    tagline: "Real-Time Performance Analytics & Monitoring Dashboard",
    client_region: "United States",
    featured_image: "projects/apexpulse.webp",
    featured_image_url: null,
    overview:
      "A high-throughput telemetry analytics platform capable of streaming live event feeds with zero interface freeze.",
    challenges_solutions:
      "Refactored legacy REST polling into WebSockets coupled with a headless Next.js frontend, reducing bandwidth consumption by 65%.",
    results_metrics: [
      { metric: "0.6s Average", label: "Load Speed" },
      { metric: "+65% Engagement", label: "Session Length" },
      { metric: "99.98% Uptime", label: "Availability" },
    ],
    tech_stack: ["Next.js", "Laravel API", "Redis", "Tailwind CSS", "Chart.js"],
    live_preview_url: null,
    github_url: null,
    is_featured: true,
    order: 1,
  },
  {
    id: 2,
    title: "NovaPay",
    slug: "novapay",
    category: "mobile-app",
    category_label: "Mobile Apps",
    tagline: "Cross-Platform Borderless Digital Wallet & Remittance App",
    client_region: "United Kingdom",
    featured_image: "projects/novapay.webp",
    featured_image_url: null,
    overview:
      "A multi-currency mobile wallet supporting cross-border payments, instant peer-to-peer transfers, and offline transaction queues.",
    challenges_solutions:
      "Implemented secure biometric authentication along with an encrypted SQLite local cache for seamless offline transactions.",
    results_metrics: [
      { metric: "4.9 / 5.0 (1,200+ Reviews)", label: "App Rating" },
      { metric: "< 150ms", label: "Biometric Latency" },
      { metric: "Zero critical vulnerabilities", label: "Security" },
    ],
    tech_stack: ["React Native", "Expo", "Laravel Sanctum", "Node.js"],
    live_preview_url: null,
    github_url: null,
    is_featured: true,
    order: 2,
  },
  {
    id: 3,
    title: "Lumina Studio",
    slug: "lumina-studio",
    category: "ui-ux",
    category_label: "UI/UX Design",
    tagline: "High-Converting Headless E-Commerce Brand Storefront",
    client_region: "Germany",
    featured_image: "projects/lumina-studio.webp",
    featured_image_url: null,
    overview:
      "End-to-end design system and headless storefront built for a luxury lifestyle retailer to eliminate mobile checkout friction.",
    challenges_solutions:
      "Designed a modular checkout drawer and progressive image rendering pipeline, minimizing mobile bounce rates.",
    results_metrics: [
      { metric: "+38% Increase", label: "Checkout Conversion" },
      { metric: "98/100 Mobile", label: "Lighthouse Score" },
      { metric: "1.2s Completion", label: "Checkout Path" },
    ],
    tech_stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Stripe", "Headless CMS"],
    live_preview_url: null,
    github_url: null,
    is_featured: true,
    order: 3,
  },
];

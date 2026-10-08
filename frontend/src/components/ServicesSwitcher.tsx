"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Smartphone,
  Palette,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface ServicePillar {
  id: string;
  title: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
}

const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "web-dev",
    title: "Web App Development & Architecture",
    icon: Code2,
    tagline: "Headless, sub-second web applications built for international scale.",
    description:
      "Full-cycle development from high-throughput backend APIs with Laravel to dynamic, SSR/ISR frontend experiences using Next.js. Engineered for zero layout shifts, high concurrency, and resilient cloud architectures.",
    deliverables: [
      "Headless CMS & REST/GraphQL API Design",
      "Next.js App Router (RSC, ISR, Edge Functions)",
      "Database schema optimization & caching (Redis/PostgreSQL)",
      "Automated testing suites and CI/CD pipelines",
    ],
    techStack: ["Next.js 15", "Laravel 12", "TypeScript", "Tailwind CSS", "Redis", "PostgreSQL"],
  },
  {
    id: "ui-ux",
    title: "UI/UX & Digital Product Design",
    icon: Palette,
    tagline: "High-converting design systems and fluid interactive experiences.",
    description:
      "Transforming complex product logic into effortless, intuitive interfaces. We build design systems that scale across design and code with zero friction between Figma and Tailwind CSS.",
    deliverables: [
      "End-to-end UX wireframing & interactive prototypes",
      "Enterprise design systems & token architectures",
      "Micro-animations & transition choreography (Framer Motion)",
      "Conversion rate audit & mobile checkout optimization",
    ],
    techStack: ["Figma", "Framer Motion", "Tailwind CSS", "Lucide React", "Design Tokens"],
  },
  {
    id: "mobile-app",
    title: "Cross-Platform Mobile Applications",
    icon: Smartphone,
    tagline: "Native performance with rapid single-codebase deployment.",
    description:
      "Crafting multi-currency wallets, SaaS companions, and consumer mobile apps using React Native and Expo. Seamless offline caching, biometric authentication, and smooth 60fps animations.",
    deliverables: [
      "iOS and Android cross-platform mobile apps",
      "Offline-first local data syncing & encryption",
      "Biometric security & push notification triggers",
      "App Store & Google Play release pipelines",
    ],
    techStack: ["React Native", "Expo", "Laravel Sanctum", "SQLite Cache", "TypeScript"],
  },
];

export function ServicesSwitcher() {
  const [activeTab, setActiveTab] = useState(SERVICE_PILLARS[0].id);
  const currentService =
    SERVICE_PILLARS.find((s) => s.id === activeTab) || SERVICE_PILLARS[0];
  const CurrentIcon = currentService.icon;

  return (
    <section id="services" className="py-20 bg-slate-950/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" /> Core Offerings
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Specialized Service Pillars
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Tailored engineering and design packages to take founders from raw idea
            to high-performance production releases.
          </p>
        </div>

        {/* Tab Buttons Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {SERVICE_PILLARS.map((service) => {
            const Icon = service.icon;
            const isActive = activeTab === service.id;

            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`flex items-center gap-3.5 p-4 rounded-xl text-left border transition-all ${
                  isActive
                    ? "bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-950/30 text-white"
                    : "bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{service.title}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Description and deliverables */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
                  <CurrentIcon className="w-3.5 h-3.5" />
                  {currentService.title}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {currentService.tagline}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-8">
                  {currentService.description}
                </p>

                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Key Deliverables
                  </div>
                  {currentService.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-300">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Tech Stack & CTA */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full bg-slate-950/70 p-6 rounded-xl border border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
                    <Cpu className="w-4 h-4 text-cyan-400" /> Technology Foundation
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {currentService.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-md text-xs font-mono bg-slate-900 text-slate-200 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-all group"
                >
                  Request a proposal for this pillar
                  <ArrowRight className="w-4 h-4 text-cyan-400 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

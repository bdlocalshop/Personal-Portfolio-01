"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, ProjectCategory } from "@/types";
import {
  ExternalLink,
  Globe,
  Layers,
  Sparkles,
} from "lucide-react";

interface BentoShowcaseProps {
  initialProjects: Project[];
  isFallback?: boolean;
}

const CATEGORIES: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All Projects", value: "all" },
  { label: "Web Development", value: "web-dev" },
  { label: "Mobile Apps", value: "mobile-app" },
  { label: "UI/UX Design", value: "ui-ux" },
];

export function BentoShowcase({
  initialProjects,
  isFallback = false,
}: BentoShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>(
    "all"
  );

  const filteredProjects =
    activeCategory === "all"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Selected Case Studies
              {isFallback && (
                <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Cached/Offline
                </span>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Engineering & Design
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat.value
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id || project.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-sm transition-all hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-cyan-950/20 ${
                  idx === 0 && activeCategory === "all"
                    ? "md:col-span-2 lg:col-span-2"
                    : "col-span-1"
                }`}
              >
                {/* Subtle Card Glow on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-indigo-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />

                <div>
                  {/* Top Bar: Category badge, Client region, and Action links */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wide bg-slate-800 text-cyan-300 border border-slate-700/60">
                      <Layers className="w-3 h-3" />
                      {project.category_label || project.category}
                    </span>

                    <div className="flex items-center gap-3">
                      {project.client_region && (
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Globe className="w-3.5 h-3.5 text-slate-500" />
                          {project.client_region}
                        </span>
                      )}

                      {project.live_preview_url && (
                        <a
                          href={project.live_preview_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                          aria-label="Live Preview"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                          aria-label="GitHub Repository"
                        >
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-300 mb-3">
                    {project.tagline}
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6">
                    {project.overview}
                  </p>

                  {/* Challenge & Solution Highlight */}
                  <div className="mb-6 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Challenge & Solution
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {project.challenges_solutions}
                    </p>
                  </div>
                </div>

                {/* Bottom Section: Metrics Pills and Tech Stack */}
                <div>
                  {/* Results & Metrics Pills */}
                  {project.results_metrics && project.results_metrics.length > 0 && (
                    <div className="mb-5 grid grid-cols-3 gap-2">
                      {project.results_metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-2 rounded-lg bg-slate-950/50 border border-slate-800/60 text-center"
                        >
                          <div className="text-xs font-bold text-emerald-400 font-mono">
                            {m.metric}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/60">
                    {project.tech_stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/50 text-slate-300 border border-slate-700/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

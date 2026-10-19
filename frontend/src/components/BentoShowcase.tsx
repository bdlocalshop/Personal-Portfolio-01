"use client";

import { useState } from "react";
import Image from "next/image";
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
            <div className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Selected Case Studies
              {isFallback && (
                <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20">
                  Cached/Offline
                </span>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Featured Engineering & Design
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat.value
                    ? "bg-white dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/30 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/50"
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
            {filteredProjects.map((project, idx) => {
              const imageUrl =
                project.featured_image_url ||
                (project.featured_image
                  ? project.featured_image.startsWith("http")
                    ? project.featured_image
                    : `http://localhost:8000/storage/${project.featured_image.replace(/^\/+/, "")}`
                  : null);

              return (
                <motion.article
                  key={project.id || project.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 p-6 overflow-hidden transition-all duration-500 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-950/20 ${
                    idx === 0 && activeCategory === "all"
                      ? "md:col-span-2 lg:col-span-2 min-h-[580px]"
                      : "col-span-1 min-h-[580px]"
                  }`}
                >
                  {/* Vivid, Eye-Catching Product Image in Background */}
                  {imageUrl && (
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center opacity-100 brightness-100 contrast-100 transition-transform duration-700 ease-out group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                  )}

                  {/* Subtle Card Glow on Hover */}
                  <div className="absolute inset-0 z-[1] rounded-2xl bg-gradient-to-br from-cyan-500/15 via-indigo-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

                  {/* Content Container (Layered above background image) */}
                  <div className="relative z-10 flex flex-col justify-between h-full gap-6">
                    <div>
                      {/* Top Bar: Category badge, Client region, and Action links */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wide bg-slate-950/90 text-cyan-300 border border-slate-700/90 backdrop-blur-md shadow-lg">
                          <Layers className="w-3.5 h-3.5 text-cyan-400" />
                          {project.category_label || project.category}
                        </span>

                        <div className="flex items-center gap-2">
                          {project.client_region && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-slate-200 font-medium px-3 py-1.5 rounded-lg bg-slate-950/90 border border-slate-700/80 backdrop-blur-md shadow-lg">
                              <Globe className="w-3.5 h-3.5 text-cyan-400" />
                              {project.client_region}
                            </span>
                          )}

                          {project.live_preview_url && (
                            <a
                              href={project.live_preview_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-slate-950/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-400 backdrop-blur-md shadow-lg transition-all hover:scale-105"
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
                              className="p-2 rounded-lg bg-slate-950/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-400 backdrop-blur-md shadow-lg transition-all hover:scale-105"
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

                      {/* Title & Tagline in distinct high-contrast rectangular container */}
                      <div className="mb-4 p-5 rounded-xl bg-slate-950/90 border border-slate-700/80 backdrop-blur-md shadow-xl transition-all group-hover:border-cyan-500/40">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-sm font-medium text-cyan-200">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Overview in distinct rectangular container */}
                      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md shadow-lg">
                        <p className="text-xs sm:text-sm text-slate-200 line-clamp-3 leading-relaxed font-normal">
                          {project.overview}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Section: Tech Stack Tags in distinct rectangular badges */}
                    <div className="pt-2">
                      <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md shadow-lg">
                        {project.tech_stack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 text-slate-200 border border-slate-700/80 shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

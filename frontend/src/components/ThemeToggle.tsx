"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check initial preference from localStorage or default to dark
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial = stored || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const applyTheme = (targetTheme: "dark" | "light") => {
    const root = document.documentElement;
    if (targetTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("theme", targetTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-slate-700/60 bg-slate-900/60 dark:bg-slate-900/60" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 rounded-lg border transition-all duration-200 border-slate-200 dark:border-slate-800 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}

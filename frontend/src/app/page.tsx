import { getProjects } from "@/lib/api";
import { Hero } from "@/components/Hero";
import { BentoShowcase } from "@/components/BentoShowcase";
import { ServicesSwitcher } from "@/components/ServicesSwitcher";
import { ContactForm } from "@/components/ContactForm";

export const revalidate = 60; // ISR cache revalidation every 60s

export default async function Home() {
  const { projects, isFallback } = await getProjects();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-mono font-bold text-white tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            DEV.PORTFOLIO
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#projects" className="hover:text-cyan-300 transition-colors">
              Selected Work
            </a>
            <a href="#services" className="hover:text-cyan-300 transition-colors">
              Services
            </a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="px-4 py-2 rounded-lg text-xs font-medium border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 transition-all hover:border-cyan-500/40"
          >
            Get In Touch
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Bento Showcase */}
      <BentoShowcase initialProjects={projects} isFallback={isFallback} />

      {/* Services Switcher */}
      <ServicesSwitcher />

      {/* Contact Inquiry Form */}
      <ContactForm />

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 bg-slate-950/80 text-center text-xs font-mono text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} International Portfolio. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Next.js 15 App Router</span>
            <span>•</span>
            <span>Headless Laravel 12 API</span>
            <span>•</span>
            <span>Filament CMS</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

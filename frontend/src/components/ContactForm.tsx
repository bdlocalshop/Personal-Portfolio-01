"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitInquiry } from "@/lib/api";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  MessageSquare,
  DollarSign,
  Briefcase,
  User,
} from "lucide-react";

const SERVICES_OPTIONS = [
  "Web App Development & Architecture",
  "UI/UX & Digital Product Design",
  "Cross-Platform Mobile Applications",
  "Full-Stack MVP Development",
  "Consulting / Architecture Audit",
];

const BUDGET_OPTIONS = [
  "< $5k (Sprint / Audit)",
  "$5k - $15k (MVP / Redesign)",
  "$15k - $50k (Full Product)",
  "$50k+ (Enterprise / Scale)",
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service_interested: SERVICES_OPTIONS[0],
    budget_range: BUDGET_OPTIONS[1],
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMessage("");
    setFieldErrors({});

    const result = await submitInquiry(formData);

    if (result.success) {
      setStatus("success");
      setFeedbackMessage(result.message);
      setFormData({
        name: "",
        email: "",
        service_interested: SERVICES_OPTIONS[0],
        budget_range: BUDGET_OPTIONS[1],
        message: "",
      });
    } else {
      setStatus("error");
      setFeedbackMessage(result.message);
      if (result.errors) {
        setFieldErrors(result.errors);
      }
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/5 via-indigo-500/5 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" /> Start a Conversation
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Let’s Build Something Exceptional
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Tell me about your product requirements, timelines, and business goals.
            I typically respond within 24 hours.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 sm:p-10 backdrop-blur-md shadow-2xl shadow-cyan-950/20"
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-6 border border-emerald-500/30">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Inquiry Received!
              </h3>
              <p className="text-slate-300 max-w-md mx-auto mb-8 text-sm">
                {feedbackMessage}
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Alex Morgan"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                  {fieldErrors.name && (
                    <p className="mt-1 text-[11px] text-rose-400">
                      {fieldErrors.name[0]}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="alex@company.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="mt-1 text-[11px] text-rose-400">
                      {fieldErrors.email[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Service Interested */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Service Interested
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <select
                      value={formData.service_interested}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          service_interested: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors appearance-none"
                    >
                      {SERVICES_OPTIONS.map((srv, idx) => (
                        <option key={idx} value={srv} className="bg-slate-900">
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Estimated Budget
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <select
                      value={formData.budget_range}
                      onChange={(e) =>
                        setFormData({ ...formData, budget_range: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors appearance-none"
                    >
                      {BUDGET_OPTIONS.map((bgt, idx) => (
                        <option key={idx} value={bgt} className="bg-slate-900">
                          {bgt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Project Details & Goals
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Share a brief overview of your product, tech requirements, target deadlines, and link to existing specs/Figma..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
                />
                {fieldErrors.message && (
                  <p className="mt-1 text-[11px] text-rose-400">
                    {fieldErrors.message[0]}
                  </p>
                )}
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Inquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Inquiry
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

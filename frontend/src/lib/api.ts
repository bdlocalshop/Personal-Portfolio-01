import { ApiResponse, Project, InquiryPayload } from "@/types";
import { FALLBACK_PROJECTS } from "./constants";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/**
 * Fetch projects with ISR cache revalidation (60 seconds) as required by AGENTS.md.
 * Gracefully falls back to PRD constants if backend is unavailable.
 */
export async function getProjects(): Promise<{
  projects: Project[];
  isFallback: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.warn(`API returned status ${res.status}. Falling back to constants.`);
      return { projects: FALLBACK_PROJECTS, isFallback: true };
    }

    const payload: ApiResponse<Project[]> = await res.json();
    return {
      projects: payload.data && payload.data.length > 0 ? payload.data : FALLBACK_PROJECTS,
      isFallback: false,
    };
  } catch (error) {
    console.warn("Backend unavailable during fetch. Falling back to PRD constants.", error);
    return { projects: FALLBACK_PROJECTS, isFallback: true };
  }
}

/**
 * Submit inquiry to POST /api/v1/inquiries
 */
export async function submitInquiry(payload: InquiryPayload): Promise<{
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to submit inquiry. Please check the fields.",
        errors: data.errors,
      };
    }

    return {
      success: true,
      message: data.message || "Your inquiry has been submitted successfully!",
    };
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return {
      success: false,
      message: "Network error. Please try again or reach out directly.",
    };
  }
}

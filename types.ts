import type { ReactNode } from 'react';

export type EntryCategory = 'research' | 'project';

export interface Project {
  slug: string;
  title: string;
  /** Splits the single list into Research vs Projects & Activities. */
  category: EntryCategory;
  /** ISO-ish date ("YYYY" or "YYYY-MM"). Provisional — replace with the authoritative list. */
  date: string;
  /** Short venue/context label shown in the list (e.g. "RSJ 2025", "Internship"). Optional. */
  venue?: string;
  description: string;
  longDescription: string;
  /** Optional. No longer shown in the list; used only on the detail page. */
  imageUrl?: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

export interface Skill {
  name: string;
  icon: ReactNode;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

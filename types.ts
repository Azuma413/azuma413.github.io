import type { ReactNode } from 'react';

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
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
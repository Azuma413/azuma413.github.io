import React, { useEffect, FC } from 'react';
import { useParams, Link } from "react-router-dom";
import type { Post } from '../types';
import AnimatedDiv from './AnimatedDiv';
import MarkdownRenderer from './MarkdownRenderer';
// Posts authored in Notion, fetched at build time (see scripts/fetch-notion-posts.js).
// Defaults to [] so local builds work without Notion credentials.
import notionPosts from '../data/notion-posts.json';

// Viteのimport.meta.globを使ってdocs/内のマークダウンファイルを動的に読み込む
const markdownFiles = import.meta.glob('../docs/*.md', { eager: true, query: '?raw', import: 'default' });

interface FrontMatterResult {
    data: Record<string, string>;
    content: string;
}

const parseFrontMatter = (markdown: string): FrontMatterResult => {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontMatterRegex);

    if (!match) {
        return { data: {}, content: markdown };
    }

    const frontMatterText = match[1];
    const content = match[2];

    const data: Record<string, string> = {};
    const lines = frontMatterText.split('\n');

    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            value = value.replace(/^["']|["']$/g, '');
            data[key] = value;
        }
    }

    return { data, content };
};

const getSlugFromPath = (path: string): string => {
    const match = path.match(/\/([^/]+)\.md$/);
    return match ? match[1] : '';
};

// docs/*.md からPostを生成
const markdownPosts: Post[] = Object.entries(markdownFiles).map(([path, rawContent]) => {
    const slug = getSlugFromPath(path);
    const { data, content } = parseFrontMatter(rawContent as string);
    const title = data.title || 'Untitled';
    const date = data.date
        ? new Date(data.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

    return {
        slug,
        title,
        date,
        excerpt: data.excerpt || '',
        content,
    };
});

// Notion由来の記事とマージ（slug重複時はNotionを優先）、日付降順でソート
const buildPosts = (): Post[] => {
    const bySlug = new Map<string, Post>();
    for (const p of markdownPosts) bySlug.set(p.slug, p);
    for (const p of notionPosts as Post[]) bySlug.set(p.slug, p);
    return Array.from(bySlug.values()).sort((a, b) =>
        a.date < b.date ? 1 : a.date > b.date ? -1 : b.slug.localeCompare(a.slug)
    );
};

const posts: Post[] = buildPosts();

const BlogPage: FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? posts.find(p => p.slug === slug) : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (slug) {
        if (!post) {
            return (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-32 text-center">
                    <h1 className="text-3xl font-bold text-ink mb-4 font-heading">Post not found</h1>
                    <Link to="/blog" className="text-accent hover:text-accent-hover">
                        &larr; Back to Blog
                    </Link>
                </div>
            );
        }
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-32 lg:pb-28">
                <AnimatedDiv>
                    <article className="max-w-3xl mx-auto">
                        <Link to="/blog" className="text-sm text-accent hover:text-accent-hover mb-8 inline-block">
                            &larr; Back to Blog
                        </Link>
                        <p className="text-sm text-ink-muted tabular-nums mb-2">{post.date}</p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-8 font-heading leading-tight">{post.title}</h1>
                        <div className="text-ink-light">
                            <MarkdownRenderer>{post.content}</MarkdownRenderer>
                        </div>
                    </article>
                </AnimatedDiv>
            </div>
        );
    }

    return (
        <section id="blog" className="pt-28 pb-20 lg:pt-32 lg:pb-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedDiv>
                    <div className="max-w-3xl mx-auto mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-ink font-heading">Blog</h1>
                        <p className="mt-2 text-ink-muted">Notes on research, robotics, and things I'm building.</p>
                    </div>
                </AnimatedDiv>
                <div className="max-w-3xl mx-auto">
                    {posts.length === 0 ? (
                        <p className="text-ink-muted">No posts yet.</p>
                    ) : (
                        <ul className="border-y border-hair divide-y divide-hair">
                            {posts.map((p, index) => (
                                <AnimatedDiv key={p.slug} delay={index * 80}>
                                    <li>
                                        <Link
                                            to={`/blog/${p.slug}`}
                                            className="group grid grid-cols-[4rem_minmax(0,1fr)] sm:grid-cols-[8rem_minmax(0,1fr)] gap-x-4 sm:gap-x-8 px-2 sm:px-4 py-5 transition-colors hover:bg-accent-soft/70"
                                        >
                                            <div className="pt-1 text-sm font-semibold text-ink-muted tabular-nums">{p.date}</div>
                                            <div className="min-w-0">
                                                <h3 className="font-heading text-lg sm:text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                                                    {p.title}
                                                </h3>
                                                {p.excerpt && (
                                                    <p className="mt-1 text-sm sm:text-base text-ink-light leading-relaxed line-clamp-2">{p.excerpt}</p>
                                                )}
                                            </div>
                                        </Link>
                                    </li>
                                </AnimatedDiv>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogPage;

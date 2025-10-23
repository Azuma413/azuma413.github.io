import React, { useEffect, FC, useMemo } from 'react';
// Fix: Corrected import for react-router-dom.
import { useParams, Link } from "react-router-dom";
import type { Post } from '../types';
import AnimatedDiv from './AnimatedDiv';
import MarkdownRenderer from './MarkdownRenderer';

// Viteのimport.meta.globを使ってdocs/内のマークダウンファイルを動的に読み込む
const markdownFiles = import.meta.glob('../docs/*.md', { eager: true, query: '?raw', import: 'default' });

// マークダウンファイルからタイトルを抽出する関数
const extractTitle = (content: string): string => {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : 'Untitled';
};

// ファイルパスからslugを生成する関数
const getSlugFromPath = (path: string): string => {
  const match = path.match(/\/([^/]+)\.md$/);
  return match ? match[1] : '';
};

// マークダウンファイルからPost配列を生成
const posts: Post[] = Object.entries(markdownFiles).map(([path, content]) => {
  const slug = getSlugFromPath(path);
  const title = extractTitle(content as string);
  const date = new Date().toISOString().split('T')[0]; // 現在の日付を使用
  
  return {
    slug,
    title,
    date,
    excerpt: '', // excerptは生成しない
    content: content as string,
  };
});

const BlogPage: FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? posts.find(p => p.slug === slug) : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (slug) {
        if (!post) {
            return (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Post not found</h1>
                    <Link to="/blog" className="text-indigo-400 hover:text-indigo-300">
                        &larr; Back to Blog
                    </Link>
                </div>
            );
        }
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <AnimatedDiv>
                    <article className="max-w-4xl mx-auto">
                        <Link to="/blog" className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
                            &larr; Back to Blog
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{post.title}</h1>
                        <p className="text-slate-400 mb-8">{post.date}</p>
                        <div className="text-slate-300">
                            <MarkdownRenderer>{post.content}</MarkdownRenderer>
                        </div>
                    </article>
                </AnimatedDiv>
            </div>
        );
    }

    return (
        <section id="blog" className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedDiv>
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
                        Blog
                    </h2>
                </AnimatedDiv>
                <div className="max-w-4xl mx-auto space-y-12">
                    {posts.map((p, index) => (
                        <AnimatedDiv key={p.slug} delay={index * 150}>
                            <div className="bg-slate-800/50 p-8 rounded-lg shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-1">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    <Link to={`/blog/${p.slug}`} className="hover:text-indigo-400 transition-colors">
                                        {p.title}
                                    </Link>
                                </h3>
                                <p className="text-sm text-slate-500 mb-4">{p.date}</p>
                                <p className="text-slate-400 mb-6">{p.excerpt}</p>
                                <Link to={`/blog/${p.slug}`} className="text-indigo-400 hover:text-indigo-300 font-semibold">
                                    Read more &rarr;
                                </Link>
                            </div>
                        </AnimatedDiv>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPage;

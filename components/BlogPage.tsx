import React, { useEffect, FC, useMemo } from 'react';
// Fix: Corrected import for react-router-dom.
import { useParams, Link } from "react-router-dom";
import type { Post } from '../types';
import AnimatedDiv from './AnimatedDiv';
import MarkdownRenderer from './MarkdownRenderer';

// Viteのimport.meta.globを使ってdocs/内のマークダウンファイルを動的に読み込む
const markdownFiles = import.meta.glob('../docs/*.md', { eager: true, query: '?raw', import: 'default' });

// シンプルなFront Matterパーサー
interface FrontMatterResult {
  data: Record<string, string>;
  content: string;
}

const parseFrontMatter = (markdown: string): FrontMatterResult => {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontMatterRegex);

  if (!match) {
    // Front Matterがない場合は空のdataと元のcontentを返す
    return { data: {}, content: markdown };
  }

  const frontMatterText = match[1];
  const content = match[2];

  // Front MatterをYAML風にパース（簡易版）
  const data: Record<string, string> = {};
  const lines = frontMatterText.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // クォートを削除
      value = value.replace(/^["']|["']$/g, '');
      
      data[key] = value;
    }
  }

  return { data, content };
};

// ファイルパスからslugを生成する関数
const getSlugFromPath = (path: string): string => {
  const match = path.match(/\/([^/]+)\.md$/);
  return match ? match[1] : '';
};

// マークダウンファイルからPost配列を生成
const posts: Post[] = Object.entries(markdownFiles).map(([path, rawContent]) => {
  const slug = getSlugFromPath(path);

  // カスタムパーサーでFront Matterと本文をパース
  const { data, content } = parseFrontMatter(rawContent as string);

  // Front Matterから情報を取得
  const title = data.title || 'Untitled';
  
  // dateを取得。なければ今日の日付をフォールバック
  const date = data.date 
    ? new Date(data.date).toISOString().split('T')[0] 
    : new Date().toISOString().split('T')[0];
  
  return {
    slug,
    title,
    date,
    excerpt: data.excerpt || '',
    content: content,
  };
}).sort((a, b) => b.slug.localeCompare(a.slug)); // アルファベット降順でソート

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

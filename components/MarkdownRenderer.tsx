import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  children: string;
}

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ children }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw]}
      className="prose lg:prose-xl max-w-none"
      components={{
        // iframeをレスポンシブなdivでラップ
        iframe: ({ node, ...props }) => (
          <div className="relative w-full my-6" style={{ paddingBottom: '56.25%' }}>
            <iframe
              {...props}
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        ),
        h1: ({ node, ...props }) => (
          <h1 className="text-4xl font-bold mb-4 text-white" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-3xl font-bold mb-3 text-white" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-2xl font-bold mb-2 text-white" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-xl font-bold mb-2 text-white" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className="text-lg font-bold mb-1 text-white" {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6 className="text-base font-bold mb-1 text-white" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-4 text-slate-300" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside mb-4 text-slate-300 space-y-2" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside mb-4 text-slate-300 space-y-2" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="text-slate-300" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-4 italic text-slate-400 bg-slate-800/30 [&>p]:mb-2 [&>p:last-child]:mb-0"
            {...props}
          >
            {props.children}
          </blockquote>
        ),
        img: ({ node, ...props }) => {
          // 画像パスを調整（sources/で始まる場合はdocs/sources/に変換）
          const src = props.src?.startsWith('sources/')
            ? `/docs/${props.src}`
            : props.src;
          
          return (
            <img
              {...props}
              src={src}
              alt={props.alt || ''}
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;

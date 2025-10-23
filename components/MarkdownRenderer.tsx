import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  children: string;
}

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ children }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose lg:prose-xl max-w-none"
      components={{
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

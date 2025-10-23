import React, { FC, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  children: string;
}

// URLメタデータキャッシュ
let metadataCache: Record<string, {
  title: string;
  description: string;
  image: string;
  favicon: string;
}> | null = null;

// キャッシュを読み込む
async function loadMetadataCache() {
  if (metadataCache !== null) {
    return metadataCache;
  }
  
  try {
    const response = await fetch('/url-metadata.json');
    if (response.ok) {
      metadataCache = await response.json();
    } else {
      metadataCache = {};
    }
  } catch (error) {
    console.error('メタデータキャッシュの読み込みに失敗しました:', error);
    metadataCache = {};
  }
  
  return metadataCache;
}

// URLプレビューカードコンポーネント
const UrlPreviewCard: FC<{ url: string }> = ({ url }) => {
  const [metadata, setMetadata] = useState<{
    title: string;
    description: string;
    image: string;
    favicon: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const cache = await loadMetadataCache();
        
        if (cache[url]) {
          // キャッシュからメタデータを取得
          setMetadata(cache[url]);
        } else {
          // キャッシュにない場合はフォールバック
          const urlObj = new URL(url);
          const domain = urlObj.hostname.replace('www.', '');
          
          setMetadata({
            title: domain,
            description: url,
            image: '',
            favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
          });
        }
      } catch (error) {
        console.error('Failed to load metadata:', error);
        // エラー時のフォールバック
        try {
          const urlObj = new URL(url);
          const domain = urlObj.hostname.replace('www.', '');
          
          setMetadata({
            title: domain,
            description: url,
            image: '',
            favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
          });
        } catch (e) {
          setMetadata({
            title: 'Link',
            description: url,
            image: '',
            favicon: ''
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  if (loading) {
    return (
      <div className="my-4 p-4 border border-slate-700 rounded-lg bg-slate-800/50 animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-slate-700 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block my-4 p-4 border border-slate-700 rounded-lg bg-slate-800/50 hover:bg-slate-800 hover:border-indigo-500 transition-all duration-200 no-underline group"
    >
      <div className="flex items-start gap-3">
        {metadata?.favicon && (
          <img
            src={metadata.favicon}
            alt=""
            className="w-6 h-6 rounded flex-shrink-0 mt-1"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="text-white font-medium mb-1 group-hover:text-indigo-400 transition-colors line-clamp-2">
            {metadata?.title || 'Link'}
          </div>
          <div className="text-slate-400 text-sm truncate">
            {metadata?.description}
          </div>
        </div>
        {metadata?.image && (
          <img
            src={metadata.image}
            alt=""
            className="w-20 h-20 object-cover rounded flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
      </div>
    </a>
  );
};

// URL単体の行をリンクカードに変換する関数
const convertUrlsToEmbeds = (markdown: string): string => {
  const lines = markdown.split('\n');
  const processedLines = lines.map((line) => {
    const trimmedLine = line.trim();
    
    // URL単体の行かチェック（前後に他のテキストがない）
    const urlRegex = /^https?:\/\/[^\s]+$/;
    if (!urlRegex.test(trimmedLine)) {
      return line;
    }

    const url = trimmedLine;
    
    // URLをカスタムHTMLタグで囲む（後でReactコンポーネントに置き換える）
    return `<url-preview data-url="${url}"></url-preview>`;
  });

  return processedLines.join('\n');
};

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ children }) => {
  // マークダウンを前処理してURL埋め込みを追加
  const processedMarkdown = convertUrlsToEmbeds(children);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw]}
      className="prose lg:prose-xl max-w-none"
      components={{
        // カスタムURLプレビューカード
        'url-preview': ({ node, ...props }) => {
          const url = (props as any)['data-url'];
          return url ? <UrlPreviewCard url={url} /> : null;
        },
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
      {processedMarkdown}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;

// URLメタデータを取得してキャッシュするスクリプト
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// マークダウンファイルからURLを抽出
function extractUrls(markdown) {
  const lines = markdown.split('\n');
  const urls = [];
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    const urlRegex = /^https?:\/\/[^\s]+$/;
    if (urlRegex.test(trimmedLine)) {
      urls.push(trimmedLine);
    }
  });
  
  return urls;
}

// URLからHTMLを取得
function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// HTMLからメタデータを抽出
function parseMetadata(html, url) {
  const urlObj = new URL(url);
  const domain = urlObj.hostname.replace('www.', '');
  
  // タイトルを抽出
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim() : domain;
  
  // OGタイトルを抽出（優先）
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
  if (ogTitleMatch) {
    title = ogTitleMatch[1].trim();
  }
  
  // ディスクリプションを抽出
  let description = url;
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  if (descMatch) {
    description = descMatch[1].trim();
  }
  
  // OGディスクリプションを抽出（優先）
  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
  if (ogDescMatch) {
    description = ogDescMatch[1].trim();
  }
  
  // OG画像を抽出
  let image = '';
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  if (ogImageMatch) {
    image = ogImageMatch[1].trim();
  }
  
  return {
    title,
    description,
    image,
    favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
  };
}

// メインの処理
async function main() {
  const docsDir = path.join(__dirname, '..', 'docs');
  const outputPath = path.join(__dirname, '..', 'public', 'url-metadata.json');
  
  // 既存のキャッシュを読み込む
  let cache = {};
  if (fs.existsSync(outputPath)) {
    try {
      cache = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
    } catch (e) {
      console.log('既存のキャッシュを読み込めませんでした。新規作成します。');
    }
  }
  
  // すべてのマークダウンファイルを読み込む
  const files = fs.readdirSync(docsDir).filter(file => file.endsWith('.md'));
  const allUrls = new Set();
  
  files.forEach(file => {
    const content = fs.readFileSync(path.join(docsDir, file), 'utf-8');
    const urls = extractUrls(content);
    urls.forEach(url => allUrls.add(url));
  });
  
  console.log(`${allUrls.size}個のURLを検出しました`);
  
  // 各URLのメタデータを取得
  for (const url of allUrls) {
    // キャッシュに存在する場合はスキップ
    if (cache[url]) {
      console.log(`キャッシュ済み: ${url}`);
      continue;
    }
    
    try {
      console.log(`取得中: ${url}`);
      const html = await fetchHtml(url);
      const metadata = parseMetadata(html, url);
      cache[url] = metadata;
      console.log(`✓ ${metadata.title}`);
      
      // レート制限を避けるため少し待機
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`エラー: ${url}`, error.message);
      // エラーの場合は基本情報のみ保存
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace('www.', '');
      cache[url] = {
        title: domain,
        description: url,
        image: '',
        favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
      };
    }
  }
  
  // キャッシュを保存
  fs.writeFileSync(outputPath, JSON.stringify(cache, null, 2));
  console.log(`\nメタデータを ${outputPath} に保存しました`);
}

main().catch(console.error);

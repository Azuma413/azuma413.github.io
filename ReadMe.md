# ホームページ

React + Vite + Tailwind (CDN) で作られた個人ページ。GitHub Pages（`dist` ブランチ）で配信。

## セットアップ

```bash
npm install
```

## ローカル確認

```bash
npm run dev      # 開発サーバ
npm run build && npm run preview   # 本番ビルドの確認
```

## 構成

- トップは1ページ縦スクロール：`Profile`（名前＋About）→ `Research` → `Projects & Activities` → `Contact`。
- Research と Projects は一覧（日付・タイトル・タグ）で表示し、クリックで個別ページ（`/projects/:slug`）へ。
- ブログは `/blog`。

## 編集方法

### Research / Projects

`components/Projects.tsx` の `projectsData` 配列に追記する。

- `category`: `'research'`（Research 一覧）か `'project'`（Projects & Activities 一覧）。
- `date`: `'YYYY'` または `'YYYY-MM'`。一覧はこの日付の降順で並ぶ。
- `venue`: 一覧の日付の下に出る短いラベル（例: `'RSJ 2025'`, `'Internship'`）。任意。
- `title` / `description` / `longDescription`（Markdown）/ `tags` / `imageUrl`（詳細ページのみ・任意）。

> 現在の `date` / `venue` は暫定値。正式な一覧が決まったらここを差し替えるだけでよい。

画像は `public/images/` に置く。

### ブログ（Notion から更新）

ブログ記事は Notion のデータベースで書き、ビルド時に取り込む（`scripts/fetch-notion-posts.js` → `data/notion-posts.json`）。
スマホの Notion アプリから書いて、GitHub Actions を回せば更新できる。

従来どおり `docs/*.md` に直接置いた記事も引き続き表示される（slug が重複した場合は Notion 側を優先）。

#### 初回セットアップ（一度だけ）

1. **Notion インテグレーションを作成**：<https://www.notion.so/my-integrations> で新規作成し、Internal Integration Secret（`ntn_...` で始まる。以前は `secret_...` 形式）を控える。
2. **ブログ用データベースを作成**し、以下のプロパティを用意する（名前は日本語/英語どちらでも可、大文字小文字は無視）：
   - `Title`（タイトル型）— 記事タイトル
   - `Date`（日付型）— 公開日
   - `Slug`（テキスト型・任意）— URL。未設定ならタイトルから自動生成
   - `Excerpt`（テキスト型・任意）— 一覧に出る概要
   - `Published`（チェックボックス・任意）— OFF の記事は取り込まない（下書き扱い）
3. **データベースをフルページで開き**、ページ**右上の「•••」→「コネクト」→「+ コネクトを追加」**から、作成したインテグレーションを**接続**する。
   （ワークスペースの「設定」ではなく、そのページ個別の「•••」メニューから行う点に注意）
4. データベースの ID を控える（URL の `notion.so/xxxx?v=...` の `xxxx` 部分）。
5. **GitHub リポジトリの Secrets** に登録する
   （Settings → Secrets and variables → Actions → New repository secret）：
   - `NOTION_TOKEN` = インテグレーションのトークン
   - `NOTION_DATABASE_ID` = データベース ID
6. GitHub の **Settings → Pages** で、配信元ブランチが `dist`（`/root`）になっていることを確認。

ローカルで試す場合は、リポジトリ直下に `.env.local` を作り（gitignore 済み）：

```
NOTION_TOKEN=ntn_xxx
NOTION_DATABASE_ID=xxxx
```

> 注: Notion に貼った画像は自動で `public/notion-assets/` にダウンロードして取り込む（Notion の画像URLは期限切れになるため）。

#### 更新の流れ

- Notion で記事を書く／編集する。
- 反映方法（どちらでも）：
  - **手動**：GitHub アプリ or Web の Actions → 「Build & Deploy」→ 「Run workflow」。スマホからも可。
  - **自動**：3時間ごとのスケジュールで自動ビルド（`.github/workflows/deploy.yml` の cron で調整可）。
- `main` への push でも自動でビルド＆デプロイされる。

## デプロイ

GitHub Actions（`.github/workflows/deploy.yml`）が `main` への push・手動実行・定期実行で
`npm run build` → `dist` ブランチへ公開、まで自動で行う。

ローカルから手動で公開したい場合は従来の `./update.ps1` も利用可能
（その場合 Notion 記事を含めるには `.env.local` の設定が必要）。

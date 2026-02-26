# GitHub Pages デプロイスクリプト
# mainブランチから実行してください

$ErrorActionPreference = "Stop"

# mainブランチにいることを確認
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -ne "main") {
    Write-Error "mainブランチから実行してください。現在のブランチ: $currentBranch"
    exit 1
}

# 未コミットの変更がないか確認
$status = git status --porcelain
if ($status) {
    Write-Warning "未コミットの変更があります。先にコミットしてください。"
    Write-Host $status
    exit 1
}

# ビルド実行
Write-Host ">>> npm run build を実行中..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "ビルドに失敗しました。"
    exit 1
}
Write-Host ">>> ビルド完了" -ForegroundColor Green

# ビルド結果を一時フォルダにコピー
$tempDir = Join-Path $env:TEMP "github-pages-deploy-$(Get-Date -Format 'yyyyMMddHHmmss')"
Write-Host ">>> ビルド結果を一時フォルダにコピー: $tempDir" -ForegroundColor Cyan
Copy-Item -Path "dist" -Destination $tempDir -Recurse -Force

# distブランチに切り替え
Write-Host ">>> distブランチに切り替え中..." -ForegroundColor Cyan
git checkout dist
if ($LASTEXITCODE -ne 0) {
    Write-Error "distブランチへの切り替えに失敗しました。"
    Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    exit 1
}

# ルートの古いファイルを削除（.git以外すべて削除）
Write-Host ">>> 古いファイルを削除中..." -ForegroundColor Cyan
Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | ForEach-Object {
    Remove-Item -Path $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
}

# 一時フォルダからビルド結果をルートにコピー
Write-Host ">>> 新しいビルド結果をコピー中..." -ForegroundColor Cyan
Copy-Item -Path "$tempDir\*" -Destination "." -Recurse -Force

# update.ps1自体をmainから復元（distブランチにもスクリプトを保持するため）
git checkout main -- update.ps1

# コミット＆プッシュ
Write-Host ">>> 変更をコミット＆プッシュ中..." -ForegroundColor Cyan
git add -A
$hasChanges = git diff --cached --quiet 2>&1; $changesExist = $LASTEXITCODE -ne 0
if ($changesExist) {
    git commit -m "update"
    git push origin dist
    Write-Host ">>> プッシュ完了！" -ForegroundColor Green
} else {
    Write-Host ">>> 変更なし。プッシュをスキップします。" -ForegroundColor Yellow
}

# mainブランチに戻る
Write-Host ">>> mainブランチに戻ります..." -ForegroundColor Cyan
git checkout main

# 一時フォルダを削除
Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue

Write-Host ">>> デプロイ完了！" -ForegroundColor Green

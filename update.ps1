# GitHub Pages Deploy Script
# Run this from the main branch

# Check we are on main branch
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -ne "main") {
    Write-Error "Please run from the main branch. Current branch: $currentBranch"
    exit 1
}

# Build
Write-Host ">>> Running npm run build..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed."
    exit 1
}
Write-Host ">>> Build complete" -ForegroundColor Green

# Copy build output to temp folder
$tempDir = Join-Path $env:TEMP "gh-pages-deploy-$(Get-Date -Format 'yyyyMMddHHmmss')"
Write-Host ">>> Copying build output to temp: $tempDir" -ForegroundColor Cyan
Copy-Item -Path "dist" -Destination $tempDir -Recurse -Force

# Remove dist folder and stash any changes to avoid git checkout conflict
Write-Host ">>> Preparing for branch switch..." -ForegroundColor Cyan
Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue
git stash --include-untracked 2>&1 | Out-Null

# Switch to dist branch
Write-Host ">>> Switching to dist branch..." -ForegroundColor Cyan
git checkout dist 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to switch to dist branch."
    git stash pop 2>&1 | Out-Null
    Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    exit 1
}

# Remove all old files (except .git)
Write-Host ">>> Removing old files..." -ForegroundColor Cyan
Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | ForEach-Object {
    Remove-Item -Path $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
}

# Copy new build output to root
Write-Host ">>> Copying new build output..." -ForegroundColor Cyan
Copy-Item -Path "$tempDir\*" -Destination "." -Recurse -Force

# Restore update.ps1 from main
git checkout main -- update.ps1 2>&1 | Out-Null

# Commit and push
Write-Host ">>> Committing and pushing..." -ForegroundColor Cyan
git add -A
git diff --cached --quiet 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m "update"
    git push origin dist
    Write-Host ">>> Push complete!" -ForegroundColor Green
} else {
    Write-Host ">>> No changes. Skipping push." -ForegroundColor Yellow
}

# Switch back to main and restore stash
Write-Host ">>> Switching back to main..." -ForegroundColor Cyan
git checkout main 2>&1 | Out-Null
git stash pop 2>&1 | Out-Null

# Clean up temp folder
Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue

Write-Host ">>> Deploy complete!" -ForegroundColor Green

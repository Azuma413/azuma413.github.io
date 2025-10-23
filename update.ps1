$folders = @(
    "assets",
    "images",
    "sources",
    "index.html"
)

foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Remove-Item -Path $folder -Recurse -Force -ErrorAction SilentlyContinue
    }
}

Copy-Item -Path "dist\*" -Destination "." -Recurse -Force -ErrorAction SilentlyContinue
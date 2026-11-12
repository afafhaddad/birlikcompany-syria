# Regenerates the downloadable PDF catalogues in public/catalogue/ from the print page.
# Run after changing products or images, then commit the PDFs:
#
#   npm run build
#   npx vite preview --port 4180      (in another terminal)
#   powershell -ExecutionPolicy Bypass -File scripts/build-catalogue-pdf.ps1
#
# How it works: for each language it loads the pre-rendered print page
# (dist/<lang>/catalogue/print/index.html), downloads every photo from the live site's
# image optimizer at 640px, re-encodes it as JPEG (browsers embed JPEG in PDFs as-is,
# but store WebP/AVIF uncompressed, which made the PDF ~19 MB), writes a script-free copy
# of the page pointing at the JPEGs, and prints that copy with headless Microsoft Edge.
param(
  [string]$BaseUrl = 'http://localhost:4180',
  [string[]]$Langs = @('ar', 'en', 'tr'),
  [int]$JpegQuality = 70
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName PresentationCore

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$dist = Join-Path $root 'dist'
$outDir = Join-Path $root 'public\catalogue'
$imgDir = Join-Path $dist 'pdf-img'
New-Item -ItemType Directory -Force $outDir, $imgDir | Out-Null

$edge = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $edge) { throw 'Microsoft Edge not found' }

function Convert-ToJpeg([string]$url, [string]$dest) {
  if (Test-Path $dest) { return }
  $tmp = "$dest.src"
  Invoke-WebRequest $url -OutFile $tmp -Headers @{ Accept = 'image/webp,image/jpeg' } -UseBasicParsing
  $in = [IO.File]::OpenRead($tmp)
  try {
    $frame = [Windows.Media.Imaging.BitmapDecoder]::Create($in, 'None', 'OnLoad').Frames[0]
    $enc = New-Object Windows.Media.Imaging.JpegBitmapEncoder
    $enc.QualityLevel = $JpegQuality
    $enc.Frames.Add([Windows.Media.Imaging.BitmapFrame]::Create($frame))
    $out = [IO.File]::Create($dest)
    try { $enc.Save($out) } finally { $out.Close() }
  } finally { $in.Close(); Remove-Item $tmp }
}

$profileDir = Join-Path $env:TEMP 'birlik-pdf-edge-profile'
$utf8 = New-Object System.Text.UTF8Encoding($false)

foreach ($lang in $Langs) {
  $src = Join-Path $dist "$lang\catalogue\print\index.html"
  if (-not (Test-Path $src)) { throw "Missing $src - run npm run build first" }
  $html = [IO.File]::ReadAllText($src)

  # Replace every optimizer image with a local JPEG copy
  $map = @{}
  foreach ($m in [regex]::Matches($html, 'src="(https://www\.birlik-insaat\.com/_vercel/image\?[^"]+)"')) {
    $raw = $m.Groups[1].Value
    if ($map.ContainsKey($raw)) { continue }
    $url = $raw.Replace('&amp;', '&')
    $hash = [BitConverter]::ToString([Security.Cryptography.MD5]::Create().ComputeHash([Text.Encoding]::UTF8.GetBytes($url))).Replace('-', '').Substring(0, 12)
    Convert-ToJpeg $url (Join-Path $imgDir "$hash.jpg")
    $map[$raw] = "/pdf-img/$hash.jpg"
  }
  foreach ($k in $map.Keys) { $html = $html.Replace($k, $map[$k]) }
  # Static copy: no app script (prevents React from swapping the images back)
  $html = [regex]::Replace($html, '<script type="module"[^>]*></script>', '')
  $html = [regex]::Replace($html, '<link rel="modulepreload"[^>]*>', '')
  $pdfPage = Join-Path $dist "$lang\catalogue\print-pdf"
  New-Item -ItemType Directory -Force $pdfPage | Out-Null
  [IO.File]::WriteAllText((Join-Path $pdfPage 'index.html'), $html, $utf8)

  $out = Join-Path $outDir "birlik-catalogue-$lang.pdf"
  if (Test-Path $out) { Remove-Item $out }
  $url = "$BaseUrl/$lang/catalogue/print-pdf/"
  Write-Host "Printing $url ($($map.Count) photos)"
  $edgeArgs = @(
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-pdf-header-footer',
    "--user-data-dir=$profileDir", '--virtual-time-budget=20000',
    "--print-to-pdf=$out", $url
  )
  $p = Start-Process -FilePath $edge -ArgumentList $edgeArgs -PassThru -Wait -WindowStyle Hidden
  if (-not (Test-Path $out)) { throw "PDF not created for $lang (exit $($p.ExitCode))" }
  Write-Host ('  -> {0} ({1:N1} MB)' -f $out, ((Get-Item $out).Length / 1MB))
}

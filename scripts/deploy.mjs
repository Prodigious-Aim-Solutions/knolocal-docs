#!/usr/bin/env node
// Deploys the contents of build/ to S3 using AWS SDK v3 — ported from
// knolocal/scripts/deploy.mjs's shape (knolocal-docs#2), DIST_DIR adjusted
// from Vite's `dist` to Docusaurus's own `build` output directory.
//
// Cache-control logic differs from both sibling ports, by necessity:
// knolocal (a Vite SPA) has one single index.html and caches everything
// else forever; roadside-emporium-site (Astro, directory-style routing)
// caches everything except any route's own index.html. Docusaurus here
// does neither — with `trailingSlash: false` it emits flat, UNHASHED
// per-page files (intro.html, signing-up.html, etc., confirmed directly
// via a real build — there is no intro/index.html), so "is this an
// index.html" isn't the right question at all. The only content-hashed
// output is everything under assets/ (styles.<hash>.css, main.<hash>.js,
// etc., also confirmed directly) — that's what's safe to cache forever.
// Every unhashed file (every page .html, sitemap.xml, .nojekyll,
// img/favicon.ico) must be no-cache, since its URL doesn't change when a
// new deploy changes its content.
//
// Required env vars:
//   AWS_KNO_ACCESS_KEY_ID      reused from knolocal's own IAM credentials
//   AWS_KNO_SECRET_ACCESS_KEY  (by the same choice roadside-emporium-site
//                              made — not a dedicated IAM user per repo)
//   S3_BUCKET                  no default — set as this repo's own GitHub
//                              Actions repository variable, same pattern
//                              as roadside-emporium-site's vars.S3_BUCKET
//
// Optional env vars (default shown):
//   S3_REGION   ca-central-1

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative, extname } from 'path'

const BUCKET = process.env.S3_BUCKET
const REGION = process.env.S3_REGION ?? 'ca-central-1'
const DIST_DIR = 'build'

if (!BUCKET) {
  console.error('Missing required env var: S3_BUCKET')
  process.exit(1)
}

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.xml':  'application/xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.webp': 'image/webp',
  '.txt':  'text/plain',
}

function walk(dir) {
  const files = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      files.push(...walk(full))
    } else {
      files.push(full)
    }
  }
  return files
}

const client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_KNO_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_KNO_SECRET_ACCESS_KEY,
  },
})

const files = walk(DIST_DIR)
console.log(`Deploying ${files.length} files to s3://${BUCKET} (${REGION})\n`)

for (const file of files) {
  const key = relative(DIST_DIR, file).replace(/\\/g, '/')
  const ext = extname(file)
  const contentType = CONTENT_TYPES[ext] ?? 'application/octet-stream'

  const cacheControl = key.startsWith('assets/')
    ? 'public, max-age=31536000, immutable'
    : 'no-cache, no-store, must-revalidate'

  await client.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: readFileSync(file),
    ContentType: contentType,
    CacheControl: cacheControl,
  }))

  console.log(`  ✓ ${key}`)
}

console.log(`\nDone — deployed ${files.length} files.`)

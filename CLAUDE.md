# knolocal-docs — CLAUDE.md

The Roadside Emporium Help Center: end-user/vendor how-to docs plus the
legal pages (Terms of Service, Privacy Policy, Vendor Listing Agreement). A
separate repo from the main app ([`knolocal`](https://github.com/Prodigious-Aim-Solutions/knolocal))
so its release cadence doesn't ride along with app releases. Scaffolded as
a spike tracked in `knolocal#287` — read that issue for the full rationale
and plan before making structural changes here.

---

## Naming — read this before writing any page content

`knolocal` and `knolocal-docs` are **repo/codebase names only** — internal
project identifiers, never shown to a real user. The product itself is
branded **The Roadside Emporium**. Confirmed directly in the main app's own
code: `TopBar.tsx`'s logo text reads "The Roadside Emporium", `DisputeModal.tsx`
refers to "The Roadside Emporium team", and the app's support address is
`contact@theroadsideemporium.com` — "Knolocal" never appears as the brand
anywhere a user sees it in the app itself.

**Rule:** every page title, nav/footer label, heading, and sentence of body
copy in this site says "The Roadside Emporium," never "Knolocal." Keep
"knolocal"/"knolocal-docs" only where they're literal identifiers that
aren't prose — the repo name, the npm package name, a cross-repo issue
reference like `knolocal#287`, a URL path segment. When in doubt about
whether a given mention is prose or an identifier, prose almost always
wants the real brand name.

This mistake already shipped once, in this repo's own initial scaffold
(title, tagline, nav, footer, and the intro page all said "Knolocal") —
caught and fixed after the fact, not before. Don't repeat it when adding
new pages.

---

## Stack

- **Framework:** [Docusaurus](https://docusaurus.io/) 3.x (classic preset), TypeScript.
- **Content:** Markdown/MDX under `docs/`, one file per article. Sidebar is auto-generated from that folder's structure (`sidebars.ts`).
- **No blog** — `blog: false` in `docusaurus.config.ts`. This site is the help/legal doc set only; don't re-enable it without a real reason.
- **routeBasePath** is `/` (not Docusaurus's default `/docs/`) — this is a docs-only site, so articles live at the site root (`/intro`, not `/docs/intro`).
- **Light-only, no dark mode** (`colorMode.disableSwitch` in `docusaurus.config.ts`) — an explicit decision (knolocal-docs#15), not an oversight: the main app has a single fixed "Weathered Wood" palette with no dark variant to match.

### `future: { v4: false }` — do not re-enable without testing admonitions first

This is intentionally **off**, unlike a fresh Docusaurus 3.10+ scaffold's default of `true`. With it on (which turns on `fasterByDefault` — Docusaurus's experimental Rspack/SWC build pipeline), `:::type Title ... :::` admonition directives silently render as literal text instead of styled callouts, with no build error or warning. Confirmed directly by isolated testing during knolocal-docs#15: toggling only this flag, nothing else, reproduces and fixes it. Every admonition in this repo (the three legal pages' draft notices, all 19 media placeholders across the how-to articles) depends on this staying off. If you ever want Faster's build-speed benefits, re-test every admonition on the built site first — a successful `npm run build` does **not** catch this; only looking at the actual rendered HTML (or a screenshot) does.

---

## Deploy

Two targets, deliberately different from each other (see `knolocal#287` for why):

- **Staging/review** — GitHub Pages, live at https://prodigious-aim-solutions.github.io/knolocal-docs/. `.github/workflows/deploy-pages.yml` builds and publishes to the `gh-pages` branch on every push to `main` (`peaceiris/actions-gh-pages`, matching the `deploymentBranch: 'gh-pages'` already set in `docusaurus.config.ts`). Zero AWS infra. **This repo must stay public** — GitHub Pages on a private repo needs a paid GitHub plan, and this project intentionally doesn't pay for that just to keep docs private.
- **Production** — S3, code side landed (knolocal-docs#2): `scripts/deploy.mjs` (plain AWS SDK v3, `PutObjectCommand`s every file in `build/`) + `.github/workflows/deploy.yml`, triggered on `v*` tags. The bucket exists and `AWS_KNO_ACCESS_KEY_ID`/`AWS_KNO_SECRET_ACCESS_KEY` (reused from `knolocal`'s own IAM credentials, confirmed to already cover this bucket — no dedicated IAM user needed) are set as this repo's own GitHub Actions secrets.
  - **Cache-control logic is genuinely different from both sibling ports**, not just adjusted paths: `knolocal` (a Vite SPA) has a single `index.html` and caches everything else forever; `roadside-emporium-site` (Astro, directory routing) caches everything except any route's own `index.html`. Docusaurus here does neither — with `trailingSlash: false` it emits **flat, unhashed per-page files** (`intro.html`, `signing-up.html`, etc. — confirmed directly via a real build, there's no `intro/index.html`), so "is this an index.html" isn't even the right question. The only content-hashed output is everything under `assets/` (confirmed directly: `styles.<hash>.css`, `main.<hash>.js`, etc.) — `scripts/deploy.mjs` caches far-future only for `key.startsWith('assets/')` and no-caches everything else (every page `.html`, `sitemap.xml`, `.nojekyll`, `img/favicon.ico`).
  - Bucket name is a repo Actions **variable** (`vars.S3_BUCKET`), not hardcoded or a secret — same reasoning as `roadside-emporium-site`'s own `deploy.yml`.
  - **Still outstanding**: the CloudFront distribution + OAC + ACM cert for `help.theroadsideemporium.com` (see domain decision below) and the DNS record once that exists — none of that is wired up yet, only the S3 push itself.
  - `npm install` surfaced 28 pre-existing vulnerabilities (3 high/15 critical) entirely within Docusaurus's own build toolchain (`@docusaurus/core`'s `webpack-dev-server`/`tinypool`/`body-parser` chain) — confirmed unrelated to `@aws-sdk/client-s3`, and all dev/build-time-only deps, not runtime code served to users. Not fixed here (would mean a Docusaurus major-version bump, out of scope for a deploy-wiring ticket) — worth its own ticket if it needs addressing.

**Domain decided** (knolocal-docs#3): a dedicated subdomain, `help.theroadsideemporium.com` — not a path on the main site. `docusaurus.config.ts`'s `url`/`baseUrl` branch on `DEPLOY_TARGET` the same way `roadside-emporium-site`'s `astro.config.mjs` branches its own `site`/`base`: unset (local builds, and the eventual production build) gets the production shape (`https://help.theroadsideemporium.com`, `baseUrl: '/'`); `DEPLOY_TARGET=gh-pages` (set only by `deploy-pages.yml`'s build step) gets the GH Pages subpath shape. Since it's a dedicated subdomain rather than a path, this needs its own CloudFront distribution (+ OAC + ACM cert) once #2's bucket exists — not a second behavior on `roadside-emporium-site`'s distribution, which the path alternative would have required.

---

## Content status

All six how-to articles exist and are cross-linked to each other and from the `intro.mdx` index: Signing Up & Signing In, Finding Vendors & Markets, Listing & Claiming Your Business, Managing Your Listing, Resolving a Claim Dispute. They still carry 19 inline 📷 **Screenshot** / 🎥 **Video** placeholders (as Docusaurus `:::info` admonitions) — each notes exactly what to capture and why that medium; the shoot itself is `knolocal-docs#14`.

## Legal pages

Terms of Service (`terms-of-service.mdx`), Privacy Policy (`privacy-policy.mdx`), and Vendor Listing Agreement (`vendor-listing-agreement.mdx`) all exist, linked from the footer's "Legal" column and cross-linked to each other — each is a `:::danger` draft-placeholder notice plus a structural outline, **not real legal text**. Getting the actual text is tracked as its own ticket per page (`knolocal-docs#16`/`#17`/`#18`, not `#10`/`#11`/`#12` — those were the now-closed plumbing tickets) — explicitly a business/legal task, not an engineering one. `knolocal#284` (CASL/email consent) is a process ticket, not necessarily a page here — whether it needs one is `knolocal-docs#13`, still open.

---

## After making changes

1. Run `npm run build` (not just `npm start`) before pushing — `onBrokenLinks: 'throw'` means a bad internal link fails the build, not just a warning.
2. Run `npm run typecheck`.
3. Don't push directly to `main` once the repo has real content reviewers care about — open a PR, same convention as `knolocal`. (The very first scaffold commit was pushed directly to bootstrap an empty repo; that's a one-time exception, not the ongoing pattern.)

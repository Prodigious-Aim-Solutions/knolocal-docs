# knolocal-docs — CLAUDE.md

The Knolocal Help Center: end-user/vendor how-to docs plus the legal pages
(Terms of Service, Privacy Policy, Vendor Listing Agreement). A separate
repo from the main app ([`knolocal`](https://github.com/Prodigious-Aim-Solutions/knolocal))
so its release cadence doesn't ride along with app releases. Scaffolded as
a spike tracked in `knolocal#287` — read that issue for the full rationale
and plan before making structural changes here.

---

## Stack

- **Framework:** [Docusaurus](https://docusaurus.io/) 3.x (classic preset), TypeScript.
- **Content:** Markdown/MDX under `docs/`, one file per article. Sidebar is auto-generated from that folder's structure (`sidebars.ts`).
- **No blog** — `blog: false` in `docusaurus.config.ts`. This site is the help/legal doc set only; don't re-enable it without a real reason.
- **routeBasePath** is `/` (not Docusaurus's default `/docs/`) — this is a docs-only site, so articles live at the site root (`/intro`, not `/docs/intro`).

---

## Deploy

Two targets, deliberately different from each other (see `knolocal#287` for why):

- **Staging/review** — GitHub Pages, via Docusaurus's own built-in support (`deploymentBranch: 'gh-pages'` in `docusaurus.config.ts`, the `npm run deploy` script). Zero AWS infra. **This repo must stay public** — GitHub Pages on a private repo needs a paid GitHub plan, and this project intentionally doesn't pay for that just to keep docs private.
- **Production** — an S3 bucket, deployed the same way `knolocal` itself is: a plain AWS SDK v3 script (not a Vite/webpack plugin) that walks the build output and `PutObjectCommand`s every file, with `index.html` set `no-cache` and every hashed asset set far-future-cacheable. Port `knolocal/scripts/deploy.mjs` + its `.github/workflows/deploy.yml` shape here once the bucket/credentials exist — don't invent a different deploy mechanism for consistency's sake with the sibling repo.

Both are tracked as not-yet-wired-up in `knolocal#287` and this repo's own issues — check there before assuming either pipeline exists.

---

## Content status

Everything under `docs/` beyond `intro.mdx` is still to be written. The real article content was drafted in a Claude Doc ("Knolocal Help Center") during the planning conversation that produced `knolocal#287` — ask whoever ran that spike for the link rather than redrafting from scratch. Each article (and the legal pages, and the media/screenshot pass) is its own issue in this repo once filed; `intro.mdx`'s own "Under construction" note points here.

Known content debt carried over from that draft, worth preserving when porting it in:
- 19 inline 📷 **Screenshot** / 🎥 **Video** placeholders across the six how-to articles, each noting exactly what to capture and whether a still or a short clip is the better fit (motion/interaction → video; a static screen/state → screenshot).
- A consolidated shot list of all 19, for whoever ends up doing the capture pass in one sitting rather than hunting through six pages.

## Legal pages

Terms of Service / Privacy Policy / Vendor Listing Agreement are tracked in the main `knolocal` repo as `knolocal#282`/`#283`/`#285` — their actual legal text is explicitly **out of scope for an engineer to draft**; it needs real business/legal input. This repo's job is just the page/route plumbing once that text exists. `knolocal#284` (CASL/email consent) is a process ticket, not necessarily a page here — whether it needs one is still an open question (see `knolocal#287`).

---

## After making changes

1. Run `npm run build` (not just `npm start`) before pushing — `onBrokenLinks: 'throw'` means a bad internal link fails the build, not just a warning.
2. Run `npm run typecheck`.
3. Don't push directly to `main` once the repo has real content reviewers care about — open a PR, same convention as `knolocal`. (The very first scaffold commit was pushed directly to bootstrap an empty repo; that's a one-time exception, not the ongoing pattern.)

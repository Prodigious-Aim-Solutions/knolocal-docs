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

---

## Deploy

Two targets, deliberately different from each other (see `knolocal#287` for why):

- **Staging/review** — GitHub Pages, live at https://prodigious-aim-solutions.github.io/knolocal-docs/. `.github/workflows/deploy-pages.yml` builds and publishes to the `gh-pages` branch on every push to `main` (`peaceiris/actions-gh-pages`, matching the `deploymentBranch: 'gh-pages'` already set in `docusaurus.config.ts`). Zero AWS infra. **This repo must stay public** — GitHub Pages on a private repo needs a paid GitHub plan, and this project intentionally doesn't pay for that just to keep docs private.
- **Production** — an S3 bucket, deployed the same way `knolocal` itself is: a plain AWS SDK v3 script (not a Vite/webpack plugin) that walks the build output and `PutObjectCommand`s every file, with `index.html` set `no-cache` and every hashed asset set far-future-cacheable. Port `knolocal/scripts/deploy.mjs` + its `.github/workflows/deploy.yml` shape here once the bucket/credentials exist (knolocal-docs#2) — don't invent a different deploy mechanism for consistency's sake with the sibling repo.

Production is still not wired up — check `knolocal-docs#2` and `#3` (domain/path decision) before assuming it exists.

---

## Content status

Everything under `docs/` beyond `intro.mdx` is still to be written. The real article content was drafted during the planning conversation that produced `knolocal#287`, and is already embedded verbatim in this repo's own issues #4–#9 — pull it from there (it's already been corrected to say "The Roadside Emporium," not "Knolocal") rather than redrafting from scratch. Each article (and the legal pages, and the media/screenshot pass) is its own issue in this repo; `intro.mdx`'s own "Under construction" note points here.

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

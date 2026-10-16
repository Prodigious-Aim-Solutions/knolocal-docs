# The Roadside Emporium Help Center

The Roadside Emporium's help docs — how to sign up, find vendors and
markets, list or claim a business, and manage it once it's yours — plus the
legal pages (Terms of Service, Privacy Policy, Vendor Listing Agreement).
Built with [Docusaurus](https://docusaurus.io/).

> **Naming:** `knolocal`/`knolocal-docs` are this project's repo/codebase
> names only. The product itself is branded **The Roadside Emporium** to
> users — that's what belongs in page titles, headings, and body copy. See
> `CLAUDE.md` for the full note.

Scaffolded as a spike tracked in
[`knolocal#287`](https://github.com/Prodigious-Aim-Solutions/knolocal/issues/287).
See this repo's own issues for what's actually written vs. still a
placeholder.

## Local development

```bash
npm install
npm start
```

Starts a dev server at `http://localhost:3000/` with live reload.

## Build

```bash
npm run build
```

Generates static files into `build/`.

## Deploying

- **Staging/review** — GitHub Pages, live at
  https://prodigious-aim-solutions.github.io/knolocal-docs/, rebuilt and
  republished by `.github/workflows/deploy-pages.yml` on every push to
  `main`. No AWS credentials needed. The repo must stay **public** for
  this — GitHub Pages on a private repo needs a paid GitHub plan.
- **Production** — an S3 bucket, deployed the same way
  [`knolocal`](https://github.com/Prodigious-Aim-Solutions/knolocal) itself
  is (a plain `scripts/deploy.mjs` AWS SDK v3 script, not a Vite/webpack
  plugin). Not wired up yet — see `knolocal-docs#2`.

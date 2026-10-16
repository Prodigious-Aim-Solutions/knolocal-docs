# Knolocal Help Center

The Knolocal help docs — how to sign up, find vendors and markets, list or
claim a business, and manage it once it's yours — plus the legal pages
(Terms of Service, Privacy Policy, Vendor Listing Agreement). Built with
[Docusaurus](https://docusaurus.io/).

Scaffolded as a spike tracked in
[`knolocal#287`](https://github.com/Prodigious-Aim-Solutions/knolocal/issues/287).
See that issue (and this repo's own issues, once filed) for what's actually
written vs. still a placeholder.

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

- **Staging/review** — GitHub Pages, deployed from `main` (see `knolocal#287`
  for the planned CI wiring). No AWS credentials needed. The repo must stay
  **public** for this — GitHub Pages on a private repo needs a paid GitHub
  plan.
- **Production** — an S3 bucket, deployed the same way
  [`knolocal`](https://github.com/Prodigious-Aim-Solutions/knolocal) itself
  is (a plain `scripts/deploy.mjs` AWS SDK v3 script, not a Vite/webpack
  plugin). Not wired up yet — see `knolocal#287`.

import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'The Roadside Emporium Help Center',
  tagline: 'How to use The Roadside Emporium — finding vendors and markets, listing your business, and managing it once it’s yours.',
  favicon: 'img/favicon.ico',

  // `v4: true` (the scaffold's original default) turns on `fasterByDefault`
  // — Docusaurus's experimental Rspack/SWC build pipeline — which silently
  // broke `:::type Title ::: ` admonition directives: they rendered as
  // literal text instead of styled callouts, with no build warning or
  // error. Confirmed directly (knolocal-docs#15): disabling v4 alone fixes
  // it, with nothing else about the config changed. Every admonition in
  // this repo (the three legal pages' draft notices, the 19 media
  // placeholders across the how-to articles) was affected until this was
  // caught by a visual check. Leave this false until Faster's MDX handling
  // is verified fixed upstream — don't re-enable without re-testing
  // admonitions specifically, not just confirming the build succeeds.
  future: {
    v4: false,
  },

  // GitHub Pages staging URL (knolocal#287) — production may move to a
  // theroadsideemporium.com subdomain/path once that's decided (see
  // knolocal-docs#3); update url/baseUrl then.
  url: 'https://prodigious-aim-solutions.github.io',
  baseUrl: '/knolocal-docs/',

  // GitHub pages deployment config.
  organizationName: 'Prodigious-Aim-Solutions',
  projectName: 'knolocal-docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl:
            'https://github.com/Prodigious-Aim-Solutions/knolocal-docs/tree/main/',
        },
        // No blog — this site is the help/legal doc set only (knolocal#287).
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // knolocal#15 decision: light-only, matching the main app's own fixed
    // "Weathered Wood" palette, which has no dark variant at all — a dark
    // mode toggle here would need an independent design pass this ticket
    // doesn't cover, so it's disabled rather than left to guess at one.
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'The Roadside Emporium Help Center',
      // No real logo art exists yet (knolocal-docs#15) — the Docusaurus
      // mascot placeholder was actively off-brand, so this is title-text
      // only until real brand art is commissioned (tracked separately).
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Help Center',
        },
        {
          href: 'https://github.com/Prodigious-Aim-Solutions/knolocal-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Help Center',
          items: [
            {
              label: 'Get started',
              to: '/intro',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Terms of Service',
              to: '/terms-of-service',
            },
            {
              label: 'Privacy Policy',
              to: '/privacy-policy',
            },
            {
              label: 'Vendor Listing Agreement',
              to: '/vendor-listing-agreement',
            },
          ],
        },
        {
          title: 'The Roadside Emporium',
          items: [
            {
              label: 'theroadsideemporium.com',
              href: 'https://theroadsideemporium.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Prodigious-Aim-Solutions/knolocal-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The Roadside Emporium. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

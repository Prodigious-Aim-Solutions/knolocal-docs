import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'The Roadside Emporium Help Center',
  tagline: 'How to use The Roadside Emporium — finding vendors and markets, listing your business, and managing it once it’s yours.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
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
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'The Roadside Emporium Help Center',
      logo: {
        alt: 'The Roadside Emporium Logo',
        src: 'img/logo.svg',
      },
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

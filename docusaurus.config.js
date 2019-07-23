/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: '板栗17的博客',
  tagline: 'The tagline of my site',
  url: 'https://www.banli17.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'banli17.com',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      links: [
        {to: 'docs/html/doc1', label: '前端必备', position: 'left'},
        {to: 'docs/patterns/patterns', label: '设计模式', position: 'left'},
        {to: 'docs/algo/index', label: '数据结构与算法', position: 'left'},
        {to: 'docs/database/mongo', label: '数据库', position: 'left'},
        {to: 'docs/linux/index', label: '服务器', position: 'left'},
        {to: 'docs/other/mac', label: '工具集', position: 'left'},
        {to: 'blog', label: '博客', position: 'left'},
        {
          to: 'docs/about',
          label: '关于',
          position: 'right',
        },
        {
          href: 'https://github.com/banli17',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: 'docs/html/doc1',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
          ],
        },
      ],
      logo: {
        alt: ' Open Source Logo',
        src: 'https://docusaurus.io/img/oss_logo.png',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: '板栗17的博客',
  tagline: '',
  url: 'https://www.banli17.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: '', // Usually your GitHub org/user name.
  projectName: '', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'banli17.com',
      logo: {
        alt: '板栗17的博客',
        src: 'img/logo.svg',
      },
      links: [{
          to: 'docs/f2e/html/index',
          label: '前端',
          position: 'left'
        },
        {
          to: 'docs/node/index',
          label: 'NodeJS',
          position: 'left'
        },
        {
          to: 'docs/patterns/index',
          label: '设计模式',
          position: 'left'
        },
        {
          to: 'docs/algo/index',
          label: '算法',
          position: 'left'
        },
        {
          to: 'docs/linux/index',
          label: '服务器',
          position: 'left'
        },
        {
          to: 'docs/base/h5',
          label: '计算机基础',
          position: 'left'
        },
        {
          to: 'docs/other/mac',
          label: '工具',
          position: 'left'
        },
        // {
        //   to: 'docs/demo/index',
        //   label: 'demo',
        //   position: 'left',
        // },
        {
          to: 'blog',
          label: '博客',
          position: 'right'
        },
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
    // footer: {
    // style: 'dark',
    // links: [
    //   {
    //     title: 'Docs',
    //     items: [
    //       {
    //         label: 'Docs',
    //         to: 'docs/html/doc1',
    //       },
    //     ],
    //   },
    //   {
    //     title: 'Community',
    //     items: [
    //       {
    //         label: 'Discord',
    //         href: 'https://discordapp.com/invite/docusaurus',
    //       },
    //     ],
    //   },
    //   {
    //     title: 'Social',
    //     items: [
    //       {
    //         label: 'Blog',
    //         to: 'blog',
    //       },
    //     ],
    //   },
    // ],
    // logo: {
    //   alt: ' Open Source Logo',
    //   src: 'https://docusaurus.io/img/oss_logo.png',
    // },
    // copyright: `Copyright © ${new Date().getFullYear()} banli17.com`,
    // },
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
  themes: ['@docusaurus/theme-classic', '@docusaurus/theme-live-codeblock'],
  // themeConfig: {
  //   prismTheme: require('prism-react-renderer/themes/nightOwl.js')
  // }
};
module.exports = {
  title: '前端笔记',
  lang: 'zh-CN',
  description: '这是我的前端笔记',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    lastUpdated: '最后更新时间 ',
    navbar: [
      // 嵌套 Group - 最大深度为 2
      {
        text: '目录',
        children: [
          {
            text: '前端必备',
            children: [
              { text: 'JavaScript', link: '/javascript/', },
              { text: 'Vue', link: '/vuejs/', },
              { text: 'Webpack', link: '/webpack/', },
              { text: 'React', link: '/reactjs/', },
              { text: 'NodeJS', link: '/nodejs/', },
              { text: '前端工程化', link: '/project/', },
              { text: 'web安全', link: '/safe/', },
              { text: '计算机通识', link: '/basic/', },
              { text: '网络知识', link: '/network/', },
              { text: '数据结构与算法', link: '/algo/', },
              { text: '前端测试', link: '/test/', },
              { text: '浏览器工作原理', link: '/browser/', },
              { text: '面试题', link: '/interview/', },
            ]
          },
          {
            text: '其它',
            children: [
              { text: 'MongoDB', link: '/mongodb/', },
              { text: 'Redis', link: '/redis/', },
              { text: 'Linux', link: '/linux/', },
              { text: 'Nginx', link: '/nginx/', },
            ],
          },
        ],
      },
      { text: 'github', link: 'https://github.com/banli17/learn', },
    ],
    sidebar: {
      '/project/': [
        {
          isGroup: true, text: '前端监控',
          children: [
            '/project/monitor/user-behavior.md',
            '/project/monitor/performance.md',
            '/project/monitor/error.md',
            '/project/monitor/report.md',
            '/project/monitor/sentry.md',
            '/project/monitor/ref.md',
          ],
        },
        {
          isGroup: true, text: '性能体系', children: [
            '/project/performance/',
          ],
        },
        {
          isGroup: true, text: '工具链', children: [
            '/project/toolchain/',
          ],
        },
      ],
      '/algo/': [
        {
          isGroup: true, text: '数据结构与算法',
          children: [
            '/algo/sort.md',
          ],
        },
      ],
      '/test/': [
        {
          isGroup: true, text: '前端测试',
          children: [
            '/test/index.md',
            '/test/jest.md',
          ],
        },
      ],
      '/network/': [
        {
          isGroup: true, text: '网络知识', children: [
            '/network/',
            '/network/http.md',
            '/network/https.md',
            '/network/http2.md',
          ],
        },
      ],
      '/basic/': [
        {
          isGroup: true, text: '计算机通识', children: [
            '/basic/',
            '/basic/encode.md',
            '/basic/ieee754.md'
          ],
        },
      ],
      '/browser/': [
        {
          isGroup: true,
          text: '浏览器工作原理',
          children: [
            '/browser/framework.md',
            '/browser/render.md',
          ],
        },
        {
          isGroup: true, text: 'js执行机制', children: [
            '/browser/jswork.md',
          ],
        },
        {
          isGroup: true, text: 'V8工作原理', children: [
            '/browser/v8.md',
          ],
        },
        {
          isGroup: true, text: '页面循环系统', children: [
            '/browser/event.md',
          ],
        },
        {
          isGroup: true, text: '页面渲染', children: [
            '/browser/render.md',
          ],
        },
        {
          isGroup: true, text: '浏览器中的网络', children: [
            '/browser/render.md',
          ],
        },
        {
          isGroup: true, text: '浏览器安全', children: [
            '/browser/render.md',
          ],
        },
      ],

      '/javascript/': [
        {
          isGroup: true, text: 'JS基础', children: [
            '/javascript/',
            '/javascript/basic/exec.md',
            '/javascript/basic/about-this.md',
            '/javascript/basic/closure.md',
            '/javascript/basic/oop.md',
            '/javascript/basic/typeof.md',
            '/javascript/basic/type-covert.md',
            '/javascript/basic/async.md',
            '/javascript/basic/es6.md',
            '/javascript/basic/es7-plus.md',
            '/javascript/basic/regexp.md',
          ],
        },
        {
          isGroup: true, text: 'JS专题', children: [
            '/javascript/topic.md',
            '/javascript/topic/copy.md',
            '/javascript/topic/debounce.md',
            '/javascript/topic/function-program.md',
          ],
        },
      ],
      '/interview/': [
        {
          isGroup: true, text: '面试题', children: ['/interview/',],
        },
      ],
      '/vuejs/': [
        {
          isGroup: true,
          text: 'Vue笔记',
          sidebarDepth: 4,
          children: [
            '/vuejs/',
          ],
        },
        {
          isGroup: true,
          text: 'Vue原理 - 数据驱动',
          sidebarDepth: 4,
          children: [
            '/vuejs/vue-source/data-driven/intro.md',
            '/vuejs/vue-source/data-driven/new-vue.md',
          ],
        },
        {
          isGroup: true,
          text: 'Vue原理 - 模版编译',
          sidebarDepth: 4,
          children: [
            '/vuejs/vue-source/compiler/intro.md',
            '/vuejs/vue-source/compiler/parse.md',
            '/vuejs/vue-source/compiler/optimize.md',
            '/vuejs/vue-source/compiler/generate.md',
            '/vuejs/vue-source/compiler/ref.md',
          ],
        },
      ],
      '/safe/': [
        {
          isGroup: true,
          text: 'web安全',
          children: [
            '/safe/',
            '/safe/csrf.md',
            '/safe/cookie.md',
            '/safe/clickjacking.md',
            '/safe/ddos.md',
            '/safe/http.md',
          ]
        },
      ],
      '/reactjs/': [
        {
          isGroup: true,
          text: 'React笔记',
          children: [
            '/reactjs/',
            '/reactjs/hooks.md',
          ],
        },
        {
          isGroup: true,
          text: 'React-Router',
          children: [
            '/reactjs/router.md',
          ],
        },
        {
          isGroup: true,
          text: 'Redux',
          children: [
            '/reactjs/redux_1.md',
            '/reactjs/redux_2.md',
            '/reactjs/redux_middleware.md',
          ]
        },
      ],
      '/webpack/': [
        {
          isGroup: true,
          text: 'webpack笔记',
          children: [
            '/webpack/',
            '/webpack/bundle.md',
            '/webpack/ast.md',
            '/webpack/flow.md',
            '/webpack/hand.md',
          ],
        },
      ],
      '/nginx/': [
        {
          isGroup: true,
          text: 'nginx笔记',
          children: [
            '/nginx/'
          ],
        },
      ]
    },

  },
  markdown: {
    code: {
      lineNumbers: false
    }
  }
}

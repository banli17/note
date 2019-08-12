/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  docs: {
    Html: ['f2e/html/index'],
    Css: ['f2e/css/index'],
    Javascript: [
      'f2e/javascript/grammer',
      'f2e/javascript/type',
      'f2e/javascript/oop',
      'f2e/javascript/module',
      'f2e/javascript/async',
      'f2e/javascript/regexp',
    ],
    浏览器原理与API: [
      'f2e/browser/work',
      'f2e/browser/eventloop',
      'f2e/browser/event',
      'f2e/browser/fetch',
      'f2e/browser/storage',
      'f2e/browser/devtool',
      'f2e/browser/cache',
      'f2e/browser/v8',
    ],
    其它: [
      'f2e/monitor/index',
      'f2e/test/index',
      'f2e/safe/index',
      'f2e/performance/index',
      'f2e/webpack/basic/index',
      'f2e/webpack/principle/index',
      'f2e/react/index',
    ],
    vue: [
      'f2e/vue/index',
      'f2e/vue/origin',
    ]
    // ReactNative:[
    //   'f2e/react-native/android'
    // ]
  },
  nodejs: {
    nodejs: [
      'nodejs/util',
      'nodejs/test',
      'nodejs/async',
      'nodejs/safe',
    ]
  },
  patterns: {
    设计: [
      'patterns/index',
    ],
    "创建型模式(4)": [
      'patterns/factory',
      'patterns/singleton',
      'patterns/builder',
      'patterns/prototype',
    ],
    "构造型模式(7)": [
      'patterns/adapter',
      'patterns/bridge',
      'patterns/composite',
      'patterns/decorator',
      'patterns/facade',
      'patterns/flyweight',
      'patterns/proxy',
    ],
    "行为型模式(11)": [
      'patterns/interpreter',
      'patterns/visitor',
      'patterns/memento',
      'patterns/command',
      'patterns/template',
      'patterns/chain-of-responsibility',
      'patterns/iterator',
      'patterns/mediator',
      'patterns/strategy',
      'patterns/observer',
      'patterns/state',
    ]
  },
  algo: {
    数据结构: ['algo/index'],
    算法: ['algo/index']
  },
  src: {
    linux操作系统: [
      'linux/index',
      'linux/file',
      'linux/soft',
      'linux/service',
    ],
    nginx: [
      'nginx/index'
    ],
    数据库: ['database/mongo',
      'database/mysql',
      'database/redis'
    ]
  },
  base: {
    计算机基础: [
      'base/h5',
      'base/compute-combine'
    ],
    网络协议: [
      'base/net/tcp',
      'base/net/http'
    ]
  },
  tool: {
    工具: [
      'other/mac',
      'other/kindle-rss',
      'other/resource',
    ]
  },
  source: {
    jQuery源码: [
      'source/jquery/event',
    ]
  }
};
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('core-decorators')) :
  typeof define === 'function' && define.amd ? define(['core-decorators'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var oldArrayProtoMethods = Array.prototype; // 继承

  var arrayMethods = Object.create(oldArrayProtoMethods);
  var methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // console.log(method + '被调用了')
      var result = oldArrayProtoMethods[method].apply(this, args);
      var ob = this.__ob__;
      var inserted; // 表示数组新增的数据，也要做拦截

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
          break;
      }

      if (inserted) ob.observeArray(inserted); // 新增加的数据也要观测

      ob.dep.notify();
      return result;
    };
  });

  function proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[data][key];
      },
      set: function set(newValue) {
        vm[data][key] = newValue;
      }
    });
  }
  function defineProperty(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: false,
      value: value
    });
  } // 合并策略

  var strats = {};

  var defaultStrat = strats.data = function (parentVal, childVal) {
    if (childVal) {
      return childVal;
    }

    return parentVal;
  };

  strats.components = function (parentVal, childVal) {
    // 先找儿子，再找全局
    var res = Object.create(parentVal);

    if (childVal) {
      for (var key in childVal) {
        res[key] = childVal[key];
      }
    }

    return res;
  };

  function mergeHook(parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal);
      } else {
        return [childVal];
      }
    } else {
      return parentVal;
    }
  }

  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed'];
  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });
  function mergeOptions(parent, child) {
    var options = {}; // 父有

    for (var key in parent) {
      mergeField(key);
    } // 父没有，子有


    for (var _key in child) {
      if (!parent.hasOwnProperty(_key)) {
        mergeField(_key);
      }
    }

    function mergeField(key) {
      var strat = strats[key] || defaultStrat;
      console.log('-----', parent, child, key); // 如果是生命周期

      options[key] = strat(parent[key], child[key]);
    }

    return options;
  }
  var callbacks = [];
  var pending$1 = false;

  function flushCallbacks() {
    // callbacks.forEach(cb => cb())
    // callbacks = []
    while (callbacks.length) {
      var cb = callbacks.pop();
      cb();
    }

    pending$1 = false;
  }

  var timerFunc;

  if (Promise) {
    timerFunc = function timerFunc() {
      Promise.resolve().then(flushCallbacks);
    };
  } else if (MutationObserver) {
    var observer = new MutationObserver(flushCallbacks);
    var textNode = document.createTextNode(1);
    observer.observe(textNode, {
      characterData: true
    });

    timerFunc = function timerFunc() {
      textNode.textContent = 2;
    };
  } else if (setImmediate) {
    setImmediate(flushCallbacks);
  } else {
    setTimeout(flushCallbacks);
  }

  function nextTick(cb) {
    console.log('---', cb);
    callbacks.push(cb);

    if (!pending$1) {
      timerFunc();
      pending$1 = true;
    }
  }

  function makeMap(str) {
    var mapping = {};
    str.split(',').map(function (item) {
      mapping[item] = true;
    });
    return function (key) {
      return mapping[key];
    };
  } // 是否是原生标签


  var isReservedTag = makeMap("a,div,img,text,span,p,button,ul,li,html,body,input,textarea,select");

  // 发布订阅模式
  var id$1 = 0; // 每个属性 的 id 相同，防止 {{a.x}} 多次使用时，重复更新

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.subs = [];
      this.id = id$1++;
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        if (Dep.target) {
          Dep.target.addDep(this);
        }
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        console.log('this.subs, ', this.subs);
        this.subs.forEach(function (sub) {
          sub.update();
        });
      }
    }]);

    return Dep;
  }();

  Dep.target = null;
  var stack = [];
  function pushTarget(watcher) {
    Dep.target = watcher;
    stack.push(watcher); // 可能有 属性watcher 或渲染watcher
  }
  function popTarget() {
    stack.pop();
    Dep.target = stack[stack.length - 1];
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // 1. 挂 dep，用于数组的更新，通过 dep 可以找到数组的 watcher
      // 2. 对象的 Vue.$set 方法也要用到
      this.dep = new Dep(); // 这里给 value 增加 __ob__ 但是不能被枚举，否则会死循环
      // 另外 array 里新数据 监测也要用到 observeArray 方法

      defineProperty(value, '__ob__', this); // 使用 defineProperty 重写属性
      // console.log(value)

      if (Array.isArray(value)) {
        // 如果是数组，就不要对索引进行 definePropery 了，为了性能
        value.__proto__ = arrayMethods;
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(value) {
        value.forEach(function (item) {
          observe(item);
        });
      }
    }, {
      key: "walk",
      value: function walk(value) {
        Object.keys(value).forEach(function (key) {
          defineReactive(value, key, value[key]);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    var childDep = observe(value);
    var dep = new Dep();
    Object.defineProperty(data, key, {
      get: function get() {
        if (Dep.target) {
          dep.depend(); // 说明走渲染了

          if (childDep) {
            childDep.dep.depend(); // 数组 depend
          }
        } // console.log('取值了')


        return value;
      },
      set: function set(newValue) {
        if (value === newValue) return; // 如果是重写对象

        observe(newValue); // console.log('设置了值')

        value = newValue; // 这里 value 是个闭包

        dep.notify();
      }
    });
  }

  function observe(data) {
    // console.log('observe', data)
    if (_typeof(data) !== 'object' || data === null) {
      // console.error('data 必须是对象或函数')
      return;
    } // 有 __ob__ 表示被拦截了的


    if (data.__ob__ instanceof Observer) {
      return data;
    }

    return new Observer(data);
  }

  var id = 0; // watcher 的id

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, exprOrFn, cb, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.exprOrFn = exprOrFn;
      this.cb = cb;
      this.options = options;
      this.user = options.user; // 用户写的 watcher
      // 渲染 watcher

      this.isWatcher = options === true;
      this.lazy = options.lazy;
      this.dirty = this.lazy; // 取值时是否执行用户

      this.id = id++;
      this.deps = [];
      this.depsId = new Set();

      if (typeof exprOrFn === 'function') {
        this.getter = exprOrFn;
      } else {
        // 用户写的 watcher
        this.getter = function () {
          var path = exprOrFn.split('.');
          var obj = vm;

          for (var i = 0; i < path.length; i++) {
            obj = obj[path[i]];
          } // 获取观测对象的值


          return obj;
        };
      } // 计算属性，默认不执行


      this.value = this.lazy ? void 0 : this.get(); // 只有实例化时，才有 getter
    }

    _createClass(Watcher, [{
      key: "addDep",
      value: function addDep(dep) {
        var id = dep.id;

        if (!this.depsId.has(id)) {
          this.deps.push(dep);
          this.depsId.add(id);
          dep.addSub(this); // console.log(dep)
        }
      }
    }, {
      key: "get",
      value: function get() {
        console.log('update');
        pushTarget(this);
        var result = this.getter.call(this.vm);
        popTarget();
        return result;
      }
    }, {
      key: "run",
      value: function run() {
        var newValue = this.get();
        var oldValue = this.value;

        if (this.user) {
          this.cb.call(this.vm, newValue, oldValue);
        } // this.get()

      }
    }, {
      key: "update",
      value: function update() {
        // 计算属性，只需要 dirty = true，不需要更新值，取值是会自动更新
        if (this.lazy) {
          this.dirty = true;
          return;
        } // this.get()  // 重新渲染


        queueWatcher(this); // 暂存队列后异步更新
      }
    }, {
      key: "evaluate",
      value: function evaluate() {
        // get() 求值时，会记住计算属性的 watcher
        this.value = this.get();
        this.dirty = false; // 取过值了，不再重新取值
      }
    }, {
      key: "depend",
      value: function depend() {
        // 遍历 dep，将渲染 watcher 放进行
        // for (let i = 0; i < this.deps.length; i++) {
        //     this.deps[i].depend()
        // }
        var i = this.deps.length;

        while (i--) {
          this.deps[i].depend();
        }
      }
    }]);

    return Watcher;
  }();

  var queue = [];
  var has = {};
  var pending = false;

  function flushSchedulerQueue() {
    queue.forEach(function (watcher) {
      watcher.run();
    });
    queue = [];
    has = {};
    pending = false;
  }

  function queueWatcher(watcher) {
    var id = watcher.id;

    if (has[id] == null) {
      queue.push(watcher); // 组件只更新一次

      has[id] = true;

      if (!pending) {
        watcher.vm.$nextTick(flushSchedulerQueue); // setTimeout(() => {
        //     queue.forEach(watcher => watcher.run())
        //     queue = []
        //     has = {}
        //     pending = false
        // }, 0)

        pending = true;
      }
    }
  }

  function initState(vm) {
    console.log(vm);
    var opts = vm.$options;
    if (opts.props) ;
    if (opts.methods) ;
    if (opts.data) initData(vm);
    if (opts.computed) initComputed(vm);
    if (opts.watch) initWatch(vm);
  }

  function initData(vm) {
    var data = vm.$options.data;
    console.log('initData', vm); // data 可能是对象 或函数

    data = typeof data === 'function' ? data.call(vm) : data;
    vm._data = data; // 代理

    for (var key in data) {
      proxy(vm, '_data', key);
    } // 将data变为响应式


    observe(data);
    console.log(vm._data.a);
  }

  function initComputed(vm) {
    var watcher = vm._computedWatchers = {};
    var computed = vm.$options.computed;
    console.log(computed);

    for (var key in computed) {
      var userDef = computed[key];
      var getter = typeof userDef === 'function' ? userDef : userDef.get; // 懒 watcher，lazy 就是计算属性，依赖收集
      // 每个 computed 里的属性都有一个 watcher

      watcher[key] = new Watcher(vm, getter, function () {}, {
        lazy: true
      }); // 将computed 的 key 全挂到 vm 上

      defineComputed(vm, key, userDef);
    }
  }

  function defineComputed(vm, key, userDef) {
    var sharedPropertyDefinition = {
      enumerable: true,
      configurable: true,
      get: function get() {},
      set: function set() {}
    };

    if (typeof userDef === 'function') {
      sharedPropertyDefinition.get = createComputedGetter(key);
    } else {
      sharedPropertyDefinition.get = createComputedGetter(key);
      sharedPropertyDefinition.set = userDef.set;
    }

    Object.defineProperty(vm, key, sharedPropertyDefinition);
  } // 计算属性的缓存


  function createComputedGetter(key) {
    return function () {
      // 计算属性的 watcher
      var watcher = this._computedWatchers[key];

      if (watcher) {
        if (watcher.dirty) {
          // 计算属性求值
          watcher.evaluate();
        } // 如果 Dep.target 还有值，就也收集


        if (Dep.target) {
          console.log('gggggg');
          watcher.depend();
        }

        return watcher.value;
      }
    };
  }

  function initWatch(vm) {
    var watch = vm.$options.watch;

    var _loop = function _loop(key) {
      var handler = watch[key];

      if (Array.isArray(handler)) {
        // 数组
        handler.forEach(function (handle) {
          createWatcher(vm, key, handle);
        });
      } else {
        createWatcher(vm, key, handler); // 对象 字符串 函数
      }
    };

    for (var key in watch) {
      _loop(key);
    }
  } // key 可以是一个函数，是执行后的结果
  // options 可以标记watcher是用户watcher


  function createWatcher(vm, exprOrFn, handler, options) {
    if (_typeof(handler) === "object") {
      options = handler; // {immediate, deep ,sync}

      handler = handler.handler;
    }

    if (typeof handler === 'string') {
      handler = vm[handler];
    }

    return vm.$watch(exprOrFn, handler, options);
  }

  function stateMixin(Vue) {
    Vue.prototype.$nextTick = function (cb) {
      nextTick(cb);
    };

    Vue.prototype.$watch = function (exprOrFn, handler) {
      new Watcher(this, exprOrFn, handler, {
        user: true
      });
    };
  }

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 匹配标签名

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); // 匹配结束  </my:xx>

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 标签开始

  var startTagClose = /^\s*(\/?)>/; // 标签关闭      >   />

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配标签结尾 </div>

  function parseHTML(html) {
    var root;
    var currentParent;
    var stack = []; // 用于检查 标签嵌套是否正确

    function start(tagName, attrs) {
      var element = createASTElement(tagName, attrs);

      if (!root) {
        root = element;
      }

      currentParent = element;
      stack.push(element); // console.log(tagName, attrs, `-–––${tagName}开始-------`)
    }

    function end(tagName) {
      // console.log(tagName, `-–––${tagName}结束-------`)
      var element = stack.pop();
      currentParent = stack[stack.length - 1];

      if (currentParent) {
        element.parent = currentParent;
        currentParent.children.push(element);
      }
    }

    function chars(text) {
      text = text.trim();

      if (text) {
        currentParent.children.push({
          type: 3,
          text: text
        });
      } // console.log(text, '------文本------')

    }

    function createASTElement(tagName, attrs) {
      return {
        tag: tagName,
        type: 1,
        children: [],
        attrs: attrs,
        parent: null
      };
    }

    function advance(n) {
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen); // console.log('start', start)

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length); // 删除匹配到的字符

        var _end; // 如果没有匹配到结束标签


        while (!(_end = html.match(startTagClose))) {
          var attrs = html.match(attribute);
          match.attrs.push({
            name: attrs[1],
            value: attrs[3]
          });
          advance(attrs[0].length);
        }

        if (_end) {
          // console.log(match)
          advance(_end[0].length);
          return match;
        }
      }
    }

    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd === 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }

      var text = void 0;

      if (textEnd > 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text);
      }
    }

    return root;
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

  function genProps(attrs) {
    var str = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i]; // name,value

      if (attr.name === 'style') {
        (function () {
          var obj = {};
          attr.value.split(';').forEach(function (item) {
            var _item$split = item.split(':'),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            obj[key] = value;
          });
          attr.value = obj; // {style:{color:red}}
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ","); // {a:'aaa',a:1,b:2,}
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function genChildren(el) {
    var children = el.children;

    if (children) {
      return children.map(function (child) {
        return gen(child);
      }).join(',');
    }
  }

  function gen(node) {
    // 区分是元素 还是文本
    if (node.type == 1) {
      return generate(node);
    } else {
      //文本 逻辑不能用 _c来处理
      // 有{{}} 普通文本  混合文本 {{aa}} aaa {{bbb}} ccc
      var text = node.text;

      if (defaultTagRE.test(text)) {
        // _v(_s(name) + 'aa' + _s(age) + '哈哈'）
        var tokens = [];
        var match;
        var index = 0;
        var lastIndex = defaultTagRE.lastIndex = 0;

        while (match = defaultTagRE.exec(text)) {
          // aa {{ age }} haha 
          index = match.index;

          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }

          tokens.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length;
        }

        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }

        return "_v(".concat(tokens.join('+'), ")"); // 是带有{{}}
      } else {
        return "_v(".concat(JSON.stringify(text), ")");
      }
    }
  }

  function generate(el) {
    // console.log(el); // 转换成render代码
    var children = genChildren(el);
    var code = "_c('".concat(el.tag, "',").concat(el.attrs.length ? genProps(el.attrs) : 'undefined', " ").concat(children ? ',' + children : '', ")"); // => js代码 html=> js代码  字符串拼接

    return code;
  }
  /* 
  <div id="app" a=1 b=2>
      <span style"=color:red">{{name}} <a>hello</a></span>
  </div> 
   _c(
      'div',{id:'app',a:1,b:2}
      ,_c(
          'span',
          {style:{color:'red'}}
          ,_s(_v(name)),
          _c(a,undefined,_v('hello'))
          )
  )
  */

  function compileToFunction(template) {
    // 1. 将 html 转为 ast 语法树
    var ast = parseHTML(template);
    console.log('ast', ast); // 2. 优化静态节点
    // 3. 将 ast 生成为代码

    var code = generate(ast); // 生成函数

    var render = new Function("with(this){return ".concat(code, "}"));
    console.log(render);
    return render;
  }

  function patch(oldVnode, vnode) {
    // 如果是组件，就创建组件的虚拟节点
    if (!oldVnode) {
      return createElm(vnode);
    }

    var el; // 如果是初始化， oldVnode 是真实元素

    var isRealElement = oldVnode.nodeType;

    if (isRealElement) {
      // 根据 vnode 创建真实 dom 节点
      el = createElm(vnode); // 使用新节点替换 oldVnode

      var parentEl = oldVnode.parentNode; // parentEl.replaceChild(el, oldVnode)

      parentEl.insertBefore(el, oldVnode.nextSibling); //真实元素插入到老节点后面

      parentEl.removeChild(oldVnode); //删除老节点

      return el;
    } else {
      // 对比两个 vnode，然后更新
      // 1. 标签不同，直接替换
      if (oldVnode.tag !== vnode.tag) {
        return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el);
      } // 标签一样，内容不一样，文本节点


      if (!oldVnode.tag) {
        if (oldVnode.text !== vnode.text) {
          return oldVnode.el.textContent = vnode.text;
        }

        return;
      } // 标签一样，属性不一样，复用元素，更新属性


      var _el = vnode.el = oldVnode.el;

      updateProperties(vnode, oldVnode.data); // 比较儿子

      var oldChildren = oldVnode.children || [];
      var newChildren = vnode.children || [];

      if (oldChildren.length > 0 && newChildren.length > 0) {
        // 都有儿子节点
        updateChildren(oldChildren, newChildren, _el);
      } else if (oldChildren.length > 0) {
        // 新的没有，老的有
        _el.innerHTML = '';
      } else if (newChildren.length > 0) {
        // 新的有，老的没有
        for (var i = 0; i < newChildren.length; i++) {
          var child = newChildren[i]; // 浏览器有性能优化，不用再文档碎片

          _el.appendChild(createElm(child));
        }
      }
    }
  }

  function isSameVnode(newVnode, oldVnode) {
    return newVnode.tag === oldVnode.tag && newVnode.key === oldVnode.key;
  }

  function makeIndexByKey(children) {
    var map = {};
    children.forEach(function (item, index) {
      map[item.key] = index; // {0:A,1:B, 2:C}
    });
    return map;
  }

  function updateChildren(oldChildren, newChildren, parent) {
    var oldStartIndex = 0;
    var oldEndIndex = oldChildren.length - 1;
    var oldStartVnode = oldChildren[oldStartIndex];
    var oldEndVnode = oldChildren[oldEndIndex];
    var newStartIndex = 0;
    var newStartVnode = newChildren[newStartIndex];
    var newEndIndex = newChildren.length - 1;
    var newEndVnode = newChildren[newEndIndex];
    var map = makeIndexByKey(oldChildren);
    console.log('map', map);

    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
      // 从开始比
      if (!oldStartVnode) {
        oldStartVnode = oldChildren[++oldStartIndex];
      } else if (!oldEndVnode) {
        oldEndVnode = oldEndVnode[--oldEndIndex];
      } else if (isSameVnode(newStartVnode, oldStartVnode)) {
        patch(oldStartVnode, newStartVnode);
        oldStartVnode = oldChildren[++oldStartIndex];
        newStartVnode = newChildren[++newStartIndex];
      } else if (isSameVnode(newEndVnode, oldEndVnode)) {
        // 开始不是同一个节点时有效？ 标签一样key一样 也有效
        patch(oldEndVnode, newEndVnode);
        oldEndVnode = oldChildren[--oldEndIndex];
        newEndVnode = newChildren[--newEndIndex];
      } else if (isSameVnode(oldStartVnode, newEndVnode)) {
        // 头尾比  a b c d  -> d c b a
        // a b c d  -> b c d a
        patch(oldStartVnode, newEndVnode); // 将老节点移动到末尾元素的后一个

        parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
        newEndVnode = newChildren[--newEndIndex];
        oldStartVnode = oldChildren[++oldStartIndex];
      } else if (isSameVnode(oldEndVnode, newStartVnode)) {
        // a b c d  -> d a b c
        patch(oldStartVnode, newEndVnode);
        parent.insertBefore(oldEndVnode.el, oldStartVnode.el);
        oldEndVnode = oldChildren[--oldEndIndex];
        newStartVnode = newChildren[++newStartIndex]; // 为什么要有 key，为什么不能用 key 做索引?
        // a b c  -> c b a 不能复用元素了，移动 比 创建性能高
        // input 复用会出问题
      } else {
        // 儿子之间没有关系，暴力比对
        // 根据 oldChildren 做一个 map 表
        // 新节点如果不在 oldChildren 里，则插入到 oldStartIndex 最前面
        // 新节点在 oldChildren 里，则将 oldChilren 里的节点移动到指针 oldStartIndex 的前面，并置为 null
        var moveIndex = map[newStartVnode.key];
        console.log(moveIndex, newStartVnode.key);

        if (moveIndex === undefined) {
          // 没有，直接插入到前面
          parent.insertBefore(createElm(newStartVnode), oldStartVnode.el);
        } else {
          console.log('xxxx'); // 有，则移动并替换，最后删除掉不要的

          var moveVnode = oldChildren[moveIndex];
          oldChildren[moveIndex] = null;
          parent.insertBefore(moveVnode.el, oldStartVnode.el);
          patch(moveVnode, newStartVnode);
        }

        newStartVnode = newChildren[++newStartIndex];
      }
    } // 新节点有多的，直接插入


    if (newStartIndex <= newEndIndex) {
      for (var i = newStartIndex; i <= newEndIndex; i++) {
        // 有可能后插入，也有可能前插入
        // parent.appendChild(createElm(newChildren[i]))
        var ele = !newChildren[newEndIndex + 1] ? null : newChildren[newEndIndex + 1].el; // 如果为 null， insertBefore 会变成 appendChild

        parent.insertBefore(createElm(newChildren[i]), ele);
      }
    } // 遍历 oldChilren，删除oldStartIndex oldEndIndex 这个区间的元素


    if (oldStartIndex <= oldEndIndex) {
      for (var _i = oldStartIndex; _i <= oldEndIndex; _i++) {
        var child = oldChildren[_i];

        if (child) {
          // child.remove()
          parent.removeChild(child.el);
        }
      }
    }
  }

  function createComponent$1(vnode) {
    var i = vnode.data;

    if ((i = i.hook) && (i = i.init)) {
      i(vnode);
    }

    if (vnode.componentInstance) {
      return true; // 是组件
    }
  }

  function createElm(vnode) {
    var tag = vnode.tag;
        vnode.data;
        var children = vnode.children,
        text = vnode.text;
        vnode.key;

    if (typeof tag === 'string') {
      // 如果是组件，放在 vm.$el 上
      if (createComponent$1(vnode)) {
        console.log('vnode.componentInstance', vnode.componentInstance);
        return vnode.componentInstance.$el;
      }

      vnode.el = document.createElement(tag);
      updateProperties(vnode);
      children.forEach(function (child) {
        console.log(vnode.el);
        vnode.el.appendChild(createElm(child));
      });
    } else if (typeof text === 'string') {
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  function updateProperties(vnode) {
    var oldProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var el = vnode.el;
    var newProps = vnode.data; // 新的没有，老的有，删除

    for (var key in oldProps) {
      if (!newProps[key]) {
        el.removeAttribute(key);
      }
    } // 样式处理，老的有，新的没有，删除老的


    var newStyle = newProps.style || {};
    var oldStyle = oldProps.style || {};

    for (var _key in oldStyle) {
      if (!newStyle[_key]) {
        el.style[_key] = '';
      }
    } // 新的有，直接更新


    for (var _key2 in newProps) {
      if (_key2 === 'style') {
        for (var styleName in newProps.style) {
          // console.log('newProps.style, ', newProps.style)
          el.style[styleName] = newProps.style[styleName];
        }

        continue;
      } else if (_key2 === 'class') {
        el.className = newProps[_key2];
      } else {
        el.setAttribute(_key2, newProps[_key2]);
      }
    }
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this;
      var prevVnode = vm._vnode; // 先取上一次的vnode 看一下是否有

      if (!prevVnode) {
        // 首次渲染
        vm.$el = patch(vm.$el, vnode); // 组件调用patch方法会产生$el属性

        vm._vnode = vnode; // 保存上一次的虚拟节点
      } else {
        // 更新
        vm.$el = patch(prevVnode, vnode);
      }
    };
  }
  function mountComponent(vm) {
    // 调用 render 方法去渲染 el 属性
    callHook(vm, 'beforeMount');

    var updateComponent = function updateComponent() {
      vm._update(vm._render());
    };

    new Watcher(vm, updateComponent, function () {
      callHook(vm, 'updated');
    }, true);
    callHook(vm, 'mounted');
  }
  function callHook(vm, hookName) {
    var handlers = vm.$options[hookName]; // console.log('hooks', hooks, hookName)

    if (handlers) {
      handlers.forEach(function (handler) {
        handler.call(vm);
      });
    }
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      console.log('options', vm.constructor.options, options);
      this.$options = mergeOptions(vm.constructor.options, options);
      callHook(vm, 'beforeCreate');
      initState(vm);
      callHook(vm, 'created'); // Vue 参考了 MVVM，因为它有 $ref，可以操作 dom
      // MVVM 是单纯的 M -VM -V，不能跳过数据去更新视图
      // 挂载 dom

      var el = vm.$options.el;

      if (el) {
        this.$mount(el);
      }
    };

    Vue.prototype.$mount = function (el) {
      // 获取模版
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el);
      vm.$el = el; // 保存老节点
      // 没有 render，则转 template 为 render

      if (!options.render) {
        // 上面已经判断有 el 了
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML;
        } // 将 options.template 转化为 render


        var render = compileToFunction(template);
        options.render = render;
      }

      console.log(options.render); // 通过 render 方法，渲染组件

      mountComponent(vm);
    };
  }

  function renderMixin(Vue) {
    // 创建元素节点
    Vue.prototype._c = function (tag, data) {
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }

      return createElement.apply(void 0, [this, tag, data].concat(children));
    }; // 将结果是对象时，对对象取值


    Vue.prototype._s = function (value) {
      return value === null ? '' : _typeof(value) === 'object' ? JSON.stringify(value) : value;
    }; // 创建文本节点


    Vue.prototype._v = function (text) {
      return createTextVNode(text + '');
    }; // 创建虚拟节点


    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      var vnode = render.call(vm);
      return vnode;
    };
  }

  function createElement(vm, tag) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    for (var _len2 = arguments.length, children = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      children[_key2 - 3] = arguments[_key2];
    }

    // 如果是组件，需要创建组件
    if (isReservedTag(tag)) {
      return vnode(tag, data, data.key, children);
    } else {
      var Ctor = vm.$options.components[tag];
      return createComponent(vm, tag, data, data.key, children, Ctor);
    }
  }

  function createComponent(vm, tag, data, key, children, Ctor) {
    var baseCtor = vm.$options._base; // 用户传递的 components 不是 Vue.component的，是一个对象，不是 VueComponent 的实例

    if (_typeof(Ctor) === 'object') {
      Ctor = baseCtor.extend(Ctor);
    } // 给组件增加生命周期


    data.hook = {
      init: function init(vnode) {
        var child = vnode.componentInstance = new Ctor({});
        console.log('child', child);
        child.$mount();
      }
    }; // 这里的 children 是插槽

    return vnode("vue-component-".concat(Ctor.cid, "-").concat(tag), data, data.key, undefined, undefined, {
      Ctor: Ctor,
      children: children
    });
  }

  function createTextVNode(text) {
    return vnode(undefined, undefined, undefined, undefined, text);
  }

  function vnode(tag, data, key, children, text, componentOptions) {
    return {
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text,
      componentOptions: componentOptions // 用来保存组件的构造函数和插槽

    };
  }

  function initExtend(Vue) {
    var cid = 0;

    Vue.extend = function (extendOptions) {
      var Super = this;

      var Sub = function VueComponent(options) {
        this._init(options);
      }; // 原型继承


      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++; // 处理其它属性 mixin component

      Sub.options = mergeOptions(Super.options, extendOptions);
      return Sub;
    };
  }

  function initGlobalAPI(Vue) {
    // 所有的属性都会合并到 Vue.options 上
    Vue.options = {}; // initMixin()

    Vue.mixin = function (mixin) {
      this.options = mergeOptions(Vue.options, mixin);
      console.log('this.options', this.options);
    };

    Vue.options._base = Vue;
    Vue.options.components = {};
    initExtend(Vue); // initAssetRegisters

    Vue.component = function (id, definition) {
      definition.name = definition.name || id; // 组件名
      // 永远是父类

      definition = this.options._base.extend(definition); // 注册组件

      Vue.options.components[id] = definition;
    };

    Vue.options.direction = {};
    Vue.options.filter = {};
  }

  function Vue(options) {
    this._init(options);
  } // 混入实例方法


  initMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);
  stateMixin(Vue); // 混入静态方法

  initGlobalAPI(Vue); // import {compileToFunction} from "./compiler/index";

  return Vue;

})));
//# sourceMappingURL=vue.js.map

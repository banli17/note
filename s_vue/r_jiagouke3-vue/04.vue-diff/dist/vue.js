(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('webpack')) :
  typeof define === 'function' && define.amd ? define(['webpack'], factory) :
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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
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

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // aa-aa 

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //aa:aa

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 可以匹配到标签名  [1]

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); //[0] 标签的结束名字
  //    style="xxx"   style='xxx'  style=xxx

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var startTagClose = /^\s*(\/?)>/;
  function parseHTML(html) {
    // <
    function createASTElement(tag, attrs) {
      // vue3里面支持多个根元素 (外层加了一个空元素) vue2中只有一个根节点
      return {
        tag: tag,
        type: 1,
        children: [],
        attrs: attrs,
        parent: null
      };
    }

    var root = null;
    var currentParent;
    var stack = []; // 根据开始标签 结束标签 文本内容 生成一个ast语法树

    function start(tagName, attrs) {
      // [div]
      var element = createASTElement(tagName, attrs);

      if (!root) {
        root = element;
      }

      currentParent = element; // div>span>a   div  span

      stack.push(element);
    }

    function end(tagName) {
      var element = stack.pop();
      currentParent = stack[stack.length - 1];

      if (currentParent) {
        element.parent = currentParent;
        currentParent.children.push(element);
      }
    }

    function chars(text) {
      text = text.replace(/\s/g, '');

      if (text) {
        currentParent.children.push({
          type: 3,
          text: text
        });
      }
    }

    function advance(n) {
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length); // 获取元素 
        // 查找属性

        var _end, attr; //不是开头标签结尾就一直解析


        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          advance(attr[0].length); // a=1 a="1" a='1'

          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5] || true
          });
        }

        if (_end) {
          advance(_end[0].length);
          return match;
        }
      }
    }

    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd == 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          // 开始标签
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        } // 结束标签 


        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }

      var text = void 0;

      if (textEnd > 0) {
        // 开始解析文本
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text);
      }
    }

    return root;
  }

  function compileToFunctions(template) {
    var ast = parseHTML(template); // root

    var code = generate(ast); // 生成代码

    var render = "with(this){return ".concat(code, "}");
    var fn = new Function(render); // 可以让字符串变成一个函数

    return fn; // render 函数已经ok了
  }

  var callbacks = [];
  var waiting = false;

  function flushCallbacks() {
    for (var i = 0; i < callbacks.length; i++) {
      var callback = callbacks[i];
      callback();
    }

    waiting = false;
    callbacks = [];
  } // 批处理 第一次开定时器 ，后续只更新列表 ，之后执行清空逻辑
  // 1.第一次cb渲染watcher更新操作  （渲染watcher执行的过程肯定是同步的）
  // 2.第二次cb 用户传入的回调


  function nextTick(cb) {
    callbacks.push(cb); // 默认的cb 是渲染逻辑 用户的逻辑放到渲染逻辑之后即可

    if (!waiting) {
      waiting = true; // 1.promise先看支持不支持 
      // 2.mutationObserver
      // 3.setImmdiate
      // 4.setTimeout  Vue3 next-tick就直接用了promise

      Promise.resolve().then(flushCallbacks); // 多次调用nextTick 只会开启一个promise
    }
  } // nextTick 肯定有异步功能

  var isObject = function isObject(val) {
    return _typeof(val) == 'object' && val != null;
  };
  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted'];
  var strats = {};

  function mergeHook(parentVal, childVal) {
    if (childVal) {
      // 如果
      if (parentVal) {
        return parentVal.concat(childVal);
      } else {
        // 如果儿子有父亲没有
        return [childVal];
      }
    } else {
      return parentVal; // 儿子没有直接采用父亲
    }
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });

  strats.components = function (parantVal, childVal) {
    var res = Object.create(parantVal);

    if (childVal) {
      for (var key in childVal) {
        res[key] = childVal[key];
      }
    }

    return res;
  };

  function mergeOptions(parent, child) {
    var options = {}; // {a:1}  {a:2}  => {a:2}
    // {a:1}  {}  => {a:1}
    // 自定义的策略
    // 1.如果父亲有的儿子也有，应该用儿子替换父亲
    // 2.如果父亲有值儿子没有，用父亲的

    for (var key in parent) {
      mergeField(key);
    }

    for (var _key in child) {
      if (!parent.hasOwnProperty(_key)) {
        mergeField(_key);
      }
    }

    function mergeField(key) {
      // 策略模式
      if (strats[key]) {
        return options[key] = strats[key](parent[key], child[key]);
      }

      if (isObject(parent[key]) && isObject(child[key])) {
        options[key] = _objectSpread2(_objectSpread2({}, parent[key]), child[key]);
      } else {
        if (child[key]) {
          // 如果儿子有值
          options[key] = child[key];
        } else {
          options[key] = parent[key];
        }
      }
    }

    return options;
  }

  function makeUp(str) {
    var map = {};
    str.split(',').forEach(function (tagName) {
      map[tagName] = true;
    });
    return function (tag) {
      return map[tag] || false;
    };
  }

  var isReservedTag = makeUp('a,p,div,ul,li,span,input,button,b');

  function initGlobalAPI(Vue) {
    Vue.options = {}; // 用来存储全局的配置
    // filter directive component

    Vue.mixin = function (mixin) {
      // mergeOptions
      this.options = mergeOptions(this.options, mixin);
      return this;
    };

    Vue.options._base = Vue; // Vue的构造函数 后面会用到

    Vue.options.components = {}; // 用来存放组件的定义

    Vue.component = function (id, definition) {
      definition.name = definition.name || id;
      definition = this.options._base.extend(definition); // 通过对象产生一个构造函数

      this.options.components[id] = definition;
      console.log(this.options);
    };

    var cid = 0;

    Vue.extend = function (options) {
      // 子组件初始化时会
      //  new VueComponent(options)
      var Super = this;

      var Sub = function VueComponent(options) {
        this._init(options);
      };

      Sub.cid = cid++;
      Sub.prototype = Object.create(Super.prototype); // 都是通过Vue继承来的

      Sub.prototype.constructor = Sub;
      Sub.component = Super.component; // ... 每次声明一个组件 都会把父级的定义放在自己的身上

      Sub.options = mergeOptions(Super.options, options);
      return Sub; // 这个构造函数是由对象产生而来的
    }; // 手写dom-diff算法  看vue2源码

  }

  // 我们可以把当前的watcher 放到一个全局变量上
  var id = 0;

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = id++;
      this.subs = []; // 属性要记住watcher
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        // 让watcher 记住dep
        Dep.target.addDep(this);
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        // 存储watcher
        this.subs.push(watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);

    return Dep;
  }();

  Dep.target = null;
  function pushTarget(watcher) {
    Dep.target = watcher;
  }
  function popTarget() {
    Dep.target = null;
  }

  var has = {};
  var queue = [];
  var pending = false;

  function flushSchedularQueue() {
    for (var i = 0; i < queue.length; i++) {
      var watcher = queue[i];
      watcher.run();
    }

    queue = [];
    has = {};
    pending = false;
  } // 多次调用queuewatcher 如果watcher不是同一个


  function queueWatcher(watcher) {
    // 调度更新几次
    // 更新时对watcher进行去重操作
    var id = watcher.id;

    if (has[id] == null) {
      // 没有id 
      queue.push(watcher);
      has[id] = true; // 让queue 清空ss

      if (!pending) {
        pending = true;
        nextTick(flushSchedularQueue);
      }
    }
  }

  var id$1 = 0;

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, exprOrFn, cb, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.cb = cb;
      this.options = options;
      this.id = id$1++;
      this.getter = exprOrFn;
      this.deps = [];
      this.depsId = new Set();
      this.get(); // 调用传入的函数， 调用了render方法， 此时会对模板中的数据进行取值
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        // 这个方法中会对属性进行取值操作
        pushTarget(this); // Dep.target = watcher

        this.getter(); // 会取值  vm__update(vm._render())

        popTarget(); // Dep.target = null
      }
    }, {
      key: "addDep",
      value: function addDep(dep) {
        var id = dep.id;

        if (!this.depsId.has(id)) {
          // dep 是非重复的，watcher肯定也不会重
          this.depsId.add(id);
          this.deps.push(dep);
          dep.addSub(this);
        }
      }
    }, {
      key: "run",
      value: function run() {
        this.get();
      }
    }, {
      key: "update",
      value: function update() {
        // 如果多次更改 我希望合并成一次  （防抖）
        // this.get(); // 不停的重新渲染
        queueWatcher(this);
      } // 当属性取值时 需要记住这个watcher，稍后数据变化了，去执行自己记住的watcher即可

    }]);

    return Watcher;
  }();

  function createElement(vm, tag) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    // 需要对标签名做过滤 因为有可能标签名是一个自定义组件
    if (isReservedTag(tag)) {
      return vnode(vm, tag, data, data.key, children, undefined);
    } else {
      // 组件
      var Ctor = vm.$options.components[tag]; // 对象或者函数
      // Vue.extend

      return createComponent(vm, tag, data, data.key, children, Ctor);
    }
  }

  function createComponent(vm, tag, data, key, children, Ctor) {
    if (isObject(Ctor)) {
      Ctor = vm.$options._base.extend(Ctor);
    } // 给组件增加生命周期


    data.hook = {
      init: function init(vnode) {
        // 调用子组件的构造函数
        var child = vnode.componentInstance = new vnode.componentOptions.Ctor({});
        child.$mount(); // 手动挂在  vnode.componentInstance.$el = 真实的元素
      } // 初始化的钩子

    }; // 组件的虚拟节点拥有hook和当前组件的componentOptions  中存放了组件的构造函数

    return vnode(vm, "vue-component-".concat(Ctor.cid, "-").concat(tag), data, key, undefined, undefined, {
      Ctor: Ctor
    });
  }

  function createTextVnode(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
  }

  function vnode(vm, tag, data, key, children, text, componentOptions) {
    return {
      vm: vm,
      tag: tag,
      children: children,
      data: data,
      key: key,
      text: text,
      componentOptions: componentOptions
    };
  }

  function isSameVnode(oldVnode, newVNode) {
    return oldVnode.tag === newVNode.tag && oldVnode.key === newVNode.key;
  }

  function patch(oldVnode, vnode) {
    // oldVnode 是一个真实的元素
    // 1. 组件oldVnode是null  $mount()
    if (!oldVnode) {
      return createElm(vnode); // 根据虚拟节点创建元素
    }

    var isRealElement = oldVnode.nodeType; // 2.初次渲染 oldVnode  是一个真实dom

    if (isRealElement) {
      // 初次渲染
      var oldElm = oldVnode; // id="app"

      var parentElm = oldElm.parentNode; // body

      var el = createElm(vnode);
      parentElm.insertBefore(el, oldElm.nextSibling); // 将创建的节点查到原有的节点的下一个

      parentElm.removeChild(oldElm);
      return el; // vm.$el
    } else {
      // 3.diff算法 两个虚拟节点的比对
      // 1.如果两个虚拟节点的标签不一致 那就直接替换掉就结束 
      // div=>p
      if (oldVnode.tag !== vnode.tag) {
        return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el);
      } // 2.标签一样但是时两个文本元素 {tag:undefined,text}  {tag:undefined,text} 


      if (!oldVnode.tag) {
        // 标签相同而且是文本 
        if (oldVnode.text !== vnode.text) {
          return oldVnode.el.textContent = vnode.text;
        }
      } // 3.元素相同, 复用老节点，并且更新属性 


      var _el = vnode.el = oldVnode.el; // 用老的属性和新的虚拟节点进行比对


      updateProperties(vnode, oldVnode.data); // 4.更新儿子

      var oldChildren = oldVnode.children || [];
      var newChildren = vnode.children || [];

      if (oldChildren.length > 0 && newChildren.length > 0) {
        //  1.老的有儿子新的也有儿子 dom-diff
        updateChildren(_el, oldChildren, newChildren);
      } else if (oldChildren.length > 0) {
        // 2.老的有儿子 新的没儿子 => 删除老儿子
        _el.innerHTML = ''; // 清空 删除所有节点
      } else if (newChildren.length > 0) {
        // 3.新的有儿子 老的没儿子  => 在老节点上面增加儿子即可
        newChildren.forEach(function (child) {
          return _el.appendChild(createElm(child));
        });
      } // ABCDF
      // NACBE

    }
  }

  function updateChildren(parent, oldChildren, newChildren) {
    var oldStartIndex = 0; // 老的头索引

    var oldEndIndex = oldChildren.length - 1; // 老的尾索引

    var oldStartVnode = oldChildren[0]; // 老的开始节点

    var oldEndVnode = oldChildren[oldEndIndex]; // 老的结束节点

    var newStartIndex = 0; // 新的头索引

    var newEndIndex = newChildren.length - 1; // 新的尾索引

    var newStartVnode = newChildren[0]; // 新的开始节点

    var newEndVnode = newChildren[newEndIndex]; // 新的结束节点

    function makeIndexByKey(oldChildren) {
      var map = {};
      oldChildren.forEach(function (item, index) {
        map[item.key] = index; // {A:0,B:1,C:2,}
      });
      return map;
    }

    var map = makeIndexByKey(oldChildren);

    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
      // 1.前端中比较常见的操作有 像尾部插入 头部插入 头移动到尾部 尾部移动头部，正序和反序
      // 1) 向后插入的操作
      if (!oldStartVnode) {
        oldStartVnode = oldChildren[++oldStartIndex];
      } else if (!oldEndVnode) {
        oldEndVnode = oldChildren[--oldEndIndex];
      } else if (isSameVnode(oldStartVnode, newStartVnode)) {
        patch(oldStartVnode, newStartVnode); // 递归比对节点

        oldStartVnode = oldChildren[++oldStartIndex];
        newStartVnode = newChildren[++newStartIndex];
      } else if (isSameVnode(oldEndVnode, newEndVnode)) {
        // // 2.向前插入
        patch(oldEndVnode, newEndVnode);
        oldEndVnode = oldChildren[--oldEndIndex];
        newEndVnode = newChildren[--newEndIndex];
      } else if (isSameVnode(oldStartVnode, newEndVnode)) {
        // 头移动到尾部
        patch(oldStartVnode, newEndVnode); // dom 操作时具备移动性的 会移动系欸但

        parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
        oldStartVnode = oldChildren[++oldStartIndex];
        newEndVnode = newChildren[--newEndIndex];
      } else if (isSameVnode(oldEndVnode, newStartVnode)) {
        patch(oldEndVnode, newStartVnode);
        parent.insertBefore(oldEndVnode.el, oldStartVnode.el);
        oldEndVnode = oldChildren[--oldEndIndex];
        newStartVnode = newChildren[++newStartIndex];
      } else {
        // 1.需要先查找当前 老节点索引和key的关系
        // 移动的时候通过新的key 去找对应的老节点索引 =》 获取老节点，可以移动老节点
        var moveIndex = map[newStartVnode.key];

        if (moveIndex == undefined) {
          parent.insertBefore(createElm(newStartVnode), oldStartVnode.el);
        } else {
          var moveVnode = oldChildren[moveIndex];
          oldChildren[moveIndex] = undefined;
          patch(moveVnode, newStartVnode); // 如果找到了 需要两个虚拟节点比对

          parent.insertBefore(moveVnode.el, oldStartVnode.el);
        }

        newStartVnode = newChildren[++newStartIndex];
      } // 为什么v-for要增加key属性,key为什么不能用index

    }

    if (newStartIndex <= newEndIndex) {
      // 新的比老的多 ，插入新节点
      for (var i = newStartIndex; i <= newEndIndex; i++) {
        // 向前插入 向后插入
        // 看一眼newEndIndex 下一个节点有没有值
        var nextEle = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el; // appendChild 和 insertBefore 也可以进行合并
        // 如果insertBefore 传入null 等价于appendChild

        parent.insertBefore(createElm(newChildren[i]), nextEle); // parent.appendChild(createElm(newChildren[i]));
      }
    }

    if (oldStartIndex <= oldEndIndex) {
      for (var _i = oldStartIndex; _i <= oldEndIndex; _i++) {
        var child = oldChildren[_i];

        if (child != undefined) {
          parent.removeChild(child.el); // 用父亲移除儿子即可
        }
      }
    }
  }

  function updateProperties(vnode) {
    var oldProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var newProps = vnode.data || {}; // 属性

    var el = vnode.el; // dom元素
    // 1.老的属性 新的没有  删除属性

    for (var key in oldProps) {
      if (!newProps[key]) {
        el.removeAttribute(key);
      }
    }

    var newStyle = newProps.style || {}; // {color:blue}

    var oldStyle = oldProps.style || {}; // {background:red}

    for (var _key in oldStyle) {
      // 判断样式根据 新老先比对一下
      if (!newStyle[_key]) {
        el.style[_key] = '';
      }
    } // 2.新的属性老的没有 , 直接用新的覆盖 不考虑有没有


    for (var _key2 in newProps) {
      if (_key2 == 'style') {
        for (var styleName in newProps.style) {
          el.style[styleName] = newProps.style[styleName];
        }
      } else if (_key2 === 'class') {
        el.className = newProps.class;
      } else {
        el.setAttribute(_key2, newProps[_key2]);
      }
    }
  }

  function createComponent$1(vnode) {
    var i = vnode.data;

    if ((i = i.hook) && (i = i.init)) {
      i(vnode); // 调用组件的初始化方法 // vnode.componentInstance.$el
    }

    if (vnode.componentInstance) {
      // 如果虚拟节点上有组件的实例说明当前这个vode是组件
      return true;
    }

    return false;
  }

  function createElm(vnode) {
    // 根据虚拟节点创建真实的节点
    var tag = vnode.tag,
        children = vnode.children,
        key = vnode.key,
        data = vnode.data,
        text = vnode.text,
        vm = vnode.vm;

    if (typeof tag === 'string') {
      // 两种可能 可能是一个组件
      // 可能是组件, 如果是组件 就直接根据组件创建出组件对应的真实节点
      if (createComponent$1(vnode)) {
        // 如果返回true 说明这个虚拟节点是组件
        // 如果是组件，就将组件渲染后的真实元素给我
        return vnode.componentInstance.$el;
      }

      vnode.el = document.createElement(tag); // 用vue的指令时 可以通过vnode拿到真实dom

      updateProperties(vnode);
      children.forEach(function (child) {
        // 如果有儿子节点，就进行递归操作
        vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      // 将虚拟节点转换成真实的dom
      var vm = this; // 首次渲染 需要用虚拟节点 来更新真实的dom元素
      // 初始化渲染的时候 会创建一个新节点并且将老节点删掉
      // 1.第一次渲染完毕后 拿到新的节点，下次再次渲染时替换上次渲染的结果
      // 第一次初始化 第二次走diff算法

      var prevVnode = vm._vnode; // 先取上一次的vnode 看一下是否有

      vm._vnode = vnode; // 保存上一次的虚拟节点

      if (!prevVnode) {
        vm.$el = patch(vm.$el, vnode); // 组件调用patch方法会产生$el属性
      } else {
        vm.$el = patch(prevVnode, vnode);
      }
    };
  }
  function callHook(vm, hook) {
    // 发布模式
    var handlers = vm.$options[hook];

    if (handlers) {
      handlers.forEach(function (handler) {
        return handler.call(vm);
      });
    }
  }
  function mountComponent(vm) {
    // 默认vue是通过watcher来进行渲染  = 渲染watcher （每一个组件都有一个渲染watcher）
    var updateComponent = function updateComponent() {
      vm._update(vm._render()); // 虚拟节点

    };

    new Watcher(vm, updateComponent, function () {}, true); // updateComponent();
  }

  var oldArrayProtoMethods = Array.prototype; // 不能直接改写数组原有方法 不可靠，因为只有被vue控制的数组才需要改写

  var arrayMethods = Object.create(Array.prototype);
  var methods = [// concat slice ... 都不能改变原数组
  'push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'];
  methods.forEach(function (method) {
    // AOP切片编程
    arrayMethods[method] = function () {
      var _oldArrayProtoMethods;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // 重写数组方法
      // todo ...
      // 有可能用户新增的数据时对象格式 也需要进行拦截
      var result = (_oldArrayProtoMethods = oldArrayProtoMethods[method]).call.apply(_oldArrayProtoMethods, [this].concat(args));

      var inserted;
      var ob = this.__ob__;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          // splice(0,1,xxxx)
          inserted = args.slice(2);
      }

      if (inserted) ob.observeArray(inserted);
      ob.dep.notify();
      return result;
    };
  }); // arrayMethods.push({a:1})

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // 需要对这个value属性重新定义  
      // value可能是对象 可能是数组，分类来处理
      // value.__ob__ = this; 
      this.dep = new Dep(); // 给数组本身和对象本身增加一个dep属性

      Object.defineProperty(value, '__ob__', {
        value: this,
        enumerable: false,
        // 不能被枚举表示 不能被循环
        configurable: false // 不能删除此属性

      });

      if (Array.isArray(value)) {
        // 数组不用defineProperty来进行代理 性能不好
        // push shift reverse sort  我要重写这些方法增加更新逻辑
        Object.setPrototypeOf(value, arrayMethods); // 循环将属性赋予上去

        this.observeArray(value); // 原有数组中的对象  Object.freeze()
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(value) {
        for (var i = 0; i < value.length; i++) {
          // 如果数组中是对象的话，就会去递归观测，观测的时候回增加__ob__属性
          observe(value[i]);
        }
      }
    }, {
      key: "walk",
      value: function walk(data) {
        // 将对象中的所有key 重新用defineProperty定义成响应式的
        Object.keys(data).forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function dependArray(value) {
    // 就是让里层数组收集外层数组的依赖，这样修改里层数组也可以更新视图 
    for (var i = 0; i < value.length; i++) {
      var current = value[i];
      current.__ob__ && current.__ob__.dep.depend(); // 让里层的和外层收集的都是同一个watcher

      if (Array.isArray(current)) {
        dependArray(current);
      }
    }
  }

  function defineReactive(data, key, value) {
    // vue2中数据嵌套不要过深 过深浪费性能
    // value 可能也是一个对象
    var childOb = observe(value); // 对结果递归拦截

    var dep = new Dep(); // 每次都会给属性创建一个dep  

    Object.defineProperty(data, key, {
      // 需要给每个属性都增加一个dep
      get: function get() {
        if (Dep.target) {
          dep.depend(); // 让这个属性自己的dep记住这个watcher，也要让watcher记住这个dep
          // childOb 可能是对象 也可能是数组  

          if (childOb) {
            // 如果对数组取值 会将当前的watcher和数组进行关联
            childOb.dep.depend();

            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }

        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return;
        observe(newValue); // 如果用户设置的是一个对象 ， 就继续将用户设置的对象变成响应式的

        value = newValue;
        dep.notify(); // 通知dep中记录的watcher让它去执行
      }
    });
  }
  function observe(data) {
    // 只对对象类型进行观测 非对象类型无法观测
    if (_typeof(data) !== 'object' || data == null) {
      return;
    }

    if (data.__ob__) {
      // 放置循环引用了
      return;
    } // 通过类来对实现对数据的观测 类可以方便扩展，会产生实例


    return new Observer(data);
  }

  function initState(vm) {
    // 将所有数据都定义在 vm属性上，并且后续更改 需要触发视图更新
    var opts = vm.$options; // 获取用户属性

    if (opts.data) {
      // 数据的初始化
      initData(vm);
    }
  }

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  }

  function initData(vm) {
    // 数据劫持 Object.defineProperty
    var data = vm.$options.data; // 对data类型进行判断 如果是函数 获取函数返回值作为对象

    data = vm._data = typeof data === 'function' ? data.call(vm) : data; // 通过vm._data 获取劫持后的数据，用户就可以拿到_data了
    // 将_data中的数据全部放到vm上

    for (var key in data) {
      proxy(vm, '_data', key); // vm.name  => vm._data.nam,e
    } // 观测这个数据


    observe(data);
  }

  function initMixin(Vue) {
    // vue是如何渲染的 1.ast 2.renders 3.vnode(不应该是my-button)
    Vue.prototype._init = function (options) {
      // options 是用户传入的对象
      var vm = this;
      vm.$options = mergeOptions(vm.constructor.options, options); // vm.$options = options; // 实例上有个属性$options 表示的是用户传入的所有属性
      // 初始化状态

      callHook(vm, 'beforeCreate');
      initState(vm);
      callHook(vm, 'created');

      if (vm.$options.el) {
        // 数据可以挂载到页面上
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$nextTick = nextTick;

    Vue.prototype.$mount = function (el) {
      el = el && document.querySelector(el);
      var vm = this;
      var options = vm.$options;
      vm.$el = el; // 如果有render 就直接使用render
      // 没有render 看有没有template属性
      // 没有template 就接着找外部模板

      if (!options.render) {
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML; // 火狐不兼容 document.createElement('div').appendChild('app').innerHTMl
        } // 如何将模板编译成render函数


        var render = compileToFunctions(template); // compileToFunctions

        options.render = render;
      }

      mountComponent(vm); // 组件挂载
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._c = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // 创建元素的虚拟节点
      return createElement.apply(void 0, [this].concat(args));
    };

    Vue.prototype._v = function (text) {
      // 创建文本的虚拟节点
      return createTextVnode(this, text);
    };

    Vue.prototype._s = function (val) {
      // 转化成字符串
      return val == null ? '' : _typeof(val) == 'object' ? JSON.stringify(val) : val;
    };

    Vue.prototype._render = function () {
      // render
      var vm = this;
      var render = vm.$options.render; // 获取编译后的render方法
      // 调用render方法产生虚拟节点

      var vnode = render.call(vm); // _c(xxx,xx,xxx,xxx) 调用时会自动将变量进行取值，将实例结果进行渲染

      return vnode; // 虚拟节点
      // _c('div',{},_c())
    };
  }

  // Vue2.0中就是一个构造函数 class

  function Vue(options) {
    this._init(options); // 当用户new Vue时 就调用init方法进行vue的初始方法

  } // 可以拆分逻辑到不同的文件中 更利于代码维护 模块化的概念


  initMixin(Vue); // 扩展初始化方法

  lifecycleMixin(Vue); // 扩展_update方法

  renderMixin(Vue); // 扩展_render方法

  initGlobalAPI(Vue); // 混合全局的api
   // 库 => rollup  项目开发webpack

  return Vue;

})));
//# sourceMappingURL=vue.js.map

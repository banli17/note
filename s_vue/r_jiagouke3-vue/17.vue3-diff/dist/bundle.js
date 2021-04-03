(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Vue = {}));
}(this, (function (exports) { 'use strict';

    var isObject = function (val) { return typeof val == 'object' && val !== null; };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = function (target, key) { return hasOwnProperty.call(target, key); };
    var isArray = function (target) { return Array.isArray(target); };
    var hasChange = function (oldVal, newVal) { return oldVal !== newVal; };
    var isFunction = function (val) { return typeof val == 'function'; };
    var isString = function (val) { return typeof val == 'string'; };

    var effect = function (fn, options) {
        if (options === void 0) { options = {}; }
        // 需要让传递来的fn 变成响应式的effect，数据有变化 这个fn就能重新执行
        var effect = createReactiveEffect(fn, options); //fn用户传递的函数
        if (!options.lazy) {
            effect();
        }
        return effect;
    };
    // effect 应该和数据关联起来
    // effect1(()=>{
    //     state.name
    //     effect2(()=>{
    //         state.age
    //     })
    //     state.address
    // })
    // 默认先调用effect1 内部对state.name取值 ， 把name属性和 activeEffect(effect1) 关联起来
    // 调用effect2 内部对state.age取值， 把age 和 activeEffect(effect2) 关联起来
    // effect2 执行完毕 activeEffect 指向effect1
    // state.address 再次取值 此时关联到了 effect1
    // 数据变化effect就会重新执行
    // effect(()=>{
    //     state.name++;
    // })
    var effectStack = []; // 这个栈为了保证当前effect 和属性能对应上
    var activeEffect = null;
    var id = 0;
    function createReactiveEffect(fn, options) {
        var effect = function reactiveEffect() {
            if (!effectStack.includes(effect)) {
                try {
                    effectStack.push(effect);
                    activeEffect = effect;
                    return fn(); // 让函数执行, 会执行取值逻辑. 在取值逻辑中可以和effect做关联
                }
                finally {
                    effectStack.pop();
                    activeEffect = effectStack[effectStack.length - 1];
                }
            }
        };
        effect.id = id++;
        effect.options = options;
        return effect;
    }
    // 某个对象中的  某个属性 依赖了 哪些effect
    // {对象:{name:[]}}  // weakMap set
    var targetMap = new WeakMap;
    // 建立属性 和 effect之间的关联
    function track(target, key) {
        if (activeEffect == undefined) {
            return;
        }
        var depsMap = targetMap.get(target);
        if (!depsMap) { // 枚举
            targetMap.set(target, (depsMap = new Map())); // weakMap 为了解决内存泄漏
        }
        var dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, (dep = new Set()));
        }
        if (!dep.has(activeEffect)) {
            dep.add(activeEffect);
        }
    }
    var run = function (effects) {
        if (effects)
            effects.forEach(function (effect) {
                if (effect.options.scheduler) { // 计算属性 
                    effect.options.scheduler(effect);
                }
                else {
                    effect();
                }
            });
    };
    function trigger(target, type, key, value) {
        var depsMap = targetMap.get(target);
        if (!depsMap) { // 属性变化了 但是没有依赖 直接跳过即可
            return;
        }
        // 修改
        if (key == 'length' && isArray(target)) {
            depsMap.forEach(function (dep, key) {
                // 如果改变了 数组长度 那么一定要更新  改变的长度 小于取值的长度
                // 这里是2 收集的   2     1
                // key => {map中的key}  =》 {name:set:[]}
                // 如果你修改的是长度 正好内部也对长度进行了收集 长度也要触发
                if (key == 'length' || key >= value) {
                    run(dep);
                }
            });
        }
        else {
            if (key !== undefined) { // 如果有收集过就触发
                var effects = depsMap.get(key);
                run(effects);
            }
            switch (type) {
                case 'add': // 添加属性 需要触发length
                    if (isArray(target)) {
                        if (parseInt(key) == key) {
                            run(depsMap.get('length')); // 打补丁 ，不更新就手动触发吧
                        }
                    }
                    break;
            }
        }
    }
    // 下次课 vue3计算属性 ref、toRefs , 异步更新原理 虚拟dom原理 vue3 diff算法
    // vite 原理
    // vue3 实战写一个项目 vue3 + ts 用法
    // ts 实战 手写个axios库
    // 周日的话咱们开node （2,4） 补课
    // node tcp eggjs 进程 单元测试

    // proxy 和 reflect 连用 （reflect 以后会取代掉 object上一系列法 ）
    var mutableHandlers = {
        // 目标原对象 属性 代理后的对象
        get: function (target, key, recevier) {
            var res = Reflect.get(target, key, recevier);
            if (typeof key == 'symbol') { // 如果是内置的symbol 就排除掉依赖收集
                return res;
            }
            track(target, key); // 属性 和 effect之间做一个关联
            if (res.__v_isRef) {
                return res.value;
            }
            return isObject(res) ? reactive(res) : res; // taget[key]
        },
        set: function (target, key, value, recevier) {
            var oldValue = target[key]; // 上一次的结果
            // 如果是数组 就比较当前新增的属性 是否比长度大，大的话就是以前没有新增的
            var hadKey = isArray(target) && (parseInt(key, 10) == key) ? Number(key) < target.length : hasOwn(target, key);
            var result = Reflect.set(target, key, value, recevier);
            // 调用push方法 会先进行添加属性 在去更新长度（这次长度更新是没有意义的）
            if (!hadKey) {
                trigger(target, 'add', key, value); // 触发新增操作
            }
            else if (hasChange(oldValue, value)) {
                trigger(target, 'set', key, value);
            }
            // 设置一般分为两种一种是添加新的属性,还有种是修改属性
            return result;
        } // 当设置值的时候 应该通知对应的effect来更新
    };
    // 默认加载页面时 会先调用一次effect，此时effect方法中的数据会进行取值操作 -》 get方法
    //                让对应的属性保存当前的effect  =>  某个对象中 name属性  对应的effect有几个
    // 某个对象中 name属性 变化了 ， 需要找到对应的effect列表让他依次执行

    var reactive = function (target) {
        // 你给我一个对象 我需要让这个对象变成响应式对象 
        // 在vue2.0的时候 defineProprety直接循环对象中的每一个属性， 无法对不存在的属性做处理.递归处理多级对象
        // vue3.0 没有循环 对原对象进行代理,vue3不存在的属性也可以监控到,vue3 没有以上来就递归
        return createReactiveObject(target, mutableHandlers); // 高阶函数，可以根据不同的参数实现不同的功能
    };
    var reactiveMap = new WeakMap(); // 映射表中的key必须是对象，而且不会有内存泄漏的问题
    function createReactiveObject(target, baseHandler) {
        // 如果这个target 是一个对象
        if (!isObject(target)) { // 不是对象直接返回即可
            return target;
        }
        // 如果对象已经被代理过了，就不要再次代理了
        var existProxy = reactiveMap.get(target);
        if (existProxy) {
            return existProxy; // 返回上一次的代理
        }
        var proxy = new Proxy(target, baseHandler); // reactive核心功能就是 proxy
        reactiveMap.set(target, proxy); // {需要代理的对象：代理后的值}
        return proxy;
    }

    var ComputedRefImpl = /** @class */ (function () {
        function ComputedRefImpl(getter, setter) {
            var _this = this;
            this.__v_isReadonly = true;
            this.__v_isRef = true;
            this._dirty = true;
            this.setter = setter;
            // 默认getter执行的时候会依赖于一个effect （计算属性默认就是一个effect）
            this.effect = effect(getter, {
                lazy: true,
                scheduler: function () {
                    _this._dirty = true; // 依赖的值变化了 变成脏值
                    trigger(_this, 'set', 'value');
                }
            });
        }
        Object.defineProperty(ComputedRefImpl.prototype, "value", {
            get: function () {
                if (this._dirty) { // 缓存
                    this._value = this.effect();
                    track(this, 'value'); // 取值时收集依赖 {this:{'value':[effect]}
                    this._dirty = false;
                }
                return this._value;
            },
            set: function (newValue) {
                this.setter(newValue);
            },
            enumerable: false,
            configurable: true
        });
        return ComputedRefImpl;
    }());
    function computed(getterOrOptions) {
        // 分别拿到get和set
        var getter;
        var setter;
        if (isFunction(getterOrOptions)) {
            getter = getterOrOptions;
            setter = function () { console.log('computed  not set value'); };
        }
        else {
            getter = getterOrOptions.get;
            setter = getterOrOptions.set;
        }
        return new ComputedRefImpl(getter, setter);
    }

    var convert = function (val) { return isObject(val) ? reactive(val) : val; };
    var RefImpl = /** @class */ (function () {
        function RefImpl(rawValue) {
            this.rawValue = rawValue;
            this.__v_isRef = true;
            this._rawValue = rawValue;
            this._value = convert(rawValue);
        }
        Object.defineProperty(RefImpl.prototype, "value", {
            get: function () {
                track(this, 'value'); // {this:{value:[effect]}}  depend
                return this._value;
            },
            set: function (newValue) {
                if (hasChange(newValue, this._rawValue)) { // 如果值有变化再去触发更新，如果值没发生变化 就不要再次触发更新了
                    this._rawValue = newValue;
                    this._value = convert(newValue);
                    trigger(this, 'set', 'value'); // notify
                }
            },
            enumerable: false,
            configurable: true
        });
        return RefImpl;
    }());
    function ref(rawValue) {
        return new RefImpl(rawValue);
    }
    var ObjectRefImpl = /** @class */ (function () {
        function ObjectRefImpl(_object, _key) {
            this._object = _object;
            this._key = _key;
        }
        Object.defineProperty(ObjectRefImpl.prototype, "value", {
            // 代理操作 vue2 this._data 代理到vm上一个意思
            get: function () {
                return this._object[this._key]; // 读取的是原值 （原来的值都不是响应式 那不能是响应的）
            },
            set: function (newValue) {
                this._object[this._key] = newValue;
            },
            enumerable: false,
            configurable: true
        });
        return ObjectRefImpl;
    }());
    function toRefs(object) {
        var result = isArray(object) ? new Array(object.length) : {};
        for (var key in object) {
            result[key] = new ObjectRefImpl(object, key);
        }
        return result;
    }

    function createVNode(type, props, children) {
        if (props === void 0) { props = {}; }
        if (children === void 0) { children = null; }
        // 如果是组件 那么组件的类型是对象
        var shapeFlag = isString(type) ?
            1 /* ELEMENT */ :
            isObject(type) ?
                4 /* STATEFUL_COMPONENT */ : 0;
        // 可以标识出当前 是组件还是元素
        // shapeFlag
        var vnode = {
            type: type,
            props: props,
            children: children,
            component: null,
            el: null,
            key: props.key,
            shapeFlag: shapeFlag // 可以描述自己 也同时描述了孩子
        };
        if (isArray(children)) {
            // 元素配合多个儿子 
            // 00000001 假如是元素
            // 00010000 假如元素中有多个儿子
            // ---10001  => 17 或运算 在运算的过程中有一个是1
            vnode.shapeFlag |= 16 /* ARRAY_CHILDREN */; // 1000
        }
        else {
            // 00000010 假如是组件  组件里面可能是空 也可能是文本
            vnode.shapeFlag = vnode.shapeFlag | 8 /* TEXT_CHILDREN */;
        }
        // vue2 里面 区分孩子是不是数组 
        return vnode;
    }

    function createAppApi(render) {
        return function (component) {
            var app = {
                mount: function (container) {
                    // (ast => codegen) => render => vnode => dom
                    // 根据传入的组件 创建一个组件的虚拟节点 
                    var vnode = createVNode(component);
                    render(vnode, container);
                }
            };
            return app;
        };
    }

    function createComponentInstance(vnode) {
        var instance = {
            type: vnode.type,
            props: {},
            subTree: null,
            vnode: vnode,
            render: null,
            setupState: null,
            isMounted: false,
        };
        return instance;
    }
    function setupComponent(instance) {
        // 属性 插槽处理
        setupStatefulComponent(instance);
    }
    function setupStatefulComponent(instance) {
        var Component = instance.type; // 用户的App组件
        var setup = Component.setup;
        if (setup) {
            var setUpResult = setup(instance.props);
            // setup 可以返回render函数 还可以返回状态对象
            handleSetupResult(instance, setUpResult);
        }
    }
    function handleSetupResult(instance, setUpResult) {
        if (isFunction(setUpResult)) {
            instance.render = setUpResult; // vue2=> render
        }
        else {
            instance.setupState = setUpResult; // 一个状态可以用于模板渲染时使用的数据
        }
        // 当前用户可能使用了vue2的写法
        finishComponentSetup(instance);
    }
    function finishComponentSetup(instance) {
        var Component = instance.type;
        if (Component.render && !instance.render) { // 是render函数
            instance.render = Component.render; // 全部以setup为准
        }
        else if (!instance.render) ;
    }

    function createRenderer(options) {
        var hostCreateElement = options.createElement, hostInsert = options.insert, hostRemove = options.remove, hostSetElementText = options.setElementText, hostCreateNode = options.createTextNode, hostPatchProp = options.patchProp;
        var mountElement = function (vnode, container, anchor) {
            // createElm 将虚拟节点变成真实节点
            var shapeFlag = vnode.shapeFlag, props = vnode.props, type = vnode.type, children = vnode.children;
            // 将真实节点和虚拟节点关联起来
            var el = vnode.el = hostCreateElement(type);
            // 是文本的孩子
            if (shapeFlag & 8 /* TEXT_CHILDREN */) {
                hostSetElementText(el, children);
            }
            else {
                // 数组就需要循环处理
                mountChildren(children, el);
            }
            if (props) {
                // 处理属性,赋予给元素上
                for (var key in props) {
                    hostPatchProp(el, key, null, props[key]);
                }
            }
            hostInsert(el, container, anchor);
        };
        function mountChildren(children, container) {
            for (var i = 0; i < children.length; i++) {
                patch(null, children[i], container);
            }
        }
        var patchProps = function (oldProps, newProps, el) {
            if (oldProps !== newProps) {
                for (var key in newProps) {
                    var prev = oldProps[key];
                    var next = newProps[key];
                    if (prev !== next) {
                        hostPatchProp(el, key, prev, next);
                    }
                }
                // 老的中的属性 新的没有了 还要将属性移除掉
                for (var key in oldProps) {
                    if (!(key in newProps)) {
                        hostPatchProp(el, key, oldProps[key], null);
                    }
                }
            }
        };
        var patchKeyedChildren = function (c1, c2, el) {
            // 两方都有儿子 核心的diff算法
            // 两个儿子 要尽可能复用
            // 1）abc
            //    abde  i = 2
            // 先默认处理特殊情况
            var i = 0;
            var e1 = c1.length - 1;
            var e2 = c2.length - 1;
            while (i <= e1 && i <= e2) { // 谁先比对完毕就结束
                var n1 = c1[i];
                var n2 = c2[i];
                if (isSameVnodeType(n1, n2)) {
                    patch(n1, n2, el); // 递归比较子节点
                }
                else {
                    break;
                }
                i++;
            }
            // 2) abc    i = 0  e1=2  e2=3
            //   eabc    i=0 e1=-1 e2=0
            while (i <= e1 && i <= e2) {
                var n1 = c1[e1];
                var n2 = c2[e2];
                if (isSameVnodeType(n1, n2)) {
                    patch(n1, n2, el);
                }
                else {
                    break;
                }
                e1--;
                e2--;
            }
            // 老的都能复用 只是向前或者向后插入了元素
            // 3) 考虑极端的情况 abc => abcdef （i=3  e1=2  e2= 5）       
            //  abc => fedabc (i=0 e1=-1 e2=2)
            // 我怎么知道是新的比老的多？
            if (i > e1) { // 最起码能保证老节点都比较完毕了
                if (i <= e2) { // 新增的节点
                    // 我怎么知道是向前插入 还是向后插入 , 如果是向前插入，那应该插入到谁的前面
                    // 如果前面都一样 e2 不会动 取他的 + 1 个 比数组长度大
                    // 如果后面都一样 e2 会向前 取他的 + 1 个 会比数组长度小
                    var nextPos = e2 + 1;
                    var anchor = nextPos < c2.length ? c2[nextPos].el : null;
                    while (i <= e2) {
                        patch(null, c2[i], el, anchor);
                        i++;
                    }
                }
                // abcdef abc (i=3 e1=5 e2=2)
            }
            else if (i > e2) {
                while (i <= e1) {
                    hostRemove(c1[i].el);
                    i++;
                }
            }
            else ;
            // 最后在考虑都不一样的情况
        };
        var patchChildren = function (n1, n2, el) {
            var c1 = n1.children;
            var c2 = n2.children;
            var prevShapeFlag = n1.shapeFlag;
            var nextShapeFlag = n2.shapeFlag;
            // 老的是文本 新的是文本
            // 老的是数组 新的是文本  如果新的是文本 直接覆盖掉即可
            if (nextShapeFlag & 8 /* TEXT_CHILDREN */) {
                if (c2 !== c1) {
                    hostSetElementText(el, c2);
                }
            }
            else {
                // 新的是数组   // 如果老的是数组
                if (prevShapeFlag & 16 /* ARRAY_CHILDREN */) {
                    patchKeyedChildren(c1, c2, el);
                }
                else {
                    // 老的是文本 新的是数组？
                    hostSetElementText(el, ''); // 删掉老的内容
                    mountChildren(c2, el); // 循环子节点 将子节点变成真实节点插入到el元素中
                }
            }
            // 新的是数组 老的是数组
            // 新的是数组 老的是文本
        };
        var patchElement = function (n1, n2, container) {
            // 比较两个虚拟节点 并且复用老的节点
            var el = n2.el = n1.el;
            var oldProps = n1.props || {};
            var newProps = n2.props || {};
            patchProps(oldProps, newProps, el);
            patchChildren(n1, n2, el);
        };
        var mountComponent = function (vnode, container) {
            // vue是组件级别更新的 每个组件应该有个 effect 渲染effect
            // 组件的创建 我拿到外边去
            var instance = vnode.component = createComponentInstance(vnode); // 根据虚拟 创建实例
            // 找到组件的setup方法
            setupComponent(instance); // instance = {type,props,component,render}
            // 设置渲染effect
            setupRenderEffect(instance, container);
        };
        // 每个组件都会提供一个effect方法
        function setupRenderEffect(instance, container) {
            effect(function () {
                if (!instance.isMounted) { // 组件没有被渲染
                    var subTree = instance.subTree = instance.render(); // state.name
                    // 渲染组件对应的需要渲染的节点
                    patch(null, subTree, container);
                    instance.isMounted = true; // 表示渲染完了
                }
                else {
                    // 组件的更新 
                    var prevTree = instance.subTree;
                    var nextTree = instance.render();
                    patch(prevTree, nextTree, container);
                }
            });
        }
        var processElement = function (n1, n2, container, anchor) {
            if (n1 == null) {
                // 元素挂载
                mountElement(n2, container, anchor);
            }
            else {
                patchElement(n1, n2);
            }
        };
        var processComponent = function (n1, n2, container) {
            if (n1 == null) {
                mountComponent(n2, container);
            }
        };
        var isSameVnodeType = function (n1, n2) {
            return n1.type == n2.type && n1.key == n2.key;
        };
        var patch = function (n1, n2, container, anchor) {
            if (anchor === void 0) { anchor = null; }
            // 同级比对
            // 1.类型不一样 key 不一样不复用
            // 2.复用节点后 比较属性
            // 3.比对孩子 1方 有儿子  2方都有儿子 
            // 4.都有儿子的时候才是真正的dom-diff
            if (n1 && !isSameVnodeType(n1, n2)) {
                hostRemove(n1.el);
                n1 = null; // n1 等于null 表示初始化渲染，把n2 作为了新的虚拟节点
            }
            // 开始渲染
            var shapeFlag = n2.shapeFlag;
            // 此时我现在判断的是最外层元素，没有到儿子内部
            // 1100     0001  都是1 才是1
            if (shapeFlag & 1 /* ELEMENT */) { // 1  可以用& 操作来判断是否包含这个类型
                processElement(n1, n2, container, anchor);
                // 1100   100
            }
            else if (shapeFlag & 4 /* STATEFUL_COMPONENT */) {
                processComponent(n1, n2, container);
            }
        };
        var render = function (vnode, container) {
            // 初次渲染 没有prevVnode   更新渲染  prevVnode
            patch(null, vnode, container);
        };
        return {
            createApp: createAppApi(render) // 为了方便扩展 我将createAppApi方法改造成了高阶函数方便传入参数
        };
        // 组件渲染 render方法 =》 patch =》 渲染的是组件 => processComponent => mountComponent => 调用组件的setup 并且拿到render函数
        // 元素渲染  patch方法 => processElement => mountElement
    }
    // 核心包肯定有很多方法

    function h(type, props, children) {
        return createVNode(type, props, children);
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var nodeOps = {
        createElement: function (type) {
            return document.createElement(type);
        },
        insert: function (child, parent, anchor) {
            if (anchor === void 0) { anchor = null; }
            parent.insertBefore(child, anchor); // achor == null appendChild
        },
        remove: function (child) {
            var parent = child.parentNode;
            if (parent) {
                parent.removeChild(child);
            }
        },
        setElementText: function (el, content) {
            el.textContent = content;
        },
        createTextNode: function (content) {
            return document.createTextNode(content);
        }
    };
    // vue2 => weex => mpvue

    function patchStyle(el, prev, next) {
        // 如果元素next属性没有值
        var style = el.style; // 获取之前的样式
        if (!next) {
            el.removeAttribute('style'); // 直接删除即可
        }
        else {
            for (var key in next) { // 用新的全量覆盖老的
                style[key] = next[key];
            }
            if (prev) {
                for (var key in prev) { // 看老的有的新的没有 将样式移除
                    if (!next[key]) {
                        style[key] = '';
                    }
                }
            }
        }
    }
    function patchClass(el, next) {
        if (next == null) {
            next = '';
        }
        el.className = next;
    }
    function patchAttr(el, key, value) {
        if (value == null) {
            el.removeAttribute(key);
        }
        else {
            el.setAttribute(key, value);
        }
    }
    function patchProp(el, key, prevValue, nextValue) {
        switch (key) {
            case 'style':
                patchStyle(el, prevValue, nextValue);
                break;
            case 'className':
                patchClass(el, nextValue);
                break;
            default:
                patchAttr(el, key, nextValue);
        }
    }

    function ensureRenderer() {
        return createRenderer(__assign(__assign({}, nodeOps), { patchProp: patchProp })); // 传入一些dom的api操作 创建、删除、添加、属性更新
    }
    function createApp(rootComponent) {
        var app = ensureRenderer().createApp(rootComponent); // 核心调用内层 runtime-core 中的createApp方法
        var mount = app.mount;
        app.mount = function (container) {
            // 外层需要做元素清空操作
            container = document.querySelector(container);
            container.innerHTML = ''; // 清空容器中的内容
            mount(container); // 调用底层的mount方法
        };
        return app;
    }
    // vue3 默认使用的时候就是runtime-dom这个包

    exports.computed = computed;
    exports.createApp = createApp;
    exports.createRenderer = createRenderer;
    exports.effect = effect;
    exports.h = h;
    exports.reactive = reactive;
    exports.ref = ref;
    exports.toRefs = toRefs;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bundle.js.map

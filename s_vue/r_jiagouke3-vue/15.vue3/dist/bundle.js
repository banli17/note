(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueReactivity = {}));
}(this, (function (exports) { 'use strict';

    var isObject = function (val) { return typeof val == 'object' && val !== null; };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = function (target, key) { return hasOwnProperty.call(target, key); };
    var isArray = function (target) { return Array.isArray(target); };
    var hasChange = function (oldVal, newVal) { return oldVal !== newVal; };
    var isFunction = function (val) { return typeof val == 'function'; };

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

    exports.computed = computed;
    exports.effect = effect;
    exports.reactive = reactive;
    exports.ref = ref;
    exports.toRefs = toRefs;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bundle.js.map

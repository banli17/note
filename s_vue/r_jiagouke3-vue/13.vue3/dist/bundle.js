(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueReactivity = {}));
}(this, (function (exports) { 'use strict';

    var effect = function (fn, options) {
        // 需要让传递来的fn 变成响应式的effect，数据有变化 这个fn就能重新执行
        var effect = createReactiveEffect(fn); //fn用户传递的函数
        effect();
    };
    // effect 应该和数据关联起来
    var effectStack = [];
    function createReactiveEffect(fn) {
        var effect = function reactiveEffect() {
            effectStack.push(effect);
            fn(); // 让函数执行
        };
        return effect;
    }

    var isObject = function (val) { return typeof val == 'object' && val !== null; };

    // proxy 和 reflect 连用 （reflect 以后会取代掉 object上一系列法 ）
    var mutableHandlers = {
        // 目标原对象 属性 代理后的对象
        get: function (target, key, recevier) {
            console.log('get');
            return Reflect.get(target, key, recevier); // taget[key]
        },
        set: function (target, key, value, recevier) {
            console.log('set');
            var result = Reflect.set(target, key, value, recevier);
            effectStack.forEach(function (effect) { return effect(); });
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

    exports.effect = effect;
    exports.reactive = reactive;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bundle.js.map

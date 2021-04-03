// proxy 和 reflect 连用 （reflect 以后会取代掉 object上一系列法 ）

import { reactive } from "./reactive";
import { hasChange, hasOwn, isArray, isObject } from "../shared";
import { activeEffect, effectStack } from "./effect";
import { track } from "./effect";
import { trigger } from "./effect";
export const mutableHandlers = {
    // 目标原对象 属性 代理后的对象
    get(target, key, recevier) {  // 内置的 proxy中get和set参数是固定的
        let res = Reflect.get(target, key, recevier);

        if(typeof key == 'symbol'){ // 如果是内置的symbol 就排除掉依赖收集
            return res;
        }
        track(target,key); // 属性 和 effect之间做一个关联

        if(res.__v_isRef){
            return res.value;
        }

       
        return  isObject(res) ? reactive(res) : res// taget[key]
    }, // 当取值的时候 应该将effect 存储起来
    set(target, key, value, recevier) {
        const oldValue = target[key]; // 上一次的结果


        // 如果是数组 就比较当前新增的属性 是否比长度大，大的话就是以前没有新增的

        const hadKey = isArray(target) && (parseInt(key,10) == key)? Number(key) < target.length: hasOwn(target,key);

        let result = Reflect.set(target, key, value, recevier);
        // 调用push方法 会先进行添加属性 在去更新长度（这次长度更新是没有意义的）
        if(!hadKey){
            trigger(target,'add',key,value); // 触发新增操作
        }else if(hasChange(oldValue,value)){
            trigger(target,'set',key,value);
        }
        // 设置一般分为两种一种是添加新的属性,还有种是修改属性
        return result
    } // 当设置值的时候 应该通知对应的effect来更新
}

// 默认加载页面时 会先调用一次effect，此时effect方法中的数据会进行取值操作 -》 get方法
//                让对应的属性保存当前的effect  =>  某个对象中 name属性  对应的effect有几个

// 某个对象中 name属性 变化了 ， 需要找到对应的effect列表让他依次执行

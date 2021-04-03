import { reactive } from "./reactive";
import { hasChange, isArray, isObject } from "../shared";
import { track, trigger } from "./effect";

const convert = (val) => isObject(val)?reactive(val):val
class RefImpl {
    public _rawValue;
    public readonly __v_isRef =  true;;
    public _value;
    constructor(public rawValue) { // rawValue类型
        this._rawValue = rawValue;
        this._value = convert(rawValue)
    }
    get value(){ // 属性访问器 这里新增了value属性
        track(this,'value'); // {this:{value:[effect]}}  depend
        return this._value
    }
    set value(newValue){
        if(hasChange(newValue,this._rawValue)){ // 如果值有变化再去触发更新，如果值没发生变化 就不要再次触发更新了
            this._rawValue = newValue
            this._value =  convert(newValue);
            trigger(this,'set','value'); // notify
        }
    }
}
export function ref(rawValue){
    return new RefImpl(rawValue)
}

class ObjectRefImpl{
    constructor(public _object,public _key){
    }

    // 代理操作 vue2 this._data 代理到vm上一个意思
    get value(){
        return this._object[this._key]; // 读取的是原值 （原来的值都不是响应式 那不能是响应的）
    }
    set value(newValue){
        this._object[this._key] = newValue
    }
}
export function toRefs(object){ // object可能是数组

    const result = isArray(object)? new Array(object.length) : {}

    for(let key in object){
        result[key] = new ObjectRefImpl(object,key);
    }

    return result
}


import { effect, track, trigger } from "./effect";
import { isFunction } from "../shared";
class ComputedRefImpl{
    public effect;
    public __v_isReadonly = true;
    public readonly __v_isRef = true;
    public _dirty = true;
    private _value;
    public setter;
    constructor(getter, setter){
        this.setter = setter;
        // 默认getter执行的时候会依赖于一个effect （计算属性默认就是一个effect）
        this.effect = effect(getter,{
            lazy:true, // 标识默认的时候 不会执行
            scheduler:()=>{ // 默认就算属性依赖的值变化会执行scheduler方法
                this._dirty = true;// 依赖的值变化了 变成脏值
                trigger(this,'set','value');
            }
        });
    }
    get value(){ // 类属性描述器
        if(this._dirty){ // 缓存
            this._value = this.effect();
            track(this,'value'); // 取值时收集依赖 {this:{'value':[effect]}
            this._dirty = false;
        }
        return this._value
    }
    set value(newValue){ // 自动去调用用户的set即可  myAge.value = xxx
        this.setter(newValue)
    }
}
export function computed(getterOrOptions){
    // 分别拿到get和set
    let getter;
    let setter;

    if(isFunction(getterOrOptions)){
        getter = getterOrOptions;
        setter = ()=>{console.log('computed  not set value')}
    }else{
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    return new ComputedRefImpl(getter,setter);
}
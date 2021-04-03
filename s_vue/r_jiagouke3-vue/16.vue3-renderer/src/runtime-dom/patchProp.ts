


function patchStyle(el,prev,next){
    // 如果元素next属性没有值
    const style = el.style; // 获取之前的样式
    if(!next){
        el.removeAttribute('style'); // 直接删除即可
    }else{
        for(let key in next){ // 用新的全量覆盖老的
            style[key] = next[key];
        }
        if(prev){
            for(let key in prev){ // 看老的有的新的没有 将样式移除
                if(!next[key]){
                    style[key] = '';
                }
            }
        }
    }
}
export function patchClass(el,next){
    if(next == null){
        next = '';
    }
    el.className = next;
}
export function patchAttr(el,key,value){
    if(value == null){
        el.removeAttribute(key);
    }else{
        el.setAttribute(key,value);
    }
}
export function patchProp(el,key,prevValue,nextValue){ // updateProperties
    switch (key) {
        case 'style':
            patchStyle(el,prevValue,nextValue);
            break;
        case 'className':
            patchClass(el,nextValue);
            break;
        default:
            patchAttr(el,key,nextValue);
    }
         
       
}
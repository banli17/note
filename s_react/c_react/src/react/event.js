import {updateQueue} from './component';

export function addEvent(dom, eventType, handleClick) {
    //我要给dom绑定一个onclick事件回调函数,handleClick
    let store;
    if (dom.store) {
        store = dom.store;
    } else {
        dom.store = {};
        store = dom.store;
    }
    //let store = dom.store || (dom.store = {});
    store[eventType] = handleClick;//store.onclick = handleClick
    if (!document[eventType]) {
        //事件委托，不管你给哪个DOM元素上绑事件，最后都统一代理到document上去了
        document[eventType] = dispatchEvent;//document.onclick=dispatchEvent;
    }
}

let syntheticEvent = {};

//原生的DOM
function dispatchEvent(event) {
    let {target, type} = event;//事件源=button那个DOM元素 类型type=click
    let eventType = `on${type}`;//onclick
    updateQueue.isBatchingUpdate = true;//把队列设置为批量更新模式
    createSyntheticEvent(event);
    while (target) {
        let {store} = target;
        let handleClick = store && store[eventType];
        handleClick && handleClick.call(target, syntheticEvent);
        target = target.parentNode;
    }
    for (let key in syntheticEvent) {
        syntheticEvent[key] = null;
    }
    updateQueue.batchUpdate();//批量更新一下
}

function createSyntheticEvent(nativeEvent) {
    for (let key in nativeEvent) {
        syntheticEvent[key] = nativeEvent[key];
    }
}

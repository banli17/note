import { createRenderer } from "../runtime-core/index";
import {nodeOps} from './nodeOps'

import {patchProp} from './patchProp'

function ensureRenderer(){
    return createRenderer({...nodeOps,patchProp}); // 传入一些dom的api操作 创建、删除、添加、属性更新
}
export function createApp(rootComponent){ // rootComponent => App
    const app = ensureRenderer().createApp(rootComponent); // 核心调用内层 runtime-core 中的createApp方法
    const {mount} = app;
    app.mount = function (container) {
        // 外层需要做元素清空操作
        container  = document.querySelector(container);
        container.innerHTML = '';// 清空容器中的内容
        mount(container); // 调用底层的mount方法
    }
    return app;
}

// vue3 默认使用的时候就是runtime-dom这个包
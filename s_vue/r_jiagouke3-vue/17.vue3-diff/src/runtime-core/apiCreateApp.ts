import { createVNode } from "./vnode";
export function createAppApi(render) { // createAppApi
    return (component)=>{ // 外层使用的createApp
        let app = {
            mount(container) {
                // (ast => codegen) => render => vnode => dom

                // 根据传入的组件 创建一个组件的虚拟节点 


                const vnode = createVNode(component);

                render(vnode,container);
            }
        }
        return app;
    }
}
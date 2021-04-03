export default {
    functional: true,
    name: 'router-view',
    render(h, { data, parent }) { // class组件 Vue.extend  函数式组件 函数可以节省性能 缺陷就是没有实例
        let route = parent.$route; // 会做依赖收集了
        let depth = 0;
        let records = route.matched; // []
        data.routerView = true; // 渲染router-view时标记他是一个routerView


        // 看之前渲染过几个router-view 父 -> 子

        while (parent) { // _vnode 
            if (parent.$vnode && parent.$vnode.data.routerView) {
                console.log(parent);
                depth++;
            }
            parent = parent.$parent;
        }

        let record = records[depth];
        if (!record) {
            return h();
        }
        return h(record.component, data)
    }
}

{ /* <my></my> // {type:{name:'vue-component-1-my'}}  $vnode   */ }

{ /* <div></div> // {type:'div',{},null}  _vnode    */ }

// 页面中有两个router-view  [app里 routerView:true ,  about里的]  => [{about:record},{about/a,record}]


// 1-> router-view  :router-view   /a/b/c  => [/a, /a/b, /a/b/c]
// 2-> router-view  :router-view
// 3-> router-view
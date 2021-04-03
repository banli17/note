import createApp from './app';

export default (context) => {
    let url = context.url
    return new Promise((resolve, reject) => {
        // 我们需要在服务端把对应的页面先渲染出来
        const { app, router ,store} = createApp(); //  创建了一个应用 


        router.push(url); // 服务端跳转页面

        // 我配置了 理由懒加载 但是没有分包

        router.onReady(() => { // 表示组件已经准备完毕 防止有异步组件没有加载完成
            const matchComponents = router.getMatchedComponents();
            if(!matchComponents.length){ // 服务端跳转页面跳转后 并没有匹配到具体组件
                return reject({code:404});
            }
            // nuxtjs 里面的方法 就叫asyncData
            Promise.all(matchComponents.map(component=>{
                if(component.asyncData){ // 此方法是为了在服务端进行请求的
                    return component.asyncData(store)
                }
            })).then(()=>{
                context.state = store.state; // 相当于把服务端的状态放到了上下文中, 自动注入window变量
                resolve(app);
            },reject)
            // return app; // createRenderer().renderToString(vm)
        },reject);
       
    })

}
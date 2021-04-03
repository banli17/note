export function createRoute(record, location) {
    let res = [];

    // /about /about/a
    if (record) {
        while (record) {
            res.unshift(record)
            record = record.parent;
        }
    }
    return {
        ...location,
        matched: res
    }
}


function runQueue(queue,iterator,cb) {
    function next(index){
        if(index >= queue.length){
            return cb() // 一个都没有 或者钩子全部执行完毕 直接调用cb完成渲染即可
        }else{
            let hook = queue[index];
            iterator(hook,()=>next(index+1))
        }
    }
    next(0);
}

export default class History {
    constructor(router) {
        this.router = router;
        this.cb = null;
        // 最终核心 需要将current属性变化成响应式的 后续current变化会更新视图 

        // /about/a => [/about  /about/a]
        this.current = createRoute(null, { // this.current = {path:'/',matched:[]}
            path: '/'
        });
    }

    // 根据路径进行组件渲染 数据变化 想更新视图
    transitionTo(location, onComplete) { // 默认会先执行一次

        // 根据跳转的路径 获取匹配的记录
        let route = this.router.match(location); // route = {path:'/about/a',matched:[{},{}]}


        let queue = [].concat(this.router.beforeEachHooks);

        const iterator =(hook,cb) => {
           hook(route,this.current,cb);
        }

        runQueue(queue,iterator, () => {
            this.current = route; // current变量引用地址变了
            this.cb && this.cb(route); // ---->
            onComplete && onComplete(); // cb调用后hash 值变化会再次调用transitionTo
        });


    }
    listen(cb) {
        this.cb = cb;
    }
}   
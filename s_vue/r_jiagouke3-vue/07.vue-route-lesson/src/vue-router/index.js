import createMatcher from "./create-matcher";
import HashHistory from "./history/hash";
import BrowserHistory from "./history/history";
import { install,_Vue} from "./install";

// 我们每次拿值时 都是通过 接口获取值，所以可以拿到最新的值

// 路由的核心原理 就是根据路径 返回对应的组件
export default class VueRouter{
    constructor(options){
        // 根据用户的配置生成一个映射表 ，稍后跳转时 根据路径找到对应的组件来进行渲染

        // 创建匹配器后，核心的方法就是匹配 
        // match  addRoutes
        this.matcher = createMatcher(options.routes || []);
        this.beforeEachHooks = []
        // 根据当前的mode 创建不同的history 管理策略
        switch (options.mode) {
            case 'hash':
                this.history = new HashHistory(this)
                break;
            case 'history':
                this.history = new BrowserHistory(this)// Html5History
        }
    }   
    match(location){
        return this.matcher.match(location);
    }
    push(location){
        this.history.push(location);
    }   
    beforeEach(fn){
        this.beforeEachHooks.push(fn);
    }
    init(app){ // app 根实例
        // 路由初始化
        // 初始化后 需要先根据路径做一次匹配，后续根据hash值的变化再次匹配
        const history= this.history; // history的实例 
        const setupListener = ()=>{ // 切片编程
            history.setupListener(); // 监听hash值变化
            // todo...
        }// history模式
        history.transitionTo(history.getCurrentLocation(),setupListener); // 跳转到哪里

        history.listen((route)=>{ // 改变了 响应式数据
            app._route = route;
        })
    }
}

VueRouter.install = install;
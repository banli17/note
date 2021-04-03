import History from './base';


function ensureSlash(){
    if(window.location.hash){
        return;
    }
    window.location.hash = '/'
}
function getHash(){
    return window.location.hash.slice(1);
}
export default class HashHistory extends History {
    constructor(router){
        super(router);

        // 默认hash模式需要加 #/
        ensureSlash();
    }
    setupListener(){ // 监听
        // hash的性能不如popstate 好用，监听浏览器历史记录的变化
        window.addEventListener('hashchange',()=>{
            // 根据当前hash值 去匹配对应的组件
            // todo...
            this.transitionTo(getHash());
        })
    }
    getCurrentLocation(){
        return getHash();
    }
    // history.push()

    push(location){
        window.location.hash = location
    }
    // hash模式的核心功能就是 监听hash值的变换  window.addEventListener('hashchange')

}

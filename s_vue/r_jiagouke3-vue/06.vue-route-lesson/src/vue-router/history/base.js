export default class History {
    constructor(router) {
        this.router = router;
    }
    transitionTo(location, cb) { // 默认会先执行一次
        console.log(location); // match  
        cb && cb(); // cb调用后hash 值变化会再次调用transitionTo
    }
}
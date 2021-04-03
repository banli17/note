let id = 0;
class Watcher {
    constructor(vm,fn,cb,options){
        this.vm = vm;
        this.fn = fn;
        this.cb = cb;
        this.options = options;
        this.id = id++;
        this.fn(); // 调用传入的函数
    }
}
export default Watcher;
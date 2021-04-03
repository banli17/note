import { forEachValue } from "../util";
import Module from './module'
export default class ModuleCollection {

    constructor(options) { // 遍历用户的属性对数据进行格式化操作
        this.root = null;
        this.register([], options);
    }
    getNamespace(path) { //  ['a','c','e']
        let module = this.root;
        return path.reduce((namepsace, key) => { // a/c/e/
            module = module.getChild(key);    
            return namepsace + (module.namespaced ? key + '/' : '')
        }, '');
    }
    register(path, rootModule) {
        let newModule = new Module(rootModule)
        if (path.length == 0) {
            this.root = newModule
        } else {
            // 我需要将当前模块 定义在父亲的身上
            // [a]  // [a,c] // [a,c,e]  // [b]
            let parent = path.slice(0, -1).reduce((memo, current) => {
                // this.root._children[a]
                // this.root._children[a]._children[c]
                // return memo._children[current];
                return memo.getChild(current);
            }, this.root)
            // this.root._children[a]._children[c]._children[e] = newModule
            parent.addChild(path[path.length - 1], newModule)
            // parent._children[path[path.length-1]] = newModule;
        }
        if (rootModule.modules) {
            forEachValue(rootModule.modules, (module, moduleName) => {
                this.register(path.concat(moduleName), module)
            })
        }
    }
}

// router => createRouteMap()  routeMap;  =》 addRoute
// vuex => 树   => 动态注册其他模块
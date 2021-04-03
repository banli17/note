import util from './util'
import Module from './module'

export default class ModuleCollection {
    constructor(options) {
        this.allModule = {}
        this.register([], options)
    }

    getNamespaced(path) {
        let root = this.root
        console.log('path', path, root)
        return path.reduce((str, key) => {
            root = root.getChild(key)
            return str + (root.namespaced ? (key + '/') : '')
        }, '')
    }

    register(path, module) {
        let newModule = new Module(module)
        // {
        //     _raw: module,
        //     _children: {},
        //     state: module.state,
        // }

        this.allModule[path] = newModule
        if (path.length === 0) {
            this.root = newModule
            // console.log('this.root', this.root, this.allModule)
        } else {
            // let parent = path.slice(0, -1).reduce((memo, current) => {
            //     console.log(memo, current)
            //     return memo._children[current]
            // }, this.root)
            let parent = this.allModule[path.slice(0, path.length - 1)]
            // parent._children[path[path.length - 1]] = newModule
            // console.log('parent', parent)
            parent.addChild(path[path.length - 1], newModule)
        }

        if (module.modules) {
            util.forEach(module.modules, (moduleName, subModule) => {
                const modulePath = path.concat(moduleName)
                this.register(modulePath, subModule)
            })
        }
    }
}

import util from "./util";

class Module {
    get namespaced() {
        return !!this._raw.namespaced
    }

    constructor(module) {
        this._raw = module
        this._children = {}
        this.state = module.state
    }

    addChild(key, child) {
        this._children[key] = child
    }

    getChild(key) {
        return this._children[key]
    }

    forEachMutation(callback) {
        if (this._raw.mutations) {
            util.forEach(this._raw.mutations, callback)
        }
    }

    forEachAction(callback) {
        if (this._raw.actions) {
            util.forEach(this._raw.actions, callback)
        }
    }

    forEachGetter(callback) {
        if (this._raw.getters) {
            util.forEach(this._raw.getters, callback)
        }
    }

    forEachChildren(callback) {
        util.forEach(this._children, callback)
    }
}

export default Module

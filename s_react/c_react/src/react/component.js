import {createDOM, findDOM} from './react-dom'
import {isFunction} from './utils';

export let updateQueue = {
    isBatchingUpdate: false,
    updaters: new Set(),
    add(updater) {
        updateQueue.updaters.add(updater)
    },
    batchUpdate() {
        // 批量更新
        updateQueue.isBatchingUpdate = false
        for (let updater of updateQueue.updaters) {
            updater.emitUpdate()
        }
        updateQueue.updaters.clear()
    }
}

class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance;
        this.pendingStates = [];  // 存放 state 的对象队列
        this.pendingCallbacks = []
        this.initial = true
    }

    addState(partialState, callback) {
        this.pendingStates.push(partialState);
        if (!callback) {
            callback = () => {
            }
        }
        this.pendingCallbacks.push(callback)
        // console.log('this.pendingCallbacks', this.pendingCallbacks)

        // console.log('callback', callback)
        this.emitUpdate()
    }

    getState() {
        let {classInstance, pendingStates} = this;
        let {state} = classInstance
        if (pendingStates.length) {
            for (let i = 0; i < pendingStates.length; i++) {
                let nextState = pendingStates[i]
                if (typeof nextState === 'function') {
                    nextState = nextState.call(classInstance, state)
                }
                state = {...state, ...nextState}
            }
            pendingStates.length = 0
        }
        return state
    }

    // 立即更新，pendingStates 里面只有一个
    emitUpdate(nextProps) {
        // 如果是批量更新
        if (updateQueue.isBatchingUpdate) {
            return updateQueue.add(this)
        }
        this.updateComponent()
    }

    updateComponent() {
        let {classInstance, pendingStates, pendingCallbacks} = this;
        // console.log('pendingCallbacks', pendingCallbacks)
        if (pendingStates.length > 0) {
            if (this.shouldUpdate(classInstance, this.getState())) {
                classInstance.forceUpdate()
                pendingCallbacks.forEach(cb => cb())
                pendingCallbacks.length = 0
                this.initial = false
            }
        }
    }

    shouldUpdate(classInstance, state) {
        // 不管更新与否，都要改变状态
        classInstance.state = state

        // 如果是第一次，不需要更新，因为它会 render
        if (this.initial) {
            this.initial = false
            return false
        }
        if (classInstance.shouldComponentUpdate
            && !classInstance.shouldComponentUpdate(classInstance.props, classInstance.state)) {
            return false
        }
        return true
    }


}

class Component {
    // 静态属性拷贝时有可能丢失，所以 React 放在了原型上
    static isReactComponent = true

    constructor(props) {
        this.props = props;
        this.state = {}
        this.updater = new Updater(this)
    }

    setState(partialState, callback) {
        // this.state = {...this.state, ...partialState}
        // console.log('state', this.state)
        // this.updateComponent()
        this.updater.addState(partialState, callback);
    }

    // 用新节点替换旧节点
    updateComponent() {
        // 根据新 state 重新render，得到新 vdmo
        let newRenderVdom = this.render()
        let oldDOM = findDOM(this.oldRenderVdom);
        let newDOM = createDOM(newRenderVdom);
        // console.log(oldDOM, oldDOM.parentNode)
        oldDOM.parentNode.replaceChild(newDOM, oldDOM);
        this.oldRenderVdom = newRenderVdom;
    }

    forceUpdate() {
        if (this.componentWillUpdate) {
            this.componentWillUpdate()
        }

        this.updateComponent();

        if (this.componentDidUpdate) {
            this.componentDidUpdate()
        }
    }

    render() {
        throw new Error('需要子类自己实现 render')
    }
}

export default Component;

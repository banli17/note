# redux

## redux是什么

## redux什么时候用

## 基本概念和API

### store

store是保存数据的地方，整个应用只有一个store。可以使用`createStore`来生成store。

```
import { createStore } from 'redux'
const store = createStore(fn)
```

### state

store某个时刻的数据，叫做state。当前时刻的state，可以通过`store.getState()`得到。

```javascript
import { createStore } from 'redux'
const store = createStore(fn)

const state = store.getState()
```

redux规定，一个state对应一个View，state相同，view就相同。反之亦然。

### action

用户操作 view，view 会发出 action，改变 state。action 是一个对象，其中`type`属性是必须的，表示 action 的名称。

```javascript
const action = {
    type: 'ADD_TODO',
    payload: 'Learn Redux'
}
```

### action creator

view 发出多少种消息，就需要多少种 action。如果手写，很麻烦。可以用 action creator 来生成 action。

```javascript
cosnt ADD_TODO = '添加 TODO'

function addTodo(text){
    return {
        type: ADD_TODO,
        text
    }
}

const action = addTodo('Learn Redux')
```

### store.dispatch()

`store.despatch()`是 view 发出 action 的唯一方法。

```javascript
import { createStore } from 'redux'
const store = createStore(fn)

store.dispatch({
    type: 'ADD_TODO',
    payload: 'Learn Redux'
})
```

结合 action creator，代码可以改写成如下：

```javascript
store.dispatch(addToDo('Learn Redux'))
```

### reducer

store 收到 action，必须给出一个新的 state，这样 view 才会变化。这种 state 计算过程叫做 reducer。

reducer 是一个函数，它接受 action 和当前 state 作为参数，返回一个新的 state。

```javascript
const reducer = function(state, action){
    return new_state
}
```

整个应用的初始状态，可以作为 state 的默认值。

```javascript
const defaultState = 0
const reducer = (state = defaultState, action) => {
    switch( action.type ){
        case 'ADD':
            return state + action.payload
        default:
            return state
    }
}

const state = reducer(1, {
    type: 'ADD',
    payload: 2
})
```

reducer 收到 ADD 的 action 后，返回一个新 state。

实际应用中，reducer 不需要像上面这样手动调用，store.dispatch 方法会触发 reducer 的自动执行。为此，store 需要知道 reducer 函数，做法就是在生成 store 的时候，将 reducer 传入 createStore 方法。

```javascript
import { createStore } from 'redux'
const store = createStore(reducer)
```

上面的代码，传入 reducer 参数生成一个新 store。以后执行 `store.dispatch` 发出 action，就会自动调用 reducer，得到新的 state。

为什么叫 reducer？因为它可以作为数组的 reduce 方法的参数。

```javascript
const actions = [
    { type: 'ADD', payload: 0 },
    { type: 'ADD', payload: 1 },
    { type: 'ADD', payload: 2 },
]

const total = action.reduce(reducer, 0)  // 3
```

reducer 是一个纯函数。即同样的输入，必定得到同样输出。纯函数编程约束如下：

1. 不能改写参数。
2. 不能调用系统 I/O 的 API。
3. 不能调用 Date.now() 或 Math.random() 等不纯的方法，因为每次回得到不一样的结果。

由于 reducer 是纯函数，这就可以保证同样的 state，必定得到同样的 view。正因为如此，reducer 不能改变 state，必须得到一个全新的对象。

```javascript
function reducer(state, action){
    return Object.assign({}, state, {thingToChange})
    // 或者
    return {...state, ...newState}
}
```

最好将 state 对象设置为只读，这样就没法改变它了。

### store.subscribe()

`store.subscribe()`可以设置监听函数，一旦 state 发生变化，就自动执行这个函数。

```javascript
import { createStore } from 'redux'
const store = createStore(reducer)

store.subscribe(listener)
```

所以只要把 View 的更新函数放到里面，state 变化时，它就会自动渲染。

`store.subscribe`返回一个函数，调用这个函数可以解除监听。

```javascript
let unsubscribe = store.subscribe(()=>{
    console.log(store.getState)
})

unsubscribe()
```

### store的简单实现

createStore可以接受第二个参数，表示 state 的最初状态。通常是服务器给出的。

```javascript
let store = createStore(todoAPP, window.state_from_server)
```

下面是store的简单实现。

```javascript
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```

### reducer的拆分

reducer 负责生成 state，由于只有一个 state，所以对于大型应用来说 state 很大，导致 reducer 也很大。比如下面的代码：

```javascript
const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });
    case CHANGE_STATUS:
      return Object.assign({}, state, {
        statusMessage: payload
      });
    case CHANGE_USERNAME:
      return Object.assign({}, state, {
        userName: payload
      });
    default: return state;
  }
};

const chatReducer = (state = defaultState, action = {}) => {
  return {
    chatLog: chatLog(state.chatLog, action),
    statusMessage: statusMessage(state.statusMessage, action),
    userName: userName(state.userName, action)
  }
};
```

实际这几个 state 的属性没有联系，所以可以把 reducer 按照同属性处理进行拆分，最后再用`combineReducers`合并。

```javascript
import { combineReducers } from 'redux';

const chatReducer = combineReducers({
  chatLog,
  statusMessage,
  userName
})

export default todoApp;
```

`combineReducer()`就是根据 state 的 key 执行相应的子 reducer，并返回合并后的大 state 对象。

下面是`combineReducer()`的简单实现。

```javascript
const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {}
    );
  };
};
```

可以把 reducer 放一个文件统一引用。

```javascript
import { combineReducers } from 'redux'
import * as reducers from './reducers'

const reducer = combineReducers(reducers)
```



























- [如何理解 Facebook 的 flux 应用架构？](https://www.zhihu.com/question/33864532)
http://www.redux.org.cn/docs/introduction/Motivation.html
 http://www.ruanyifeng.com/blog/2007/11/mvc.html

 http://www.ruanyifeng.com/blog/2016/01/flux.html
 http://facebook.github.io/flux/docs/in-depth-overview.html#content

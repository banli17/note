---
title: Redux 详解
---

### MVC 和 Flux

MVC 是软件工程中的一种软件架构模式。它把软件系统分为三个基本部分：模型(Model)、视图(View)、控制器(Controller)。

MVC 模式是 1978 年由 Trygve Reenskaug 提出的，目的是实现一种动态的程序设计，简化后续对程序的修改和扩展，并使程序可以重复利用。

MVC 注重程序的分层，举例 js 版代码如下：

```
// 模拟 model view controller
var M = {}, V = {}, C = {}

// Model 存放数据
Model.name = '张三'

// View 负责渲染数据
V.render = (M) => {alert(M.name)}

// Controller 负责连接 Model 和 View
C.update = () => V.render(M)

// 用户操作时
div.onClick = C.update
```

MVC 在服务端使用没有问题，但是在客户端，一般的框架都支持视图和数据的双向绑定，即 View 直接影响 Model，这样就出现了下图所示的情况。

![](imgs/2020-06-01-14-24-23.png)

上图中， View1 操作了 Model1，而 Model1 又更新了 View2，这样就会造成混乱，不知道是哪里改变了 Model。是控制器？ 还是哪个视图？。

上面的解决方案就是将上图中 Model 单向指向 View，而 View 指向 Action。

Facebook 在开发聊天系统时遇到了这个问题，所以提出了 Flux 架构。

![](imgs/2020-06-01-14-38-23.png)

Flux 的核心是单向数据流，它的流程如下：

1. 首先要有 action，通过定义一些 action creator 方法根据需要创建 Action 提供给 dispatcher。
2. View 层通过用户交互(比如 onClick) 会触发 Action。
3. Dispatcher 会分发触发的 Action 给所有注册的 Store 的回调函数。
4. Store 回调函数根据接收的 Action 更新自身数据之后会触发一个 change 事件通过 View 数据更改了。
5. View 会监听这个 change 事件，拿到最新的数据并调用 `setState` 更新组件 UI。

## Redux

Redux 也是基于 flux 思想实现的，它相比其它一些 Flux 实现方案，使用起来更加简单。

Redux 的三个基本原则：

1. 整个应用只有唯一的可信数据源，也就是只有一个 Store。
2. State 只能通过 Action 来改变。
3. State 的更改必须写出纯函数，也就是每次返回一个新的 State，在 Redux 里这种函数叫做 Reducer。

> 注：纯函数就是无副作用的函数，如果输入确定，那么输出一定确定，并且不会改变外部状态(如输入的数据)。

### Actions

动作 Action 必须有一个 type 属性。

```js
{
    type: 'ADD_TODO',
    payload: 'hello'
}
```

一般来说，动作 Action 可以用 Action Creator 来生成，然后通过 `store.dispatch()` 来派发动作给 Store。。

```js
// 生成 action
function addTodo(text){
    return {
        type: 'ADD_TODO',
        payload: text
    }
}

// 派发
store.dispatch(addToto('hello))
```

### Reducers

Reducers 是用来处理 Action 触发对 State 的更改。所以一个 reducer 函数会接受两个参数：oldState 和 action，返回一个新的 newState。

```js
const initialState = {
    text: "要做的事情",
};

function reducerA(state = initialState, action) {
    switch (action.type) {
        case "ADD_TODO":
            return { ...state, text: action.payload.text };
        default:
            return state;
    }
}
```

要注意的是：

1. 要返回一个完全新的对象 `newState`。
2. 对于不需要处理的情况，直接返回 oldState。

由于模块化的思想，一个应用中可能会很多个 reducers，而所有的 reducer 都要处理每个 action，这样我们最终就需要将它们合并成一个 reducer。Redux 提供了一个工具函数 `combineReducers` 来进行 reducer 的合并。

```js
import { combineReducers } from "redux";

// root reducer
const rootReducer = combineReducers({
    a: reducerA,
    b: reducerB,
});
```

### Store

Store 的作用是：

1. 持有整个应用的 state 状态树。
2. 提供一个 `getState()` 方法获取 state。
3. 提供一个 `dispatch()` 方法触发 action 更改 state。
4. 提供一个 `subscribe()` 方法注册回调函数监听 state 的更改。

可以通过 createStore() 来创建 Store。

```js
import { createStore } from "redux";
import rootReducer from "./reducers";

// 创建 store
let store = createStore(rootReducer);

let unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch
store.dispatch({ type: "ADD_TODO", payload: "吃饭" });

// 停止监听
unsubscribe();
```

### Redux 数据流

所以 redux 的单向数据流如下：

1. View -> action -> dispatch：`dispatch(action)`
2. 更新 model：`reducer(state, action)`
3. 更新 View: `store.getState()`

## 参考资料

-   [WEB 前端开发 Data Flow](http://caibaojian.com/react/data-flow.html)
-   [https://redux.js.org/introduction/getting-started](https://redux.js.org/introduction/getting-started)
-   [https://facebook.github.io/flux/](https://facebook.github.io/flux/)

# React-Redux 使用与实现

react-redux 的主要功能是:

- Provider 的 store，可以在下层组件里通过 mapStateToProps 拿到对应的属性
- 通过 connect 注入 mapStateToProps 数据 和 dispatch 方法

## 基础用法

使用 react-redux 的方法是：

1. 外层组件套 Provider，提供一个 store
2. 内层组件使用 connect 注入需要的属性

```js
import React from "react";
import { createStore } from "redux";
import { Provider, connect } from "./react-redux";

const reducer = function (state = { count: 1, age: 12 }, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

const store = createStore(reducer);

class Child extends React.Component {
  add = () => {
    this.props.dispatch({
      type: "ADD",
    });
  };
  render() {
    return (
      <div>
        <div>{this.props.count}</div>
        <button onClick={this.add}>增加</button>
      </div>
    );
  }
}
const ConnectedChild = connect((state) => {
  return { count: state.count };
})(Child);

class DEMO extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedChild />
      </Provider>
    );
  }
}

export default DEMO;
```

## Provider 与 connect

**ReactReduxContext.js**

```
import React from 'react'
const ReactReduxContext = React.createContext({})
export { ReactReduxContext }
```

**Provider.js**

```
import React from 'react'
import { ReactReduxContext } from './ReactReduxContext'

function Provider(props) {
  return <ReactReduxContext.Provider value={props.store}>
    {props.children}
  </ReactReduxContext.Provider>
}

export { Provider }
```

**connect.js**

```js
import React from "react";
import { ReactReduxContext } from "./ReactReduxContext";

function connect(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return class extends React.Component {
      static contextType = ReactReduxContext;
      componentDidMount() {
        const { subscribe } = this.context;
        this.unsubscribe = subscribe(() => {
          this.forceUpdate();
        });
      }
      componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
      }
      render() {
        const { getState, subscribe, dispatch } = this.context;
        // 这里 mapDispatchToProps 有很多种可能：函数、对象等等
        let dispatchProps;
        if (typeof mapDispatchToProps === "object") {
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        } else if (typeof mapDispatchToProps === "function") {
          dispatchProps = mapDispatchToProps(dispatch, props);
        } else {
          dispatchProps = { dispatch };
        }
        const toProps = {
          ...mapStateToProps(getState()), // 状态转属性
          ...dispatchProps,
        };
        return <OldComponent {...this.props} {...toProps} />;
      }
    };
  };
}

export { connect };
```

上面的 connect 里还可以返回一个函数组件形式，写法类似：

```js
import React, { useContext, useMemo, useLayoutEffect, useReducer } from "react";
import { bindActionCreators } from "../redux";
import ReactReduxContext from "./ReactReduxContext";
export default function (mapStateToProps, mapDispatchToProps) {
  return function (WrappedComponent) {
    return function (props) {
      const { store } = useContext(ReactReduxContext);
      const { getState, dispatch, subscribe } = store;
      const prevState = getState();
      const stateProps = useMemo(() => mapStateToProps(prevState), [prevState]);
      const dispatchProps = useMemo(() => {
        let dispatchProps;
        if (typeof mapDispatchToProps === "object") {
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        } else if (typeof mapDispatchToProps === "function") {
          dispatchProps = mapDispatchToProps(dispatch, props);
        } else {
          dispatchProps = { dispatch };
        }
        return dispatchProps;
      }, [dispatch, props]);
      const [, forceUpdate] = useReducer((x) => x + 1, 0);
      useLayoutEffect(() => subscribe(forceUpdate), [subscribe]);
      return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
    };
  };
}
```

## hooks

最新 react-redux 里提供了 hooks 的用法，可以在函数组件内使用，非常方便。

- useStore
- useSelector
- useDispatch

**useSelector()**

```js
import { useContext, useLayoutEffect, useReducer } from "react";
import { ReactReduxContext } from "../ReactReduxContext";
function useSelectorWithStore(selector, store) {
  let [, forceRender] = useReducer((x) => x + 1, 0); //useState
  let storeState = store.getState(); //获取总状态
  let selectedState = selector(storeState);
  // 订阅更新
  useLayoutEffect(() => {
    return store.subscribe(forceRender);
  }, [store]);
  return selectedState;
}

function useSelector(selector) {
  const store = useContext(ReactReduxContext);
  const selectedState = useSelectorWithStore(
    //选择器 比较两个值是否相等
    selector,
    store
  );
  return selectedState;
}

export default useSelector;
```

**useDispatch**

```js
import { useContext } from "react";
import { ReactReduxContext } from "../ReactReduxContext";

const useDispatch = () => {
  const store = useContext(ReactReduxContext);
  return store.dispatch;
};

export default useDispatch;
```

# React-Redux

## 学习资料

- [Redux 入门教程（三）：React-Redux 的用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)


## 简介

React-Redux 将组件分为两类：UI组件(presentational component) 和容器组件 (container component)。

UI组件特征：
1. 只负责 UI，不带任何逻辑
2. 没有状态，即不使用 this.state
3. 所有数据由 this.props 提供
4. 不使用任何 Redux 的 API

容器组件：
1. 负责数据和业务逻辑，不负责 UI 的呈现
2. 由内部状态
3. 使用 Redux 的 API

React-Redux规定，UI组件是自定义的，容器组件由`connect()`方法生成。状态管理全部交给它来完成。

## UI组件和容器组件的连接

`connect()`方法用于将UI组件生成容器组件。

```javascript
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
    return {
        todos: resetTodos(state.todos, state.filter)
    }
}

const resetTodos = (todos, filter) => {
    switch(filter){
        ...
    }
}

const mapDispatchToProps = {
    onClick: (filter) => {
        type: 'ADD',
        filter
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)
```


## Provider

Provider用于方便组件之间传递state。

```javascript
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```







































































---
title: "React学习"
---

## 基础知识

> npx 的工作原理?

> create-react-app

> 怎么让 html 不转义？

```html
<div dangerouslySetInnerHTML="{{__html:html}}"></div>
```

## React 官方文档学习

- [Hooks](/react/hooks/)

## 使用技巧

- [正确的使用 Redux](/react/redux-use/)

## React 源码阅读

# react 实战进阶

https://doc.react-china.org/docs/thinking-in-react.html

## 历史背景和特点

因为 facebook 的一个消息需求上线后经常出现 bug。

- 传统 dom api 关注太多的细节。
- 应用程序状态分散，难以追踪和维护。

思想

- 始终整体刷新页面，前后是 2 个状态，状态变化后，自动进行更新。只需要关系状态。

例如，有个新消息要插入界面，jquery 需要创建节点，插入。但是 react 关心的是将消息展现在 UI 上。消息条数变化，就自动更新了。

特点：

- 1 个新概念：组件
- 4 个必须 API
- 单向数据流
- 完善的错误提示

React 解决了 UI 细节问题，还有数据模型的问题。

传统数据模型 MVC 难以扩展和维护，难以追踪是 M 还是 V 发生错误。

提出了 flux 架构：单向数据流。

![](./imgs/flux.png)

## 组件化方式思考 UI 构建

```
props + state -> view
```

- react 组件一般不提供方法，而是某种状态机。
- react 组件可以理解是一个纯函数。
- 单向数据绑定，数据一定是 props 传入。

### 受控组件和非受控组件

受控组件内部没有状态，状态由使用者维护。

```javascript
// 受控组件
<input
  type="text"
  value={this.state.value}
  onChange={(e) => {
    this.setState({
      value: e.target.value,
    });
  }}
/>
```

非受控组件内部维护状态，使用者需要使用 ref 来获取。

```
// 非受控组件
<input
    type="text"
    ref={node => this.input = node}
/>
```

创建组件的原则：单一职责原则。

1. 每个组件只做一件事。
2. 如果组件变得复杂，那么应该拆分成小组件。当改变状态时，大组件会整个刷新，小组件只有那个组件刷新。

数据状态管理：DRY 原则。

- 能计算得到的状态不要单独存储。比如 ajax 不需 loading 状态，通过 data 就可以得到。
- 组件尽量无状态，所需数据通过 props 获取。

## JSX 的本质：不是模板而是语法糖

```
// jsx
const name = 'Nate Wang'
const element = <h1>Hello, {name}</h1>

// 本质是动态创建组件
const name = 'Nate Wang'
const element = React.createElement(
    'h1',
    null,      // 属性
    'Hello, '  // 子元素
    name       // 子元素
)
```

好处是直接用 js 来模拟，换了种写法。而不是模板引擎。这样可以直接用 js 的特性。比如表达式。

```
// jsx本身是表达式
const element = <h1>Hello, {name}</h1>

// 在属性中使用
<component foo={1+2} />

// 延展属性
const props = {a:1,b:2}
<component {...props}/>

// 表达式作为子元素
const element = <h1>Hello, {name}</h1>
```

优点：

1. 声明式创建界面的直观
2. 代码动态创建界面的灵活
3. 无需学习新的模板语言

约定：自定义组件以大写字母开头

1. React 认为小写的 tag 都是原生的 DOM 节点，如 div
2. 大写字母开头的为自定义属性
3. jsx 标记可以使用属性语法，例如 <menu.Item> 这样就不需要遵循大写开头的约定

## 生命周期

![](./imgs/life.png)

http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

**constructor**

1. 用于初始化内部状态，很少使用
2. 唯一可以直接修改 state 的地方

**getDerivedStateFromProps**

1. 从属性初始化内部状态
2. 尽量不要使用：维护两者状态一致性会增加复杂度
3. 每次 render 都会调用
4. 典型场景：表单控件获取默认值

**componentDidMount**

1. UI 渲染完成后调用
2. 只执行一次
3. 典型场景：获取外部资源

**componentWillUnmount**

1. 移除时调用
2. 释放资源

**getSnapshotBeforeUpdate**

1. 在页面 render 前调用，state 已更新
2. 典型场景：获取 render 之前的 DOM 状态

**componentDidUpdate**

1. 每次 UI 更新时被调用
2. 典型场景：页面需要通过 props 变化获取新的数据

**shouldComponentUpdate**

1. 决定 Virtual DOM 是否要重绘
2. 一般由 PureComponent 自动实现，判断 props、state 是否变化，如果没变化会阻止更新。
3. 典型场景：性能优化

```
getSnapshotBeforeUpdate(){
    return prevScrollHeight
}

componentDidMount(prevProps,prevState, prevScrollHeight){

}
```

- [React JS：什么是 PureComponent？](http://lucybain.com/blog/2018/react-js-pure-component/)

## 注意事项

1. mapStateToProps 里的属性会触发 render，不管组件内是否用到了这个属性。只要触发了其它 action，组件也会 render。

## 理解 virtual dom 及 key 属性的作用

## 学习资料

- [Reactjs Hooks](https://reactjs.org/docs/hooks-intro.html)

## 简介

Hooks 是 React16.8 新增的功能。可以不写 class 就能使用 state 和其它 React 功能。

## 为什么出现

Hooks 出现的原因是为了解决下面几个问题。

### 组件之间有状态重用很困难

高阶组件试图解决这个问题，但是用起来很麻烦，还可能会导致"包装器地狱"(就是一层包一层，层级太多)。Hooks 可以提取出重用的有状态逻辑，而不改变组件的层次结构。

### 复杂组件变得难以理解

比如一个组件`componentDidMount()`里有请求数据和其它不相关的代码如事件监听，然后在`componentWillMount()`里清除事件监听。按道理来说事件的监听和清除应该放在一起，请求数据和监听事件不应该在一起，所以这让引入错误和不一致性变得容易。

在许多情况下，组件也不能拆分成更小组件，因为状态逻辑涉及整个组件。所以许多人喜欢将 React 和状态管理库结合使用，但是这又引入了很多抽象概念，而且要在不同文件之间跳转，组件复用也更加复杂。

Hooks 可以将组件拆分成小函数，而不是根据生命周期进行拆粉。

### class 让人和机器容易混淆

js 里的 class 是一个麻烦的东西，函数和 class 组件的区别也容易混淆。另外 class 让[工具对代码的优化变得复杂](https://github.com/facebook/react/issues/7323)。class 不能很好的缩小，让热更新不可靠。

所以 Hooks 允许您在没有 class 的情况下使用 React。

## 总览

Hooks 就是钩子，用来挂钩 React 状态和生命周期。Hooks 在 class 内部不起作用。

### State Hook

```javascript
import React, { useState } from "react";

export default function Example1() {
  const [count, setCount] = useState({ a: 1 });

  return (
    <div>
      <p>you click {count.a} times</p>
      <button onClick={() => setCount({ a: count.a + 1 })}>click me!</button>
    </div>
  );
}
```

### Effect Hook

有时候需要执行请求数据，订阅事件或者手动更改 DOM，这些操作叫做 Effect。Effect Hook 会在每次 DOM 更新后执行。类似（componentDidMount, componentDidUpdate 和 componentWillUnmount）。

Effect 分为两类：

1. 不需要清理的，如请求数据等。
2. 需要清理的，如订阅事件，定时器等。

```javascript
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  }, [count]); // 第二个参数表示只有count变化的时候才会执行

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### Hook 使用规则

Hook 是 js 函数，强加了 2 个规则：

1. 仅在 React 功能组件里使用，不要在普通 js 函数里使用。
2. 只能在顶层使用 Hooks，不要在循环，条件或嵌套函数里使用。

可以用[linter 插件](https://www.npmjs.com/package/eslint-plugin-react-hooks)检查这些规则。

state 改变的时候，当前 Hook 和 React 函数会重新执行。

React 是怎么知道哪个状态是哪个`useState()`调用？答案是 React 依赖调用 Hooks 的顺序。所以不要在判断里使用 Hook，因为可能两次渲染时一次调用了，另一次没调用，导致 Hooks 顺序不一致。

## 自定义 Hook

比如一个朋友在线列表组件。可以将在线状态提取成一个`useFriendStatus Hook`。

```javascript
import React, { useState, useEffect } from "react";

const friendList = [
  { id: 1, name: "pete" },
  { id: 2, name: "jerry" },
  { id: 3, name: "lucy" },
];

function useFriendStatus(recipientId) {
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (recipientId === 1) {
        setIsOnline(true);
      }
      if (recipientId === 2) {
        setIsOnline(false);
      }
      if (recipientId === 3) {
        setIsOnline(false);
      }
    });
  });
  return isOnline;
}

export default function Example3() {
  const [recipientId, setRecipientId] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientId);

  return (
    <div>
      <h2>Example6:好友状态</h2>
      <p>{isRecipientOnline ? "online" : "unOnLine"}</p>
      <select
        value={recipientId}
        onChange={(e) => setRecipientId(Number(e.target.value))}
      >
        {friendList.map((friend) => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```

Hook 是重用有状态逻辑的一种方式，而不是状态本身。实际上每次调用 Hook 都有一个完全隔离的状态，所以在一个组件可以使用相同的自定义 Hook 多次。

自定义 Hook 约定最好用`use`做前缀。

## 环境搭建

```
npm install create-react-app -g
create-react-app test
```

然后运行`npm start`即可运行项目。

本身`react-script`脚本是封装了不可见的，通过命令`npm run eject`可以将`react-scripts`的配置导出到项目目录。

## 简介

### jsx

```
const element = <h1>hello</h1>
```

jsx 不是字符串也不是 html，它是 js 语法的扩展，具有 js 的全部功能。jsx 的目的是将逻辑层和 UI 层分离，逻辑层控制状态，状态改变引发视图的变化。

**jsx 特点**

- 花括号{}里可以放任何 js 表达式，比如 {2+2}, {fn(data)}等。
- jsx 就是一个表达式，所以可以进行 return，赋值，判断等操作。
- 属性，如果值是字符串，用引号，如果是表达式，用{}。属性名要使用驼峰命名法。class 变成 className，tabindex 变成 tabIndex。

```
const element = <div tabIndex="0"></div>;
const element = <div tabIndex={index}></div>;
```

- 标签如果是空的，没子元素，可以使用`/>`闭合。比如 `<Button title="确定"/>`
- 防止 xss 注入攻击。`react dom`在渲染前会将 jsx 全部转义成字符串。
- `babel`会将 jsx 编译成对象给`React.createElement()`调用。

```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

// 会编译成
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` 会进行一些语法检查，以防止代码错误，实际上是将上面对象转换成下面的`React元素`对象：

```
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

`React`将这些对象转成 dom 结构，并更新它。

## 渲染元素(Rendering Elements)

渲染元素是 React Apps 里的最小构建单位。React 元素不像 dom 元素，它很容易创建。

```
const el = <h1>hi</h1>
```

- 使用根节点来包裹 React 元素以方便管理。使用`ReactDOM.render()`将 React 元素插入到 dom 节点。

```
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

- React 元素是固定的，一旦创建，不能改变它的子元素和属性。它表示某个时间点的 UI 状态`。
- React 元素会和之前的状态进行对比，只更新变化的节点。

### 组件

组件思想是讲页面 UI 拆分成独立、可复用的一部分。从概念上来说，组件就像 js 函数，接受输入(props)并返回 React 元素显示到屏幕上。

可以通过 function 和 class 来创建组件。

```
function welcome(props){
    return <h1>hi{props.name}</h1>
}

class welcome extends React.Component{
    render(){
        return <h1>hi{this.props.name}</h1>
    }
}
```

组件可以自定义，比如上面的 welcome 就是一个自定义组件。

```
ReactDOM.render(<welcome/>, root)
```

React 碰到自定义组件时，会将 jsx 属性作为 props 对象，传递给该组件。

React props 是只读的，所有的 React 组件要像纯函数一样。纯函数满足下面条件：

- 相同输入总是会返回相同的输出。
- 不产生副作用。
- 不依赖于外部状态。

### state 和生命周期

新增 state 需要调用 constructor，并 super(props)。

```
class Welcome extends React.Component{
    constuctor(props){
        super(props)
        this.state = {}
    }
}
```

- componentDidMount() 组件渲染到 dom 后触发
- componentWillUnmount() 组件卸载前触发

ReactDOM.render() 渲染时，首先调用渲染组件的 constructor，初始化 this.state，然后调用 render()进行第一次渲染到屏幕。接着调用 componentDidMount()，如果有 setState,React 就知道 state 变化了，接着再调用 render()更新组件，组件和之前状态对比发生了变化，React 会更新 DOM。如果组件被移除，React 会调用 componentWillUnmount()。

**关于 state 的使用**

- 修改 state，需要使用 this.setState()方法，this.state 只能在 constructor 里分配。
- state 更新可能是异步的，为了性能，React 会将多个 setState()放一起更新，所以有时更新需要使用下面的方法。
- 组件之间不知道相互的状态，state 是局部封闭的。自己的 state 不能被其它组件影响。
- state 可以当做属性的值传递给子组件，这叫做`top-down`或单向数据流。

```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

### 事件

React 元素的事件和 dom 元素类似，区别是：

- react 事件名用驼峰法，而不是小写。
- jsx 需要传递一个事件处理函数，而不是字符串。

```
// html
<button onclick="activateLasers()">
    Activate Lasers
</button>

// React
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

- 阻止默认行为不再使用`return false`，而是需要在事件处理函数里使用 `e.preventDefault()`。

**关于 this**

js 中，class 方法默认没有界，如果没有给事件处理函数绑定 this，在函数调用时，this 为 undefined。解决 this 指向的方法有三个：

1. 在 constructor 里绑定 this，如`this.handlerClick = this.handlerChild.bind(this)`。
2. class 里的函数使用箭头函数。推荐使用。

```
class Card{
    handlerClick = () =>{}
}
```

3. 给元素使用箭头函数，`<card onClick={e=> this.handlerClick(e)}`。这个方法在函数作为 prop 传递给下级组件时，这些组件可能会重复渲染一次。

给事件处理函数传递参数的方法。

```
<button onClick={e=> this.deleteRow(id, e)} />      // 这种方法需要手动指定event对象
<button onClick={this.deleteRow.bind(this, id)} />  // 这种方法，e会自动作为最后一个参数传递
```

### 条件渲染

可以使用&&进行渲染，如果返回 false，React 会忽略它。

```
render(){
    return (<div>
        a && <div />
    </div>)
}


// 三元表达式
{a ? 'hi' : 'hello' }

{
    a ? <div /> : <p />
}

```

### 列表和 keys

keys 可以帮助 React 区分列表哪些项改变了、新增或移除。 建议使用独一无二的 id 来做 key。不建议使用 index，这可能导致性能问题，并导致组件状态问题。如果没有使用 key，React 默认使用 index 作为 key。

```
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>{number}</li>
);

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

keys 是用来让 React 更好工作的，不传递给子组件。如果需要使用 key 的值，使用一个额外的属性来传递。

### 表单

受控组件

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

html 里的 textarea 的值是其子元素。而 react 里是其 value 属性。

```
<textarea value={this.state.value} onChange={this.handleChange} />
```

select 标签

```
<select value={this.state.value} onChange={this.handleChange}>
    <option value="grapefruit">Grapefruit</option>
    <option value="lime">Lime</option>
    <option value="coconut">Coconut</option>
    <option value="mango">Mango</option>
</select>
```

file 是只读的，所以不是受控组件。

```
<input type="file" />
```

如果有多个 input，可以赋一个 name，然后通过下面的方法处理。

```
this.setState({
    [name]: value
});

// 相当于
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

## express 和 mo

nodemon 用于重启 node

mongoose 用于连接 node 和 mongodb

## 开始

本教程讲如何用 React 构建 tic-tac-toe 游戏（三连棋游戏，两人轮流在九格方盘上划加号或圆圈，先把三个记号连成横线，斜线者获胜）。

## 什么是 React

React 是一个构建用户界面的 js 库。

render() 返回一个 react 元素，它是渲染页面的描述。即 jsx，jsx 会在构建时转为 React.createElement。比如：

```javascript
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// 转换为
return React.createElement(
  "div",
  { className: "shopping-list" },
  React.createElement("h1" /* ... h1 children ... */),
  React.createElement("ul" /* ... ul children ... */)
);
```

可以在这里查看哪详细的：[结果](https://babeljs.io/repl/#?presets=react&code_lz=DwEwlgbgBAxgNgQwM5IHIILYFMC8AiJACwHsAHUsAOwHMBaOMJAFzwD4AoKKYQgRlYDKJclWpQAMoyZQAZsQBOUAN6l5ZJADpKmLAF9gAej4cuwAK5wTXbg1YBJSswTV5mQ7c7XgtgOqEETEgAguTuYFamtgDyMBZmSGFWhhYchuAQrADc7EA)

## 开发者工具

安装并开启 React Devtools 扩展程序，注意如果没有出现就刷新页面或重新打开审查元素。

什么是受控组件。完全由父组件属性控制的组件。

## 为什么不变性很重要

改变 state 数据时，可以修改原来的，也可以复制一份。不直接改变的好处是：

1. 复杂的功能变的简单,比如保存历史记录，可以方便的将数据 push 进历史数组。并在以后重复使用。
2. 检测数据变化更加方便，否则需要遍历整个对象树。
3. 不变性主要好处是可以创建纯组件。不可变数据可以很容易确定组件何时需要重新渲染。

concat() 会返回一个新数组，不改变原数组。

列表更新时，React 会获取每个列表项的键，并在前一个列表项目搜索匹配的键，如果当前列表有上一个列表不存在的键，则新建组件；缺少，则删除；匹配，则移动。

不建议使用`key={i}`。

## shouldComponentUpdate

shouldComponentUpdate 默认返回 true，页面中用到的 state 变化时，就会触发其更新。

```javascript
// page A
render(){
    let {trainInfo} = this.props
    return <Text>{trainInfo.date}</Text>
}

// page B，如果date变化，B页面的render也会重新render
render(){
    let {trainInfo} = this.props
    return <Text>{trainInfo.partner}</Text>
}
```

因为在 redux 的 store 是很多页面公用的，其中的一个属性发生了变化，另外的页面也会重新 render，所以需要使用 shouldComponentUpdate 进行优化。

```javascript
shouldComponentUpdate(nextProps, nextState){
    if(this.props.color != nextProps.color){
        return true
    }

    return false
}
```

## 学习资料

- [Redux 入门教程（三）：React-Redux 的用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)

## 简介

React-Redux 将组件分为两类：UI 组件(presentational component) 和容器组件 (container component)。

UI 组件特征：

1. 只负责 UI，不带任何逻辑
2. 没有状态，即不使用 this.state
3. 所有数据由 this.props 提供
4. 不使用任何 Redux 的 API

容器组件：

1. 负责数据和业务逻辑，不负责 UI 的呈现
2. 由内部状态
3. 使用 Redux 的 API

React-Redux 规定，UI 组件是自定义的，容器组件由`connect()`方法生成。状态管理全部交给它来完成。

## UI 组件和容器组件的连接

`connect()`方法用于将 UI 组件生成容器组件。

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

Provider 用于方便组件之间传递 state。

```javascript
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

## redux 是什么

## redux 什么时候用

## 基本概念和 API

### store

store 是保存数据的地方，整个应用只有一个 store。可以使用`createStore`来生成 store。

```
import { createStore } from 'redux'
const store = createStore(fn)
```

### state

store 某个时刻的数据，叫做 state。当前时刻的 state，可以通过`store.getState()`得到。

```javascript
import { createStore } from "redux";
const store = createStore(fn);

const state = store.getState();
```

redux 规定，一个 state 对应一个 View，state 相同，view 就相同。反之亦然。

### action

用户操作 view，view 会发出 action，改变 state。action 是一个对象，其中`type`属性是必须的，表示 action 的名称。

```javascript
const action = {
  type: "ADD_TODO",
  payload: "Learn Redux",
};
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
import { createStore } from "redux";
const store = createStore(fn);

store.dispatch({
  type: "ADD_TODO",
  payload: "Learn Redux",
});
```

结合 action creator，代码可以改写成如下：

```javascript
store.dispatch(addToDo("Learn Redux"));
```

### reducer

store 收到 action，必须给出一个新的 state，这样 view 才会变化。这种 state 计算过程叫做 reducer。

reducer 是一个函数，它接受 action 和当前 state 作为参数，返回一个新的 state。

```javascript
const reducer = function (state, action) {
  return new_state;
};
```

整个应用的初始状态，可以作为 state 的默认值。

```javascript
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD":
      return state + action.payload;
    default:
      return state;
  }
};

const state = reducer(1, {
  type: "ADD",
  payload: 2,
});
```

reducer 收到 ADD 的 action 后，返回一个新 state。

实际应用中，reducer 不需要像上面这样手动调用，store.dispatch 方法会触发 reducer 的自动执行。为此，store 需要知道 reducer 函数，做法就是在生成 store 的时候，将 reducer 传入 createStore 方法。

```javascript
import { createStore } from "redux";
const store = createStore(reducer);
```

上面的代码，传入 reducer 参数生成一个新 store。以后执行 `store.dispatch` 发出 action，就会自动调用 reducer，得到新的 state。

为什么叫 reducer？因为它可以作为数组的 reduce 方法的参数。

```javascript
const actions = [
  { type: "ADD", payload: 0 },
  { type: "ADD", payload: 1 },
  { type: "ADD", payload: 2 },
];

const total = action.reduce(reducer, 0); // 3
```

reducer 是一个纯函数。即同样的输入，必定得到同样输出。纯函数编程约束如下：

1. 不能改写参数。
2. 不能调用系统 I/O 的 API。
3. 不能调用 Date.now() 或 Math.random() 等不纯的方法，因为每次回得到不一样的结果。

由于 reducer 是纯函数，这就可以保证同样的 state，必定得到同样的 view。正因为如此，reducer 不能改变 state，必须得到一个全新的对象。

```javascript
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}
```

最好将 state 对象设置为只读，这样就没法改变它了。

### store.subscribe()

`store.subscribe()`可以设置监听函数，一旦 state 发生变化，就自动执行这个函数。

```javascript
import { createStore } from "redux";
const store = createStore(reducer);

store.subscribe(listener);
```

所以只要把 View 的更新函数放到里面，state 变化时，它就会自动渲染。

`store.subscribe`返回一个函数，调用这个函数可以解除监听。

```javascript
let unsubscribe = store.subscribe(() => {
  console.log(store.getState);
});

unsubscribe();
```

### store 的简单实现

createStore 可以接受第二个参数，表示 state 的最初状态。通常是服务器给出的。

```javascript
let store = createStore(todoAPP, window.state_from_server);
```

下面是 store 的简单实现。

```javascript
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```

### reducer 的拆分

reducer 负责生成 state，由于只有一个 state，所以对于大型应用来说 state 很大，导致 reducer 也很大。比如下面的代码：

```javascript
const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload),
      });
    case CHANGE_STATUS:
      return Object.assign({}, state, {
        statusMessage: payload,
      });
    case CHANGE_USERNAME:
      return Object.assign({}, state, {
        userName: payload,
      });
    default:
      return state;
  }
};

const chatReducer = (state = defaultState, action = {}) => {
  return {
    chatLog: chatLog(state.chatLog, action),
    statusMessage: statusMessage(state.statusMessage, action),
    userName: userName(state.userName, action),
  };
};
```

实际这几个 state 的属性没有联系，所以可以把 reducer 按照同属性处理进行拆分，最后再用`combineReducers`合并。

```javascript
import { combineReducers } from "redux";

const chatReducer = combineReducers({
  chatLog,
  statusMessage,
  userName,
});

export default todoApp;
```

`combineReducer()`就是根据 state 的 key 执行相应的子 reducer，并返回合并后的大 state 对象。

下面是`combineReducer()`的简单实现。

```javascript
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};
```

可以把 reducer 放一个文件统一引用。

```javascript
import { combineReducers } from "redux";
import * as reducers from "./reducers";

const reducer = combineReducers(reducers);
```

- [如何理解 Facebook 的 flux 应用架构？](https://www.zhihu.com/question/33864532)
  http://www.redux.org.cn/docs/introduction/Motivation.html
  http://www.ruanyifeng.com/blog/2007/11/mvc.html

http://www.ruanyifeng.com/blog/2016/01/flux.html
http://facebook.github.io/flux/docs/in-depth-overview.html#content

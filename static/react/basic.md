# react

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

jsx不是字符串也不是html，它是js语法的扩展，具有js的全部功能。jsx的目的是将逻辑层和UI层分离，逻辑层控制状态，状态改变引发视图的变化。

**jsx特点**

- 花括号{}里可以放任何js表达式，比如 {2+2}, {fn(data)}等。
- jsx就是一个表达式，所以可以进行return，赋值，判断等操作。
- 属性，如果值是字符串，用引号，如果是表达式，用{}。属性名要使用驼峰命名法。class变成className，tabindex变成tabIndex。

```
const element = <div tabIndex="0"></div>;
const element = <div tabIndex={index}></div>;
```

- 标签如果是空的，没子元素，可以使用`/>`闭合。比如 `<Button title="确定"/>`
- 防止xss注入攻击。`react dom`在渲染前会将jsx全部转义成字符串。
- `babel`会将jsx编译成对象给`React.createElement()`调用。

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

`React`将这些对象转成dom结构，并更新它。

## 渲染元素(Rendering Elements)

渲染元素是React Apps里的最小构建单位。React元素不像dom元素，它很容易创建。

```
const el = <h1>hi</h1>
```

- 使用根节点来包裹React元素以方便管理。使用`ReactDOM.render()`将React元素插入到dom节点。

```
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

- React元素是固定的，一旦创建，不能改变它的子元素和属性。它表示某个时间点的UI状态`。
- React元素会和之前的状态进行对比，只更新变化的节点。

### 组件

组件思想是讲页面UI拆分成独立、可复用的一部分。从概念上来说，组件就像js函数，接受输入(props)并返回React元素显示到屏幕上。

可以通过function和class来创建组件。

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

组件可以自定义，比如上面的welcome就是一个自定义组件。

```
ReactDOM.render(<welcome/>, root)
```

React碰到自定义组件时，会将jsx属性作为props对象，传递给该组件。

React props是只读的，所有的React组件要像纯函数一样。纯函数满足下面条件：

- 相同输入总是会返回相同的输出。
- 不产生副作用。
- 不依赖于外部状态。

### state和生命周期

新增state需要调用constructor，并super(props)。

```
class Welcome extends React.Component{
    constuctor(props){
        super(props)
        this.state = {}
    }
}
```

- componentDidMount() 组件渲染到dom后触发
- componentWillUnmount() 组件卸载前触发

ReactDOM.render() 渲染时，首先调用渲染组件的constructor，初始化this.state，然后调用render()进行第一次渲染到屏幕。接着调用componentDidMount()，如果有setState,React就知道state变化了，接着再调用render()更新组件，组件和之前状态对比发生了变化，React会更新DOM。如果组件被移除，React会调用componentWillUnmount()。

**关于state的使用**
- 修改state，需要使用this.setState()方法，this.state只能在constructor里分配。
- state更新可能是异步的，为了性能，React会将多个setState()放一起更新，所以有时更新需要使用下面的方法。
- 组件之间不知道相互的状态，state是局部封闭的。自己的state不能被其它组件影响。
- state可以当做属性的值传递给子组件，这叫做`top-down`或单向数据流。

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

React元素的事件和dom元素类似，区别是：
- react事件名用驼峰法，而不是小写。
- jsx需要传递一个事件处理函数，而不是字符串。

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

**关于this**

js中，class方法默认没有界，如果没有给事件处理函数绑定this，在函数调用时，this为undefined。解决this指向的方法有三个：

1. 在constructor里绑定this，如`this.handlerClick = this.handlerChild.bind(this)`。
2. class里的函数使用箭头函数。推荐使用。

```
class Card{
    handlerClick = () =>{}
}
```

3. 给元素使用箭头函数，`<card onClick={e=> this.handlerClick(e)}`。这个方法在函数作为prop传递给下级组件时，这些组件可能会重复渲染一次。

给事件处理函数传递参数的方法。
```
<button onClick={e=> this.deleteRow(id, e)} />      // 这种方法需要手动指定event对象 
<button onClick={this.deleteRow.bind(this, id)} />  // 这种方法，e会自动作为最后一个参数传递
```

### 条件渲染

可以使用&&进行渲染，如果返回false，React会忽略它。
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

### 列表和keys

keys可以帮助React区分列表哪些项改变了、新增或移除。 建议使用独一无二的id来做key。不建议使用index，这可能导致性能问题，并导致组件状态问题。如果没有使用key，React默认使用index作为key。

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

keys是用来让React更好工作的，不传递给子组件。如果需要使用key的值，使用一个额外的属性来传递。

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

html里的textarea的值是其子元素。而react里是其value属性。

```
<textarea value={this.state.value} onChange={this.handleChange} />
```

select标签

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

如果有多个input，可以赋一个name，然后通过下面的方法处理。

```
this.setState({
    [name]: value
});

// 相当于
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```


## express和mo

nodemon 用于重启node

mongoose 用于连接node和mongodb













































































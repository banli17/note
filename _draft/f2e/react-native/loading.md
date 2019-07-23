---
title: "react-native loading动画"
date: 2019-02-09 05:10:29
toc: true
---



## Loading加载动画的统一处理

当页面发生跳转的时候，动画的同时往往新页面会动态ajax请求数据并且渲染，这个时候可能发生卡顿现象。为了更好的用户体验，可以在新页面请求数据的时候加载一个loading效果，因为这个loading很小，而且没有远程数据，所以跳转不会卡顿。请求完数据后新页面渲染数据，这时页面切换动画往往已经完成了，所以用户体验比较好。

1. 最初我做第一个app的时候是封装了一个加载组件，然后在每个页面判断是否渲染这个加载组件。这样处理起来十分复杂，每个页面都要写这个判断代码。
2. 后来我在每个页面外层加了一层容器Container。在Container里面处理网络请求和数据处理，处理完成后传递给页面组件。大致代码如下：

```
// page1
class Page1 extends Component{
    constructor(){
        this.state = {
            pageData:[]
        }
    }

    onData = (pageData)=>{
        this.setState({
            pageData
        })
    }

    render(){
        <Container fetchApi="api.get()" onData={this.onData}>
            <View data={pageData}></View>
        </Container>
    }
}

// Container
class Container extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount = async()=>{
        let res = await this.props.fetchApi()
        if(res){
            this.props.onData(res.data)
            this.setState({
                loading: true
            })
        }
    }

    render(){
        if(this.state.loading) return <Loading /> 

        return <View>
            {this.props.children}
        </View>
    }
}
```

这样就可以在请求数据的时候加载`<Loading/>`或者加载网络错误等，得到数据后再渲染页面了。

但是上面的方案在我们项目中使用的比较烦，因为后端返回的数据格式有时候不太固定，而且还有一些可能cookie失效退出登陆等问题。所以我又在container组件上加了几个处理数据的函数。

3. 最近momo研究了一下`recompose`，发现了一个与方案二类似的方法，不是通过`<Container />`来套组件，而是通过中间层的传递。测试了一下，用户体验貌似还不错。准备全部切换到这种方法，当然我的很多页面业务逻辑都比较复杂，不知道使用起来方便不，最近这段时间边改边完善这篇文章。

刚开始看momo用`recompose`感觉很不适应，代码如下：

```javascript
class A extends Component{
    render(){
        return <Text>hello</Text>
    }
}

let middlewareDidMount = (dispatch, props) => {
    mineApi.balanceWithDrawInfo().then(data => {
        if (data) {
            // 设置state
            props.setState({
                withdrawInfo: data.data,
            })
        }
    }).catch(e => {

    })
}

let middlewareDidUpdate = (nextProps, nextState, dispatch, props) => {
    if (nextProps.a != props.a) {
        props.hideLoading()
    }
}

export default rootHoc = compose(
    setStatic(
        "options",
        (passProps) => {
            return {
                topBar: {
                    title: {
                        text: '标题'
                    }
                }
            }
        }
    ),
    withStateHandlers(
        () => ({
            withdrawInfo: null
        }),
        {
            setState: () => (args) => ({...args})
        }
    ),
    connect(state => ({
        userInfo: state.userInfo
    })),
    Middleware({middlewareDidMount, middlewareDidUpdate})
)(A)
```

`setStatic`设置页面的标题，`withStateHandlers`是设置state的一些处理，`connect`是redux。`Middleware`是一个中间件，它会在`props.hideLoading()`调用的时候消失，显示真正的页面。

它整体的思想就是一层层的嵌套组合组件，形成高阶组件如`fn(fn(fn(Component)))`，通过fn给组件加参数或方法，这个库还是很不错的，可以去学学。

后来学习了一下`recompose`感觉上面的写法还好，也就将就的接受了，不过最后还是推荐将上面的`compose`封装成对象传参数的方式。这样它的流程逻辑就不需要在每个页面都写了。

```javascript
composexx({
    static: {},
    state:{},
    connect:{},
    middlewareDidMount:()=>{},
    middlewareDidUpdate:()=>{},
})
```

个人感觉封装一下还是可以的，但是momo不肯。我现在也不想仔细去研究，因为任务多心情又烦，所以就没有弄了。

### Middleware代码

下面是`Middleware`的代码。

```javascript
import React, {Component} from 'react';
import {
    RefreshControl,
    Image,
    View
} from 'react-native'
import {connect} from "react-redux"
import {Container,Content} from "native-base";
import {withHandlers,compose, branch,withState,renderComponent,setStatic,withStateHandlers } from "recompose";

class MiddlewareComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.middlewareDidMount(this.props.dispatch);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidUpdate(nextProps, nextState) {
        this.props.middlewareDidUpdate(nextProps,nextState,this.props.dispatch);
    }

    render() {
        return (
            <Container>
                <Content style={{backgroundColor: "#efeff4"}}
                         refreshControl={
                             <RefreshControl
                                 refreshing={true}
                                 colors={[THEME.m_color_primary]}
                                 onRefresh={() => {
                                 }}
                             />}
                >
                </Content>
            </Container>
        )
    }
}

function defaultMiddlewareDidMount(dispatch, props) {
    setTimeout(() => {
        props.hideLoading();
    }, 500);
}

function defaultMiddlewareDidUpdate(nextProps, nextState, dispatch, props) {

}

export default Middleware = ({middlewareDidMount = defaultMiddlewareDidMount,middlewareDidUpdate = defaultMiddlewareDidUpdate} = {})=> compose(
        withStateHandlers(
            () => ({
                isLoading: true,
            }),
            {
                showLoading: () => () => ({isLoading: true}),
                hideLoading: () => () => ({isLoading: false})
            }
        ),
        withHandlers({
            middlewareDidMount: props => (...args) =>{
                middlewareDidMount(...args,props);
            },
            middlewareDidUpdate: props => (...args) =>{
                middlewareDidUpdate(...args,props);
            }
        }),
        branch(
            ({isLoading}) => (isLoading),
            renderComponent(MiddlewareComponent)
        )
    );
```

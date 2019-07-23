---
title: "react-native弹出提示框"
date: 2019-03-27 09:10:42
toc: true
---


## 弹出提示框

之前我用rn不爽的一个很重要的原因就是不能使用API调用自定义的 alert、confirm、loading。比如下图:

![](./imgs/alert.png)

网页上可能只需要`util.alert`即可。但是rn上一般是将组件写在页面里，然后通过ref的方式去调用他。

```javascript
//web
uitl.alert()

// rn
<Alert ref="alert">

// this.refs.alert.show()
```

我之前用蚂蚁的`antd-mobile-rn`库的时候，发现它可以直接使用API `Toast.loading()`来弹出一个加载框，可是一直没有研究过，因为要做的事情太多了，每天就光写业务代码了。

最近，momo发现可以通过[`react-native-root-siblings`](https://github.com/magicismight/react-native-root-siblings)来实现上面的需求，蚂蚁也是用这个库实现的。

用这个库可以往页面根节点插入元素然后操作它，这个功能很强大。但是在用这个库的时候，我发现用`new RootSibling(<Modal/>)`插入模态框会有问题，页面会出现很多个模态，为了解决这个问题，我花了半天时间去研究它的源码和实现原理。

它的原理实际很简单，在每个注册页面插入一个`<RootSibling>`，然后每次`new RootSibling(<xx>)`创建元素的时候，都会往每个页面的`<RootSibling>`里插入你自定义的组件`<xx>`。

![](./imgs/root-sibling.png)

所以其实它是每个页面都有了这个组件，切换页面时都可以看到一样的它。而`<Modal>`不一样，它本来就遮盖了页面，每个页面都会创建一个`<Modal>`，所以会出现多个。这就是我上面bug的来源了。

于是我简单的修改了一下这个库来实现我的需求。

```javascript
class RootSiblings extends Component {
    render(){
        ...
        this._updatedSiblings = {};
        return [elements[elements.length - 1]];  // 这里
    }
}

export default class RootSiblingManager {
    constructor(element, callback, store) {
        const id = uuid++;

        function update(element, callback, store) {
            triggers[Object.keys(triggers)[0]](id, element, callback, store)  // 这里
            // Object.keys(triggers).forEach(key => {
            //     console.log(key)
            //     triggers[key](id, element, callback, store)
            // })
        }
    }
}
```

值得注意的是`update`里不能用最后一个方法，而是需要用第一个，否则有些情况下创建元素会不生效。比如在A页面点按钮时创建组件，但是有个选择框需要跳到B页面选择完再返回A提交。这时有问题。

**2018-12-24更新**

之前以为上面的方法能用，但是今天调试ios时发现上面的方式不行。因为 android 的 Modal 是覆盖顶层，类似于全局的。但是 ios 的 Modal 不一样，它时属于页面的。所以点击其它页面时，Modal 不会覆盖当前页面，而是出现在第一个页面。

我其实没有详细的学习 react，只是看了一下官方的一点教程，没有看完。momo 说可以通过`React.createContext()`实现，但是之前试了下不行，报错。于是我决定来研究研究，终于搞定了。判断当前页面让它只在当前页面触发。

一些问题：ios回退后，需要在Modal隐藏的时候销毁。

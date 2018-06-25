# 动画

RN提供了2个API用来做动画：
- Animation  用来做动画
- LayoutAnimation 用来做页面切换

## Animated API

四个组件部署了Animated接口：`View`、`Text`、`Image`和`ScrollView`。不过可以通过`Animated.createAnimatedComponent()`创建自己的动画组件。

给组件添加动画的步骤：
1. 初始化动画值
2. 动画组件是`Animated.View`这种形式。`Animated.View`的 style 只接受盒模型属性。
3. 通过`Animated.timing`启动动画

### 配置动画

Animated提供了几个动画类型，最常用的是`Animated.timing()`，它支持使用各种缓动动画，包括自定义的。默认使用 easeInOut(先加速再减速)。我们可以通过easing参数改变它。

```javascript
Animated.timing(this.state.xPosition, {
  toValue: 100,
  easing: Easing.back(),
  duration: 2000,
}).start();
```

### 组合动画

动画可以排队或并行执行。Animated 提供了 `sequence()` 和 `delay()` 来实现。而且有 `start()/stop()` 来控制动画的开始和停止。

```javascript
Animated.sequence([    // 定义队列动画
  // decay, then spring to start and twirl
  Animated.decay(position, {
    // coast to a stop
    velocity: {x: gestureState.vx, y: gestureState.vy}, // velocity from gesture release
    deceleration: 0.997,
  }),
  Animated.parallel([  // 定义并行动画
    // after decay, in parallel:
    Animated.spring(position, {
      toValue: {x: 0, y: 0}, // return to start
    }),
    Animated.timing(twirl, {
      // and twirl
      toValue: 360,
    }),
  ]),
]).start(); // start the sequence group
```

如果一个动画被打断，在这组里的其他动画也会被停止，`Animated.parallel`有一个`stopTogether`选项来控制它。

### 合并动画值

可以通过加、乘、除、模组合2个动画的值，生成一个新的动画值。

```javascript
const a = new Animated.Value(1);
const b = Animated.divide(1, a);

Animated.spring(a, {
  toValue: 2,
}).start();
```

### 插值interpolate

根据离散的点生成对应的区间，比如透明度从0-1，位置从150px到0。

```javascritp
style = {{
    opacity: this.state.fadeAnim,
    transform:[{
        translateY: this.state.fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [150, 0]
        })
    }]
}}
```

`interpolate`还支持字符串映射，从而可以实现颜色和带单位的值的动画变换。

```javascript
value.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg']
})
```

`interpolation`还支持任意渐变函数，很多已经在`Easing`类中定义了。interpolation还支持限制输出区间outputRange。你可以通过设置extrapolate、extrapolateLeft或extrapolateRight属性来限制输出区间。默认值是extend（允许超出），不过你可以使用clamp选项来阻止输出值超过outputRange。

### 跟踪动态值

动画中的值还可以通过跟踪别的值得到。

```javascript
Animated.timing(opacity, {
    toValue: pan.x.interpolate({
        inputRange: [0, 300],
        outputRange: [1, 0]
    })
}).start()
```

### 输入事件

手势或其他事件可以直接绑定到动态值，比如讲`scrollX`映射到`event.nativeEvent.contentOffset.x`，并且`pan.x`和`pan.y`分别映射到`gestureState.dx`和`gestureState.dy`。(`gestureState`是传递给`PanResponder`的第二个参数)。

```javascript
onScroll = {Animated.event(
    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]  // scrollY = e.nativeEvent.contentOffset.x
)}

onPanResponderMove = {Animated.event([
    null,                           // 忽略原生事件
    {dx: pan.x, dy: pan.y}          // 从gestureState中解析出dx和dy的值
])}
```

为了优化，没有明显的方法来读取动画中的当前值。有些值只有在原生代码执行时才知道。如果要在js中获取，有2种可能的方法：
- `spring.stopAnimation(callback)` 会停止动画，并把值作为参数传给callback，这在处理手势动画时很有用。
- `spring.addListener(callback)` 会在动画的执行过程中持续异步调用callback。

### 使用原生动画驱动

通过`userNativeDriver: true`启用原生驱动，可以在动画开始时，就将配置发给原生端。避免每一帧都两端来回沟通。所以即使js线程卡了，也不影响动画。

动画值在不同的驱动方式之间是不能兼容的。因此如果你在某个动画中启用了原生驱动，那么所有和此动画依赖相同动画值的其他动画也必须启用原生驱动。

原生驱动可以用于transform和opacity，但是flexbox和position属性不行。当使用Animated.event时，它只能直接操作，而不能冒泡。即ScrollView#onScroll能工作，但是PanResponder不行。

动画执行时，它能防止`VirtualizedList`组件渲染多的列表，如果需要动画循环或长时间执行。可以使用`isInteraction: false`防止这个问题。

记住在用transform的rotateX，rotateY时，确保使用perspective。有时如果不使用它android机器上可能不渲染。

```javascript
<Animated.View
  style={{
    transform: [
      {scale: this.state.scale},
      {rotateY: this.state.rotateY},
      {perspective: 1000}, // without this line this Animation will not render on Android while working fine on iOS
    ],
  }}
/>
```

## LayoutAnimation API

`LayoutAnimation`允许在全局范围内更新和创建动画，这些动画会在下一次渲染时运行。它常用来更新flexbox布局，因为它是无需测量和计算就能直接产生动画。尤其是布局变化可能影响父节点时。比如查看更多时的展开动画。如果不用LayoutAnimation，则需要声明组件坐标。

它对动画本身的控制没有Animated方便。

```javascript
import React from 'react';
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);  // 启用

export default class App extends React.Component {
  state = {
    w: 100,
    h: 100,
  };

  _onPress = () => {
    // Animate the update
    LayoutAnimation.spring();  // 调用
    this.setState({w: this.state.w + 15, h: this.state.h + 15})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box, {width: this.state.w, height: this.state.h}]} />
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Press me!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
```





上面的代码，当a变化时，b也会随着变化。

## 参考资料

- [React Native官网Animations](https://facebook.github.io/react-native/docs/animations.html)
- [React Native官网Animated API](https://facebook.github.io/react-native/docs/animated.html)




































































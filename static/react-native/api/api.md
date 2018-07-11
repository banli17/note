# RN官方API汇总

## AccessibilityInfo

用于检测当前屏幕是否盲人模式，以及切换时做什么。

## Alert

```javascript
Alert.alert(
  'Alert Title',
  'My Alert Msg',
  [
    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  { cancelable: false }  // 点空白是否可取消
)
```
## AppRegistry

## AppState

用于检查app是否后台运行，经常用于处理推送消息。状态有:`active`、`background`、`inactive`(过渡时)

```
state = {
    appState: AppState.currentState
}

componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
}

componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
}

_handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
}
```

## AsyncStorage

- getItem
- setItem
- removeItem
- mergeItem
- clear
- getAllKeys
- flushGetRequests
- multiGet
- multiSet
- multiRemove
- multiMerge

## BackHandler

- `exitApp()`
- `addEventListener()`
- `removeEventListener()`

```javascript
// 再按一次退出APP
class _App extends Component {
    constructor(props) {
        super(props)
    }

    setBackHandler() {
        let count = 0
        let timer
        BackHandler.addEventListener("hardwareBackPress", e => {
            if (e) {
                return true
            }
            count++
            if (count == 1) {
                Toast.info("再按一次就退出了", 0.5)
                timer = setTimeout(() => {
                    count = 0
                }, 2000)
                return true
            }

            if (count == 2) {
                clearInterval(timer)
                return false
            }
        })
    }

    componentWillMount() {
        this.setBackHandler()
    }
}
```

## CameraRoll

- `getPhotos()`：用于获取相册的图片接口，没有界面
- `saveToCameraRoll()`：保存到相册

## Clipboard

异步获取剪切板的内容。`async Clipboard.getString()`

- getString()
- setString()

## DataPickerAndroid

## Dimensions

## Easing

## Geolocation

## ImageEditor
## ImagePickerIOS
## ImageStore
## Image Style Props
## InteractionManager
## Keyboard
## LayoutProps
## LayoutAnimation
## Linking
## NetInfo
## PanResponder
## PermissionsAndroid
## PixelRatio
## PushNotificationIOS
## Settings
## Shadow Props

## Share
- share({message,title })
- sharedAction()
- dismissedAction()：取消分享触发

## StatusBarIOS
## StyleSheet
## Systrace
## Text Style Props
## TimePickerAndroid
## ToastAndroid
## Transforms
## Vibration

震动API。
- Vibration.vibrate(pattern: number, Array<number>, repeat: boolean)
- cancel()

```
<uses-permission android:name="android.permission.VIBRATE"/>
```
## VibrationIOS
## View Style Props

- [React的设计哲学 - 简单之美](http://www.infoq.com/cn/articles/react-art-of-simplity)
- [理解JSX和组件](http://www.infoq.com/cn/articles/react-jsx-and-component)
- [虚拟DOM Diff算法解析](http://www.infoq.com/cn/articles/react-dom-diff)

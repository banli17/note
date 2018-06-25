# 一扫RN官方组件

将rn的组件学习一遍，暂时忽略掉单平台支持的组件，因为要适配双平台。

## ActivityIndicator

- `animating`：用于显示和隐藏指示器，true为显示，false为隐藏
- `color`：颜色
- `size`：控制大小，可以是字符串'small'或'large'，或number（只支持android）。
- `hidesWhenStopped`：不动画时，是否隐藏。只支持ios。

## Button

- `onPress`：必须
- `title`：按钮的文字
- `accessibilityLabel`：给盲人显示的文字
- `color`：android 是按钮的背景颜色，ios是文字的颜色。
- `disabled`：是否禁用，禁用后，颜色变灰色
- `testID`
- `hasTVPreferredFocus`：apple tv only

## DatePickerIOS

ios日期选择组件

## DrawerLayoutAndroid

android侧滑菜单组件

## FlatList

高性能列表滚动组件。

- `data`
- `ItemSeparatorComponent`：行之间的分隔组件
- `ListEmptyComponent`：列表为空时显示的组件
- `ListFooterComponent`：底部组件
- `ListHeaderComponent`：顶部组件
- `columnWrapperStyle`：当`numColumns>1`时，每一行外包装样式
- `extraData`
- `inverted`：翻转滚动方向，可以用于聊天界面
- `keyExtractor`：用于生成key，默认以`item.key`作为key值
- `numColumns`：可以设置为多列，必须`horizontal={false}`
- `getItemLayout`
- `horizontal`：滚动方向
- `initialNumToRender`：初始化渲染多少个
- `initialScrollIndex`：初始时屏幕顶端是第几个元素
- `legacyImplementation`：设置为true则使用旧ListView
- `onEndReached`：只触发一次。列表可视区底部距离内容最底部不足onEndReachedThreshold的距离时调用
- `onEndReachedThreshold`：内容可视区底部距离内容底部和列表可视区距离的比例。用于触发onEndReached函数
- `onRefresh`：一个函数，如果提供，会默认加一个刷新控件。需要和`refreshing`属性一起用。
- `onViewableItemsChanged`：可见行元素变化时调用。可见范围和变化频率通过`viewabilityconfig`设置
- `viewabilityConfig`
- `scrollToEnd()`：滚动到底部，默认`{animated:true}`
- `scrollToIndex()`：参数是`{animated:true, index:1, viewOffset:用于修正, viewPosition:0.5表示目标停留在半屏幕}`
- `scrollToItem()`：参数是`{animated:true, item, viewPosition}`
- `scrollToOffset()`：参数是`{offset: 10, animated:true}`
- `recordInteraction()`
- `flashScrollIndicators()`：短暂显示滚动指示器

## Image

- `source`：资源地址
- `style`：可以设置ImageResizeMode，值为`contain/cover/stretch/center/repeat`
- `backfaceVisibility`：`visible、hidden`
- `borderBottomLeftRadius`
- `borderBottomRightRadius`
- `borderColor`
- `borderRadius`
- `borderTopLeftRadius`
- `backgroundColor`
- `borderWidth`
- `opacity`
- `overflow`
- `resizeMode`
- `tintColor`：改变非透明像素
- `overlayColor`：只适合android
- `blurRadius`：模糊半径
- `onLayout`：图片挂载，布局改变时触发，`{nativeEvent: {layout: {x, y, width, height}}}`，显示尺寸
- `onLoad`：`{{nativeEvent:{source: {height,url,width}}}`，这是是原始尺寸
- `onLoadEnd`：不管下载成功还是失败
- `onLoadStart`：`onLoadStart={(e) => this.setState({loading: true})}`
- `resizeMode`: `contain/cover/stretch/center/repeat`
- `loadingIndicatorSource`
- `onError`： `{nativeEvent:{error}}`
- `testID`
- `resizeMethod`：`auto/resize/scale`
- `accessibilityLabel`：盲人设备的文字，支持ios
- `accessible`：为true时，为accessibility元素，支持ios
- `capInsets`：ios
- `defaultSource`：ios
- `onPartialLoad`：ios
- `onProgress`：ios
- `fadeDuration`：android，300ms
- `getSize(uri, success,[failure])`
- `prefetch()`：预加载图片
- `abortPrefetch(requestId)`
- `queryCache()`：检查是否已经缓存，具体[查看](https://stackoverflow.com/questions/46314050/react-native-image-prefetch)
- `resolveAssetSource()`：会把require静态转成个对象形式


```
<Image source={{uri: 'http://xx.com/1.png'}}
<Image source={require('image/1.png')}
```

git和webP支持。

```
dependencies {
  // If your app supports Android versions before Ice Cream Sandwich (API level 14)
  compile 'com.facebook.fresco:animated-base-support:1.3.0'

  // For animated GIF support
  compile 'com.facebook.fresco:animated-gif:1.3.0'

  // For WebP support, including animated WebP
  compile 'com.facebook.fresco:animated-webp:1.3.0'
  compile 'com.facebook.fresco:webpsupport:1.3.0'

  // For WebP support, without animations
  compile 'com.facebook.fresco:webpsupport:1.3.0'
}
```

如果想混淆，可以在`proguard-rules.pro`里增加下面代码。

```
-keep class com.facebook.imagepipeline.animated.factory.AnimatedFactoryImpl {
  public AnimatedFactoryImpl(com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory, com.facebook.imagepipeline.core.ExecutorSupplier);
}
```

## InputAccessoryView

只支持ios，定义键盘的

## KeyboardAvoidingView

用于解决输入框聚焦时，键盘挡住输入框的问题。会自动往上面移动。

- `keyboardVerticalOffset`键盘
- `behavior`
- `contentContainerStyle`
- `enabled`
- `relativeKeyboardHeight()`
- `onKeyboardChange()`
- `onLayout()`

```
import { KeyboardAvoidingView } from 'react-native';
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
<KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    keyboardVerticalOffset={keyboardVerticalOffset}
    enabled>
  ... your UI ...
</KeyboardAvoidingView>
```

## MaskedViewIOS

可以做元素遮罩。下面加个背景，然后就是透明文字了。

## Modal

- `visible`
- `supportedOrientations`：支持ios
- `onRequestClose`：关闭的回调
- `onShow`：显示的回调
- `transparent`
- `animationType`：支持`slide`、`fade`、`none`
- `hardwareAccelerated`
- `onDimiss`
- `onOrientationChange`
- `presentationStyle`
- `animated`

```javascript
state = {
    modalVisible: false
}

<Modal
    visible={this.state.modalVisible}
    onRequestClose={()=>{
        // Modal关闭
    }}>
</Modal>
```

## Picker

- `onValueChange`：参数itemValue、itemPosition
- `selectedValue`
- `style`
- `testID`
- `enabled`：支持android
- `mode`：形式有`dialog`、`dropdown`。支持android
- `prompt`：支持android
- `itemStyle`：支持ios

```
<Picker
  selectedValue={this.state.language}
  style={{ height: 50, width: 100 }}
  onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>
```

# WebView 组件

## 使用

- 高度设置：设置高度时，给父级元素设置，WebView组件会自动伸展撑满父级
- 指示器：页面添加指示器，需要同时添加2个属性：`startInLoadingState`、`renderLoading`
- 返回键：安卓返回时，让网页返回，返回完后再app返回， 使用`onNavigationStateChange`属性，和`WebView`的`goBack()`方法。


## 实例
```
import React, {Component} from 'react'
import {
	View,
	Text,
	StyleSheet,
	WebView,
	ActivityIndicator,
	BackHandler
} from 'react-native'

export default class WebPage extends Component {
	static navigationOptions = ({navigation})=> {
		let {title, url} = navigation.state.params.item
		return {
			title,
			headerRight: <ShareWebUrl
				title={title}
				webpageUrl={url}
			/>
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			backButtonEnabled: false
		}
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.backHandler);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
	}

	backHandler = () => {
		if (this.state.backButtonEnabled) {
			this.webView.goBack();
			return true;
		}
	}
	onNavigationStateChange = (navState)=> {
		this.setState({
			backButtonEnabled: navState.canGoBack
		})
	}

	onLoadEnd() {}

	renderLoading() {
		return (<View style={{flex: 1, ...FlexCenter}}>
			<ActivityIndicator color={DEFAULT_COLOR}/>
		</View>)
	}

	render() {
		let {url} = this.props.navigation.state.params.item

		return (
			<View style={styles.wrapper}>
				<WebView
					ref={(e)=> {
						this.webView = e
					}}
					onLoadEnd={this.onLoadEnd.bind(this)}
					source={{uri: url}}
					javaScriptEnabled={true}
					scalesPageToFit={false}
					startInLoadingState={true}
					renderLoading={this.renderLoading.bind(this)}
					onNavigationStateChange={this.onNavigationStateChange.bind(this)}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1
	}
})

```

## 参考链接
- <a href='https://stackoverflow.com/questions/39446077/react-native-go-back-on-android-hardware-back-button-pressed' target='_blank'>React-Native: Go back on android hardware back button pressed</a>



```

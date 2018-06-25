# react-navigation的使用

## 制作底部tabbar

```markup
const TabBar = TabNavigation({
    Home: {
        screen: HomePage,
        navigationOptions:{
            tabBarLabel: '首页',
            tabBarIcon: ()=>{
                <Image 
                    source={}
                    style={}
                />
            }
        }
    }
})
```

## 顶部导航器navbar

```markup
const SimpleApp = StackNavigator({
		Home: {
			screen: MainScreenNavigator,
		},
		Chat: {screen: ChatScreen},
	}, {
		navigationOptions: {
			headerTintColor: '#fff',
			headerStyle:{
				backgroundColor:'#18b4ed',
				height: 48,
				
				// 下面三项，去除导航条阴影
				shadowOpacity: 0,
                shadowOffset: {
                    height: 0,
                },
                elevation: 0
			},
			headerTitleStyle:{
				fontSize: 16,
				shadowOpacity:0,
				alignSelf: 'center'
			}
		},
		transitionConfig: () => ({
			transitionSpec: {
				duration: 250,
				easing: Easing.out(Easing.poly(4)),
				timing: Animated.timing,
			},
			screenInterpolator: sceneProps => {
				const {layout, position, scene} = sceneProps
				const {index} = scene
				
				const height = layout.initHeight
				const translateX = position.interpolate({
					inputRange: [index - 1, index, index + 1],
					outputRange: [height, 0, 0]
				})
				
				const opacity = position.interpolate({
					inputRange: [index - 1, index - 0.99, index],
					outputRange: [0, 1, 1],
				})
				
				return {opacity, transform: [{translateX}]}
			},
		}),
	});
```

## 隐藏单页的顶部导航条

```markup
static navigationOptions = {
    header: null,
};
```

## headerRight 调用组件的方法

抽出方法，将它赋值给`params`即可。

```
static navigationOptions = ({navigation})=> {
	let {params} = navigation.state
	return {
		title: navigation.state.params.item.title,
		headerRight: <View>
			<Touchable onPress={params._shareTo}>
				<Text>分享到其它</Text>
			</Touchable>
		</View>
	}
}

componentDidMount() {
	this.props.navigation.setParams({
		_shareTo: ()=> {
			this._shareTo && this._shareTo('wechat')
		}
	})
}
```
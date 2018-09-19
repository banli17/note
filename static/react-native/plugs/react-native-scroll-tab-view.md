# react-native-scroll-tab-view组件的使用


## 顶部

效果图：

```markup
<ScrollableTabView
    tabBarBackgroundColor='#fff'
    tabBarUnderlineStyle={{backgroundColor:DEFAULT_COLOR}}
    tabBarActiveTextColor={DEFAULT_COLOR}
    renderTabBar={() => <ScrollableTabBar />}
>
    {
        lists.map((item,i)=>{
            return (
                <Text key={i} tabLabel={item.title}>hello</Text>
            )
        })
    }
</ScrollableTabView>
```

## 注意

- `ScrollableTabView` 外层盒子要用 `flex: 1`,否则导航切换会卡顿。
---
title: "react-native-video 使用总结"
date: 2018-06-16 15:18:39
toc: true
---


## 全屏播放

```javascript
import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Dimensions, View} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';

const {width, height} = Dimensions.get('window')

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            videoWidth: width,
            videoHeight: height,
            isFullScreen: true,
            videoUrl:'http://v8.yongjiu8.com/20180802/kzCulbjS/index.m3u8'
        }
    }

    onBuffer = () => {

    }

    onEnd = () => {
    }

    videoError = () => {

    }

    componentWillMount() {

    }

    componentDidMount() {
        // this locks the view to Portrait Mode


        Orientation.addOrientationListener(this._onLayout);

        Orientation.lockToLandscapeLeft()
    }

    _onLayout = (event) => {
        //获取根View的宽高
        let {width, height} = event.nativeEvent.layout;
        console.log('通过onLayout得到的宽度：' + width);
        console.log('通过onLayout得到的高度：' + height);

        // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
        let isLandscape = (width > height);
        if (isLandscape){
            this.setState({
                videoWidth: width,
                videoHeight: height,
                isFullScreen: true,
            })
        } else {
            this.setState({
                videoWidth: width,
                videoHeight: width * 9/16,
                isFullScreen: false,
            })
        }
    }


    render() {

        return (
            <View style={styles.container} onLayout={this._onLayout}>
                <Video
                    ref={(ref) => this.videoPlayer = ref}
                    source={{uri: this.state.videoUrl}}
                    rate={1.0}
                    volume={1.0}
                    muted={false}
                    resizeMode={'cover'}
                    playWhenInactive={false}
                    playInBackground={false}
                    ignoreSilentSwitch={'ignore'}
                    progressUpdateInterval={250.0}
                    style={{width: this.state.videoWidth, height: this.state.videoHeight}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    backgroundVideo: {
        width: width,
        height: height,
    }
});

```


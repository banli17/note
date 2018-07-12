# react-native-camera

## 简介

- [https://github.com/react-native-community/react-native-camera](https://github.com/react-native-community/react-native-camera)

## 功能支持

- 选相册
- 拍照片、视频
- 人脸识别
- 二维码识别
- 文本识别 (Android only)

## 安装

```
npm i react-native-camera
react-native link react-native-camera
```

我的环境：
- react-native 0.56
- react 16.4.1
- react-native-camera 1.1.4

**安装过程中可能出现的问题：**
1. Android dependency 'com.android.support:exifinterface' has different version for the compile (25.4.0) and runtime (27.1.0) classpath. You should manually set the same version via DependencyResolution。
2. no google funciton。

**最终的解决方法如下：**

1、修改`android/gradle/wrapper/gradle-wrapper.properties`

```bash
distributionUrl=https\://services.gradle.org/distributions/gradle-4.4-all.zip
```

2、修改`android/build.gradle`

```
buildscript {
    repositories {
        google()   // 添加
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.0'  // 这里

    }
}

allprojects {
    repositories {
        google()  // 添加
        ...
    }
}
```

3、修改`android/app/build.gradle`

```
android {
    defaultConfig{
        ...
        multiDexEnabled true
    }
}
```


## 使用

```javascript
import { RNCamera } from 'react-native-camera'


<RNCamera
    style={{flex:1 }}
    type={RNCamera.Constants.Type.back}
    flashMode={RNCamera.Constants.FlashMode.on}
    permissionDialogTitle={'Permission to use camera'}
    permissionDialogMessage={'We need your permission to use your camera phone'}
>
    {({ camera, status }) => {
        if (status !== 'READY') return <Text>加载</Text>;
        return (
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
            </View>
        );
    }}
</RNCamera>
```

## 参数详解

参考[react-native-camera 参数文档](https://github.com/react-native-community/react-native-camera/blob/master/docs/RNCamera.md)。


**flashMode**

- `RNCamera.Constants.FlashMode.torch`：打开手电筒


# react-native-webview-bridge

最近的一个项目需要实现下面功能。

- app端获取cookie，打开webview网页时注入，实现自动登录
- 网页能上传图片（官方webview不支持，react-native-webview-android 能用）
- 和 js 通信 (测了下官方webview不好用，react-native-webview-android 其它地方有些问题)

所以找到react-native-webview-bridge，它不支持图片上传，但是可以改下。

## 在app端获取cookie，并写入webview

需求：app端获取到对应的 cookie 后，webview打开网页时，将cookie写入，自动登录网页商城。

我的思路是首先在 app 获取 cookie，打开远程一个空白网页 3.html，用 js 写入 cookie 后再跳转到商城。

实现中还是有一些坑，比如不能用本地 html 空白页，需要延迟重复请求，this.ok 等。

```javascript
import React, {Component} from "react"
import {
    View,
    NativeAppEventEmitter,
    Alert, Image
} from "react-native"
import {ActivityIndicator} from 'antd-mobile-rn'
import {pointMallApi, mineApi} from 'api'
import {WebViewBridge} from 'react-native-boom'
import {Button, Text} from "native-base";

const querystring = require('querystring')

const injectScript = `(function () {
    if (WebViewBridge) {
      WebViewBridge.onMessage = function (message) {
        try{
            message = JSON.parse(message);
        if (message.init == "1") {
            document.cookie = message.cookie;
            if( location.href.indexOf('point/index') == -1 ){
                location.href="https://shop.xx.com/shop/index";
                WebViewBridge.send("ok");
            }
        }
        }catch(ex){
            alert('error')
        }
      };
      
      WebViewBridge.send("init");
    }
  }());
`;

export default class PointMallIndex extends Component {

    static navigationOptions = ({navigation}) => {
            return {
                header: null
            }
    }

    constructor(props) {
        super(props)

        this.state = {
            needBindWechat: 0
        }
    }

    login = async () => {
        if (this.isLoging || this.ok) return
        this.isLoging = true
        let res1 = await pointMallApi.login()

        // 1、请绑定微信号
        if ($.hasProp(res1.data, 'cookie')) {

            let postData = {cookie: res1.data.cookie[1], init: 1}

            this.refs.webviewbridge.sendToBridge(JSON.stringify(postData));
            this.isLoging = false
            return
        }

        if ($.hasProp(res1.error, 'code') && res1.error.code == 1) {
            // 需要绑定微信
            this.setState({
                needBindWechat: 1
            })

            this.isLoging = false
            this.ok = 1

            this.return
        }

        this.isLoging = false
        this.login()
    }

    //回调
    onBridgeMessage(message) {
        const {webviewbridge} = this.refs;
        console.log("收到webview数据");
        console.log(message);
        switch (message) {
            case "init":
                this.login()
                break;

            case "ok":
                this.ok = 1;
                break;
        }
    }

    onLoadStart = () => {
        setInterval(() => {
            if (!this.ok) {
                this.login()
            }
        }, 5000)
    }

    onLoad = () => {}

    onError = () => {}

    onNavigationStateChange = (e) => {}

    renderLoading = () => {
        return <View style={$.style.flexCenter}>
            <ActivityIndicator/>
        </View>
    }

    render() {
        if (this.state.needBindWechat) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        source={{uri: ICONFONT.empty}}
                        style={{width: 130, height: 130}}
                        tintColor={'#ddd'}/>
                    <Text style={{marginBottom: 20, color: '#999'}}>请先绑定微信</Text>
                    <View>
                        <Button rounded bordered success onPress={() => Helper.bindWechat(this.login)}>
                            <Text>绑定微信</Text>
                        </Button>
                    </View>
                </View>
            )
        }

        return <WebViewBridge
            ref="webviewbridge"
            originWhitelist={["http://.*", "https://.*"]}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onBridgeMessage={this.onBridgeMessage.bind(this)}
            injectedJavaScript={injectScript}
            allowUniversalAccessFromFileURLs={true}
            onLoadStart={this.onLoadStart}
            onLoad={this.onLoad}
            onError={this.onError}
            renderLoading={this.renderLoading}
            mixedContentMode="compatibility"
            onNavigationStateChange={this.onNavigationStateChange}
            source={{uri: 'https://shop.xx.com/3.html?_t=' + new Date().getTime()}}/>

    }
}
```

## 上传图片

默认`react-native-webview-bridge`不支持网页图片上传。修改步骤如下。

1、将库java目录下的 reactnativewebviewbridge 目录拷贝到主项目目录。并修改三个文件里的package。
```java
// package com.github.alinz.reactnativewebviewbridge; 修改成下面的
package com.jiujiuwu.pay.reactnativewebviewbridge;
```

2、注释掉主项目中的 compile

```java
//compile project(':react-native-webview-bridge')
```

3、主项目的 MainActivity.java 改成下面这样。

```java
package com.jiujiuwu.pay;

import android.os.Bundle;
import com.facebook.react.ReactActivity;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.ClipData;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.webkit.ValueCallback;

import com.netease.im.uikit.permission.MPermission;
import com.netease.im.RNNeteaseImModule;
import com.netease.im.ReceiverMsgParser;

import java.util.Arrays;
import java.util.List;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
    public static boolean isActivityCreated;
    private ValueCallback<Uri> mUploadMessage;
    private ValueCallback<Uri[]> mUploadCallbackAboveL;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        isActivityCreated = true;

        if(ReceiverMsgParser.checkOpen(getIntent())){//在后台时处理点击推送消息
            RNNeteaseImModule.launch = getIntent();
        }

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        isActivityCreated = false;
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "jjwapp";
    }

    @Override
     public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
            MPermission.onRequestPermissionsResult(this, requestCode, permissions, grantResults);
     }


    // 增加下面代码
    public void setUploadMessage(ValueCallback<Uri> uploadMessage) {
        mUploadMessage = uploadMessage;
    }

    public void setmUploadCallbackAboveL(ValueCallback<Uri[]> mUploadCallbackAboveL) {
        this.mUploadCallbackAboveL = mUploadCallbackAboveL;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode,
                                 Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 1) {
            if (null == mUploadMessage && null == mUploadCallbackAboveL) return;
            Uri result = data == null || resultCode != RESULT_OK ? null : data.getData();
            if (mUploadCallbackAboveL != null) {
                onActivityResultAboveL(requestCode, resultCode, data);
            } else if (mUploadMessage != null) {
                mUploadMessage.onReceiveValue(result);
                mUploadMessage = null;
            }
        }


    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    private void onActivityResultAboveL(int requestCode, int resultCode, Intent data) {
        if (requestCode != 1
                || mUploadCallbackAboveL == null) {
            return;
        }
        Uri[] results = null;
        if (resultCode == Activity.RESULT_OK) {
            if (data == null) {
            } else {
                String dataString = data.getDataString();
                ClipData clipData = data.getClipData();
                if (clipData != null) {
                    results = new Uri[clipData.getItemCount()];
                    for (int i = 0; i < clipData.getItemCount(); i++) {
                        ClipData.Item item = clipData.getItemAt(i);
                        results[i] = item.getUri();
                    }
                }
                if (dataString != null)
                    results = new Uri[]{Uri.parse(dataString)};
            }
        }
        mUploadCallbackAboveL.onReceiveValue(results);
        mUploadCallbackAboveL = null;
        return;
    }
}
```

4、主项目的 MainApplication.java 文件改一句。

```java
import com.自己的主包.reactnativewebviewbridge.WebViewBridgePackage;
```

再重新编译一下，就好了。

## app 嵌入 h5 微信支付，出现商家参数错误

需要修改支付页的 referrer。注入 `<meta name="referrer" content="origin" />`即可。

```js
const jsCode = `
        ;(function(){
            
            if( location.href.indexOf('10010.com/npfwap/npfMobWap/bankcharge') > -1 ){
                var meta = document.createElement('meta');
                meta.setAttribute("name","referrer");
                meta.setAttribute("content","origin");
                document.head.appendChild(meta);
            }
        
            setTimeout(function(){
                if(document.querySelector('title').innerText && !/\w{4}/.test(document.querySelector('title').innerText)){
                    window.postMessage(document.querySelector('title').innerText)}
                }
            , 1000);
        })();
          `
          
<WebViewBridge
    originWhitelist={["http://.*", "https://.*"]}
    ref={ref => this.webview = ref}
    style={{flex: 1}}
    javaScriptEnabled={true}
    onLoadStart={this.loadStart}
    onLoadEnd={this.loadEnd}
    onMessage={this._onMessage}
    injectedJavaScript={jsCode}
    source={{
        uri: data.operate_value
    }}/>
```

## 注意

1. `originWhitelist={["http://.*", "https://.*"]}` 这句可以防止 webview 新页面从浏览器端打开。

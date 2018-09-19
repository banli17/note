# 安卓原生模块: 集成umeng第三方分享与登录

## 准备工作

1、首先到`umeng`官方下载`android`版本的`sdk`。
```
sdk下载： http://dev.umeng.com/social/android/sdk-download
集成文档： http://dev.umeng.com/social/android/quick-integration
```
直接下载，不用选择分享平台，因为后面再选择。

2、打开下载下来的文件，解压。点击友盟集成工具，选择要分享的平台，和下面集成方式：`android studio`。把分享面板也打钩上。然后生成。

<img src="http://www.w3croad.com/images/20170725/5.png">

3、生成后，目录下会新出现一个`umeng_integratetool_result`文件夹。

<img src="http://www.w3croad.com/images/20170725/4.png">

## 开始集成分享

1、首先用`android studio`打开项目，点击菜单的 `File -> New -> New Module` 新建一个模块，选择`Android Library`，点击 `Next`。

2、修改库名为`UShare`，包名为`com.xxx.ushare`。（com.xxx是你的项目包名）。然后点击`Finish`完成。

<img src="http://www.w3croad.com/images/20170725/3.png">

3、打开`app`项目的`android->ushare`文件夹。
   - 将准备工作中的`umeng_integratetool_result/libs`里的文件拖到`ushare/libs`文件夹里。
   - 将准备工作中的`umeng_integratetool_result/res`里的文件拖到`ushare/src/main/res`文件夹里。
   - 将准备工作中的`umeng_integratetool_result/src`里的`wxapi`文件拖到`ushare/src/main/java/com/`文件夹里。

最后目录结构是这样：
<img src="http://www.w3croad.com/images/20170725/6.png">

4、打开`android/ushare/src/build.gradle`，在dependencies里面新增`libs`目录下的jar文件。

<img src="http://www.w3croad.com/images/20170725/7.png">

```
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    androidTestCompile('com.android.support.test.espresso:espresso-core:2.2.2', {
        exclude group: 'com.android.support', module: 'support-annotations'
    })
    compile 'com.android.support:appcompat-v7:25.0.0'
    compile 'com.facebook.react:react-native:+'   // 新增
    testCompile 'junit:junit:4.12'

    // 新增
    compile files('libs/SocialSDK_QQ_Full.jar')
    compile files('libs/SocialSDK_alipay.jar')
    compile files('libs/libapshare.jar')
    compile files('libs/open_sdk_r5788_lite.jar')
    compile files('libs/SocialSDK_Sina_Simplify.jar')
    compile files('libs/SocialSDK_WeiXin_Full.jar')
    compile files('libs/umeng_shareboard_widget.jar')
    compile files('libs/umeng_social_api.jar')
    compile files('libs/umeng_social_net.jar')
    compile files('libs/umeng_social_shareboard.jar')
    compile files('libs/umeng_social_shareview.jar')
    compile files('libs/umeng_social_tool.jar')
    compile files('libs/wechat-sdk-android-with-mta-1.1.6.jar')
}
```

5、在`/ushare/src/main/java/com/xxx/ushare/`目录下新增如下文件。

<img src="http://www.w3croad.com/images/20170725/13.png" width='350'>

`model/ShareModel.java`内容是：
```
package com.jph.u_share.model;

import com.facebook.react.bridge.Callback;

/**
 * Created by penn on 16/10/14.
 */

public class ShareModel {

    private String title;
    private String content;
    private String imageUrl;
    private String targetUrl;
    private Callback errorCallback;
    private Callback successCallback;

    public ShareModel(String title, String content, String imageUrl, String targetUrl, Callback errorCallback, Callback successCallback) {
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.targetUrl = targetUrl;
        this.errorCallback = errorCallback;
        this.successCallback = successCallback;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getTargetUrl() {
        return targetUrl;
    }

    public void setTargetUrl(String targetUrl) {
        this.targetUrl = targetUrl;
    }

    public Callback getErrorCallback() {
        return errorCallback;
    }

    public void setErrorCallback(Callback errorCallback) {
        this.errorCallback = errorCallback;
    }

    public Callback getSuccessCallback() {
        return successCallback;
    }

    public void setSuccessCallback(Callback successCallback) {
        this.successCallback = successCallback;
    }
}

```

`util/Constants.java`内容是：
```
package com.jph.u_share.util;

public class Constants {

    public static final String KEY_WEIXIN="wx3b88e890abe41fce";
    public static final String SECRET_WEIXIN="0dde0a5a5efeb080b086f3f969f386bc";
    public static final String KEY_WEIBO="3114976530";
    public static final String SECRET_WEIBO="40a599d4fa35b733e3562f19241eabe9";
    public static final String KEY_QQ="1105745872";
    public static final String SECRET_QQ="KXOXABjlHrqrJD3z";

    public static final int RC_REQUEST_PERMISSIONS=6006;

}

```

`util/Constants.java`内容是：
```
package com.jph.u_share.util;

public class Constants {

    public static final String KEY_WEIXIN="wx3b88e890abe41fce";
    public static final String SECRET_WEIXIN="0dde0a5a5efeb080b086f3f969f386bc";
    public static final String KEY_WEIBO="3114976530";
    public static final String SECRET_WEIBO="40a599d4fa35b733e3562f19241eabe9";
    public static final String KEY_QQ="1105745872";
    public static final String SECRET_QQ="KXOXABjlHrqrJD3z";

    public static final int RC_REQUEST_PERMISSIONS=6006;

}

```
`UShare.java`的内容如下：
```
package com.jph.u_share;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.text.TextUtils;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.jph.u_share.model.ShareModel;
import com.jph.u_share.util.Constants;
import com.umeng.socialize.ShareAction;
import com.umeng.socialize.UMShareAPI;
import com.umeng.socialize.UMShareListener;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.media.UMImage;
import com.umeng.socialize.utils.Log;

import java.lang.ref.WeakReference;
/**
 * 分享组件
 * 出自：http://www.devio.org
 * GitHub:https://github.com/crazycodeboy
 * Eamil:crazycodeboy@gmail.com
 */
public class UShare {
    private static WeakReference<Activity> mActivity;
    private static WeakReference<ShareModel> mShareModel;

    public static void init(Activity activity) {
        if (activity == null) return;
        mActivity = new WeakReference<>(activity);
    }
    public static void share(final String title, final String content, final String imageUrl, final String targetUrl, final Callback errorCallback, final Callback successCallback) {
        if (mActivity == null) return;
        boolean granted = true;
        if (!TextUtils.isEmpty(imageUrl)) {
            granted = ContextCompat.checkSelfPermission(mActivity.get(), Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED ? true : false;
        }
        if (!granted) {
            ShareModel shareModel=new ShareModel(title,content,imageUrl,targetUrl,errorCallback,successCallback);
            mShareModel=new WeakReference<>(shareModel);
            ActivityCompat.requestPermissions(mActivity.get(),new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, Constants.RC_REQUEST_PERMISSIONS);
            return;
        }
        mActivity.get().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                openShare(title, content, imageUrl, targetUrl, errorCallback, successCallback);
            }
        });

    }
    private static void share(ShareModel shareModel){
        share(shareModel.getTitle(),shareModel.getContent(),shareModel.getImageUrl(),shareModel.getTargetUrl(),shareModel.getErrorCallback(),shareModel.getSuccessCallback());
    }
    private static void openShare(String title, String content, String imageUrl, String targetUrl, final Callback errorCallback, final Callback successCallback) {
        ShareAction shareAction = new ShareAction(mActivity.get()).setDisplayList(SHARE_MEDIA.SINA, SHARE_MEDIA.QQ, SHARE_MEDIA.QZONE, SHARE_MEDIA.WEIXIN, SHARE_MEDIA.WEIXIN_CIRCLE, SHARE_MEDIA.WEIXIN_FAVORITE, SHARE_MEDIA.MORE)
                .withTitle(title)
                .withText(content)
                .withTargetUrl(targetUrl)
                .setCallback(new UMShareListener() {
                    @Override
                    public void onResult(SHARE_MEDIA platform) {
                        if (platform.name().equals("WEIXIN_FAVORITE")) {
                            if (successCallback != null) successCallback.invoke("收藏成功啦");
                        } else {
//                            Toast.makeText(mActivity.get(), platform + " 分享成功啦", Toast.LENGTH_SHORT).show();
                            if (successCallback != null) successCallback.invoke("分享成功啦");
                        }
                    }

                    @Override
                    public void onError(SHARE_MEDIA platform, Throwable t) {
                        if (errorCallback != null) errorCallback.invoke("分享失败啦");
                        if (t != null) {
                            Log.d("throw", "throw:" + t.getMessage());
                        }
                    }

                    @Override
                    public void onCancel(SHARE_MEDIA platform) {
                        if (errorCallback != null) errorCallback.invoke("分享取消了");
                    }
                });
        if (!TextUtils.isEmpty(imageUrl)) {
            shareAction.withMedia(new UMImage(mActivity.get(), imageUrl));
        }

        shareAction.open();
    }

    public static void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (mActivity == null) return;
        UMShareAPI.get(mActivity.get()).onActivityResult(requestCode, resultCode, data);
    }
    public static void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if(mShareModel==null)return;
        if (requestCode == Constants.RC_REQUEST_PERMISSIONS) {
            for (int i = 0, j = permissions.length; i < j; i++) {
                if(TextUtils.equals(permissions[i],Manifest.permission.WRITE_EXTERNAL_STORAGE)){
                    if (grantResults[i] == PackageManager.PERMISSION_GRANTED) {
                        share(mShareModel.get());
                    }else {
                        if(mActivity==null)return;
                        Toast.makeText(mActivity.get(),"没有使用SD卡的权限，请在权限管理中为GitHubPopular开启使用SD卡的权限",Toast.LENGTH_SHORT).show();
                    }
                }
            }
        }
    }
}
```

`UShareModule.java`的内容如下：
```
package com.jph.u_share;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * 分享组件
 */

public class UShareModule extends ReactContextBaseJavaModule{

    public UShareModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "UShare";
    }
    @ReactMethod
    public static void share(String title, String content, String imageUrl, String targetUrl, final Callback successCallback, final Callback errorCallback) {
        UShare.share(title,content,imageUrl,targetUrl,successCallback,errorCallback);
    }
}
```

`UShareReactPackage.java`的内容如下：
```
package com.jph.u_share;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List; /**
 * 分享组件
 * 出自：http://www.devio.org
 * GitHub:https://github.com/crazycodeboy
 * Eamil:crazycodeboy@gmail.com
 */
/**
 * 分享组件
 * 出自：http://www.devio.org
 * GitHub:https://github.com/crazycodeboy
 * Eamil:crazycodeboy@gmail.com
 */
public class UShareReactPackage implements ReactPackage {

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new UShareModule(reactContext));
        return modules;
    }
}
```

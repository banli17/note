---
title: "react-native 一键分享多图到微信"
date: 2016-10-13 01:51:25
toc: true
---

## 一键分享多图到微信


>今天在github上找到个插件<a href='https://github.com/kmlidc/react-native-share-local' target='_blank'>react-native-share-local</a>，可以直接用 

公司app有一个需求，实现多图文分享，但是微信官方提供的api没有提供接口，所以只能用原生的分享实现。

## 安卓版本

1、首先用`android studio`打开`react-native` 的`android`项目新建一个`library`，名字叫做：`umshare`。


2、引入`umshare`包，即在项目的`android/setting.gradle`中添加一个`:umshare`

```Java
include ':react-native-code-push', ':umshare' //(只要这个)
project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')
```


3、在`umshare`目录下的`src/main/java/com/ddck/umshare`目录里，添加三个文件`UShare.java`、`UShareModule.java`、`UShareReactPackage.java`。

`UShare.java`的内容如下：

```Java
package com.ddck.umshare;

import android.app.Activity;
import android.content.ComponentName;

import android.content.Context;
import android.content.Intent;
import android.content.ContentResolver;
import android.provider.MediaStore;
import android.database.Cursor;

import android.net.Uri;
import java.io.File;

import android.widget.Toast;
import com.facebook.react.bridge.*;
import java.util.*;
import java.lang.ref.WeakReference;

public class UShare {
    private static WeakReference<Activity> mActivity;

    public static void init(Activity activity) {
        if (activity == null) return;
        mActivity = new WeakReference<>(activity);
    }

    public static String getRealFilePath(final Context context, final Uri uri) {
        if (null == uri) return null;
        final String scheme = uri.getScheme();
        String data = null;
        if (scheme == null)
            data = uri.getPath();
        else if (ContentResolver.SCHEME_FILE.equals(scheme)) {
            data = uri.getPath();
        } else if (ContentResolver.SCHEME_CONTENT.equals(scheme)) {
            Cursor cursor = context.getContentResolver().query(uri, new String[]{MediaStore.Images.ImageColumns.DATA}, null, null, null);
            if (null != cursor) {
                if (cursor.moveToFirst()) {
                    int index = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATA);
                    if (index > -1) {
                        data = cursor.getString(index);
                    }
                }
                cursor.close();
            }
        }
        return data;
    }

    /**
     * 通过url 得到文件路径
     *
     * @param url
     * @return
     */
    public static String getRealFilePath(String url) {
        return getRealFilePath(mActivity.get(), Uri.parse(url));
    }

    public static void share(String Kdescription, ReadableArray paths){
            if (mActivity == null) return;
            Intent intent = new Intent();
            intent.setComponent(new ComponentName("com.tencent.mm", "com.tencent.mm.ui.tools.ShareToTimeLineUI"));
            intent.setAction("android.intent.action.SEND_MULTIPLE");
            ArrayList<Uri> imageList = new ArrayList<Uri>();
            for(int i=0; i<paths.size();i++){
                String picPath = paths.getString(i);
                File f = new File(getRealFilePath(picPath));

                if (f.exists()) {
                    imageList.add(Uri.fromFile(f));
                }
            }

            if(imageList.size() == 0){
                return;
            }
            intent.setType("image/*");
            intent.putExtra(Intent.EXTRA_STREAM, imageList); //图片数据（支持本地图片的Uri形式）
            intent.putExtra("Kdescription", Kdescription); //微信分享页面，图片上边的描述
            mActivity.get().startActivity(intent);

        }

}
``` 

`UShareModule.java`的内容如下：

```Java
package com.ddck.umshare;

/**
 * Created by banli on 16/6/26.
 */

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
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
    public static void share(String Kdescription, ReadableArray paths){
        UShare.share( Kdescription, paths);
    }
}
``` 

`UShareReactPackage.java`的内容如下：

```Java
package com.ddck.umshare;

/**
 * Created by banli on 16/6/26.
 */


import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


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

4、在`android/app/src/main/AndroidMainfest.xml`里添加下面的代码：

```Java
<activity
      android:name=".wxapi.WXEntryActivity"
      android:label="@string/app_name"
      android:exported="true"
/>

```
5、在`android/app/src/main/com/包名/MainApplication.java`中添加如下代码：

```Java
import com.ddck.umshare.UShareReactPackage;  // 添加

protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new UShareReactPackage()  // 添加
      );
}
```

6、在`android/app/src/main/com/包名/MainActivity.java`中添加如下代码：

```javascript
import com.ddck.umshare.UShare;  // 添加

protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        UShare.init(this);   // 添加
}
```

7、导出给js使用，在项目中添加一个`UShare.js`即可

```javascript
import { NativeModules } from 'react-native';
module.exports = NativeModules.UShare;
```

8、使用

```javascript
// 需要首先将图片缓存到本地、然后放到相册中，获取相册中的地址
import UShare from 'basic/UShare'
let path = ImageCache.get().cache[IMG_BASE + imgs[i]].path; 
if (!path) {
    throw new Error("图片还没有加载完成")
    return
}
await CameraRoll.saveToCameraRoll(path, 'photo').then((e)=> {
    this.shareImgs[i] = e
})
UShare.share(this.shareImgs, ()=> {})
```


**参考资料**

- http://blog.csdn.net/u014220518/article/details/53465631
- <a href='https://github.com/JeffWangGithub/TestWXMultiShare' target='_blank'>微信多图文分享安卓TestWXMultiShare</a> 
- <a href='http://www.jianshu.com/p/ce123a2015f9' target='_blank'>ios多图程序内分享到微信
  </a>



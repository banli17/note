# android必备知识

## R.string是什么?

`R.string.Role_white` 意思是在 string 资源中定义的字符串`Role_white`的值。
- R = Resource
- string = string.xml
- Role_white = <Role_white>标记对应的值

![](./imgs/r.jpg)

## AndroidManifest.xml

## 修改包名

假设包名为com.exease.etd.objective，以下地方需要修改。

首先是两个java文件：android/app/src/main/java/com/PROJECT_NAME/MainActivity.java和/MainApplication.java，修改第一行为package com.exease.etd.objective;
然后是安卓的描述文件android/app/src/main/AndroidManifest.xml，第二行把package的至改为com.exease.etd.objective
之后是两个打包脚本。
android/app/BUCK，修改两个package的值package = 'com.exease.etd.objective',
android/app/build.gradle其中的applicationID，改为applicationId "com.exease.etd.objective"
修改完成后，命令行进入android目录，执行./gradlew clean清除缓存即可（windows上是 gradlew.bat）
android/app/src/AndroidManifest.xml里package。
还有MainActivity.java同级目录里文件的package。

## 权限

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.reactlibrary">
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="18"/>
</manifest>

```

### AndroidManifest.xml 加多个package

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.myactivities"
      android:versionCode="1"
      android:versionName="1.0">
    <application android:icon="@drawable/icon" android:label="@string/app_name">
        <activity android:name=".ActivityMain"
                  android:label="@string/app_name">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

每一个Activity、Service等应用程序组件都会对应AndroidManifest.xml文件中的一个<activity>、<service>标签。在这些标签中有一个必选的属性：android:name，该属性需要指定一个类名，例如，android.intent.action.MAIN类。指定android:name属性值有如下3种方式：
1.  指定完全的类名（packagename+classname），例如，android.intent.action.MAIN。
2.  只指定类名，例如，.ActivityMain，其中ActivityMain前面的“.”是可选的。该类所在的包名需要在<manifest>标签的package属性中指定。
3.  指定相对类名，这种方式类似于第2种方式，只是在<activity>标签的android:name属性中不光指定类名，还有部分包名。例如，如果Main类在net.blogjava.mobile.abcd包中，就可以在<manifest>标签的package属性中指定net.blogjava.mobile，然后在<activity>标签的android:name属性中指定.abcd.Main。
        由此可见，package的目的是为了更方便地指定android:name以及其他相关属性的值，就是一个默认的包。如果不在android:name中指定包名，会自动将package属性值加在前面。

## Plugin with id 'com.novoda.bintray-release' not found?

在 `build.gradle` 中添加：

```
dependencies {
    classpath 'com.android.tools.build:gradle:1.5.0'
    //添加下面这行代码就OK了
    classpath 'com.novoda:bintray-release:0.3.4'
```


## 关于requestPermissions不显示权限申请而直接跳转onRequestPermissionsResult的问题

当TargetSdk小于23时,即使运行在6.0以上的机型时,requestPermissions都不会弹出权限申请,无论是SDK里面的API还是V4包里面的API,都直接回调onRequestPermissionsResult,并且permissions和grantResults数组的长度都是0! 所以想通过requestPermissions来让用户授权是没用的,还是老老实实弹Toast或者提示跳转到Setting页让用户更改应用权限吧。

##  Could not expand ZIP

```
cd android && gradlew clean
```

## Configuration with name 'default' not found

看是不是某个库卸载了但是android文件依赖了。

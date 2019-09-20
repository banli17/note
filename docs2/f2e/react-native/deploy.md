---
title: "react-native ios发布"
date: 2018-07-04 05:17:29
toc: true
---


## 参考文章

- http://www.jianshu.com/p/1d03f8f31f58?nomobile=yes


## 加速审核

- https://developer.apple.com/contact/app-store/?topic=expedite




ios版本的发布太麻烦了，主要分为以下几个步骤:

## 在 itunes Connect 中新建 app

进入<a href='https://itunesconnect.apple.com/login' target='_blank'>Itunes Connect官网</a>，登录，注意如果有多个账号不要登录错了。选择`我的App`。

然后点击左上角的加号，添加一个app。注意这里有个问题，ios 包名必须是 `com.xxx.yyy`形式，不能是 `com.xxx`，否则套装ID会有问题。


## 生成icon图标，屏幕截图，启动页等图片

**生成icon图标**

http://ydimage.yidianhulian.com/ 

**生成启动页** 

使用App icon gear 工具

**生成启动页** 

直接用`xcode sumulator`模拟器打开后，`command + 1`，然后 `command + s` 保存屏幕截图，即使模拟器超出了屏幕也不要紧，会自动截完整。最后的截图会在电脑的桌面上。

要注意的是，如果外接了显示器，一定要把模拟器拖到mac原显示器上，否则尺寸会不对。


## 打包提交Appstore

### [Transporter Error Output]: ERROR ITMS-90087: "Unsupported Architectures. The executable for AppName.app/Frameworks/Usabilla.framework contains unsupported architectures '[x86_64, i386]'."

In Targets -> build Phases -> add a Run Script step just after the copy file step of Usabilla

shell: /bin/sh

file
```
if [ "${CONFIGURATION}" = "Release" ]; then


APP_PATH="${TARGET_BUILD_DIR}/${WRAPPER_NAME}"

# This script loops through the frameworks embedded in the application and
# removes unused architectures.
find "$APP_PATH" -name '*.framework' -type d | while read -r FRAMEWORK
do
FRAMEWORK_EXECUTABLE_NAME=$(defaults read "$FRAMEWORK/Info.plist" CFBundleExecutable)
FRAMEWORK_EXECUTABLE_PATH="$FRAMEWORK/$FRAMEWORK_EXECUTABLE_NAME"
echo "Executable is $FRAMEWORK_EXECUTABLE_PATH"

EXTRACTED_ARCHS=()

for ARCH in $ARCHS
do
echo "Extracting $ARCH from $FRAMEWORK_EXECUTABLE_NAME"
lipo -extract "$ARCH" "$FRAMEWORK_EXECUTABLE_PATH" -o "$FRAMEWORK_EXECUTABLE_PATH-$ARCH"
EXTRACTED_ARCHS+=("$FRAMEWORK_EXECUTABLE_PATH-$ARCH")
done

echo "Merging extracted architectures: ${ARCHS}"
lipo -o "$FRAMEWORK_EXECUTABLE_PATH-merged" -create "${EXTRACTED_ARCHS[@]}"
rm "${EXTRACTED_ARCHS[@]}"

echo "Replacing original executable with thinned version"
rm "$FRAMEWORK_EXECUTABLE_PATH"
mv "$FRAMEWORK_EXECUTABLE_PATH-merged" "$FRAMEWORK_EXECUTABLE_PATH"

done

fi
```

This script is deleting the simulator build out of all libraries (just for Usabilla) only when the build is a Release one.


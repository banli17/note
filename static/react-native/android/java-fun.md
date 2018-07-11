# 常用的java函数


## 获取远程文件的大小

```java
import java.net.URL;
import java.net.URLConnection;
import java.net.HttpURLConnection;
import java.io.IOException;
import com.facebook.react.bridge.Promise;

@ReactMethod
public void getFileSize(String path,Promise promise) throws Exception{
    URL url = new URL(path);
    HttpURLConnection conn = null;
    try {
        conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("HEAD");
        conn.getInputStream();
        promise.resolve("" + conn.getContentLength());
    } catch (IOException e) {
        promise.reject("-1");
    } finally {
        conn.disconnect();
    }
}
```

## 安装apk文件

```java
import android.content.Intent;
import android.net.Uri;

@ReactMethod
public void install(String path) {
    String cmd = "chmod 777 " + path;
    try {
        Runtime.getRuntime().exec(cmd);
    } catch (Exception e) {
        e.printStackTrace();
    }
    Intent intent = new Intent(Intent.ACTION_VIEW);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    intent.setDataAndType(Uri.parse("file://" + path), "application/vnd.android.package-archive");
    reactContext.startActivity(intent);
}
```

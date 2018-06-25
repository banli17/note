# java基础知识

## 资料

- [java基础教程](http://www.runoob.com/java/java-modifier-types.html)
- https://reactnative.cn/docs/0.51/native-modules-android.html
- https://www.jianshu.com/p/b9a7dbe9b336
- http://www.devio.org/
- https://www.jianshu.com/u/ca3943a4172a
- https://github.com/crazycodeboy
- https://gradle.org/install/
- http://maven.apache.org/download.cgi  mac下载二进制zip文件

## 变量类型

java 支持的变量类型有：
- 类变量
- 实例变量
- 局部变量

```
public class Variable{
    static int allClicks=0;    // 类变量，初始化后值不能修改
 
    String str="hello world";  // 实例变量，可以在其他方法中使用
 
    public void method(){
 
        int i =0;  // 局部变量

        str = 'hi';
 
    }
}
```

## 访问修饰符

- default：在同一包内可见
- private：在同一类内可见
- public：对所有类可见
- protected

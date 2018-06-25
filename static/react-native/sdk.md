# sdk manager工具问题总结

1. 找不到 `extra -> support library`？

因为这个包 google 准备将它移除掉。不推荐使用了。如果需要使用，可以到[mvnrepository](http://www.mvnrepository.com/artifact/com.android.support/support-v4?repo=google)下载对应的aar版本。然后将它的后缀名改成 .zip。解压后目录里有个 `classes.jar`。
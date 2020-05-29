# java

## 注解

注解主要起到标识作用，是 JDK5.0 提出的，java 增加对元数据的支持，也就是注解 Annotation。

元数据是用来描述数据的数据，也就是描述代码之间关系，或代码与其它资源(数据库)之间关系的数据。

举例：struts ，元数据就是 struts-config.xml， hibernate 来说就是 hbm 文件。

JDK5.0 出来后，java 语言提出了四种类型：类 class、枚举 enum、接口 interface 和注解(@interface) 他们处于同一级别。

三个基本注解

- @Override: 限定重写父类的方法，该注解只能用于方法
- @Deprecated: 用来表示类或方法已过时
- @SupperessWarnings: 抑制编译器警告
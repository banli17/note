# mongoose

mongoose 是一个 npm 库，定义了一些操作 mongodb 的接口。

## 学习资料

- [mongoose官方文档](http://mongoosejs.com/docs/schematypes.html)

下面是我跟着文档从头到尾操作了一遍，总结的一些笔记。

## 启动 mongodb

下载安装完 mongodb 后，启动。

### win10开机启动mongod

以管理员身份运行cmd。执行下面命令

```bash
mongod --dbpath=C:\data\db --logpath=C:\data\log\mongodb.log --serviceName "mongodb" --install --serviceDisplayName "mongodb"
```

然后运行下面命令：

```bash
net start mongodb
```

打开服务面板的方式，`win+r`，输入`services.msc`。

### 安装可视化工具 roboMongodb

下载地址：[robomongodb](https://robomongo.org/)

## 使用mongoose

1、安装 monogoose

```bash
npm install mongoose
```

2、连接数据库

```javascript
var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/test')
var db = mongoose.connection
db.on('error', ()=>{
    console.log('error')
})
db.once('open', ()=>{
    console.log('connected')
})
```

上面的代码，mongodb 会查看是否存在 test 数据库，如果不存在会自动创建。注意：在`robo 3t`软件里还看不到这个数据库，需要保存一条数据之后，才可以看到。

3、定义表结构。在 Mongoose 里，所有东西都是由 Schema(架构) 驱动。它相当于定义表结构。

```javascript
var userSchema = mongoose.Schema({
    name: String
})

// 这里可以给表增加一个方法，通过methods
userSchme.methods.speak = function(){
    // 这里的name是保存数据时传入的name
    console.log(this.name)
}
```

4、使用 schema 生成 model。它相当于是生成一个类，然后就可以用它生成对象，用于保存。

```javascript
var User = mongoose.model('User', userSchema)
```

5、生成对象并保存。

```javascript
var zs= new User({name: '张三'})
zs.save((err, zs){
    if(err) throw err
    console.log('保存成功')

    // 这里zs有表的方法
    console.log(zs.speak())
})
```

6、查询数据。保存成功后，就可以通过 model 的 find 来查询数据了。

```javascript
User.find((err, data)=>{
    if(err) throw err
    console.log(data)
})
```

## Schemas

### SchemaTypes

Schema 的数据类型由下面几种：

- String
- Number
- Data
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal128
- Map

Schema 的配置选项有下面这些：

**Schema类型**

- required：字段是否必须
- default：设置默认值
- select：
- validate：验证函数
- get
- set
- alias

**Indexs**

- index
- unique
- sparse

**String**

- lowercase
- uppercase
- trim
- match
- enum
- minlength：最小长度，可以等于
- maxlength

**Number**

- min
- max

**Data**

- min
- max











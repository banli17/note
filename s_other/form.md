---
title: "大量表单的解决方案"
---

由于我们app里面有大量的(上十个)表单页面，每个表单可能包含下面这些不定字段：

- 输入框
- 多行输入框
- 选择时间
- 选择城市（选省市区或者只有省）
- 选择、拍照银行卡图片并识别
- 选择、拍照身份证图片并识别，填入对应的名字、身份证等字段里
- 选择、拍照营业执照图片并识别
- 选择行业，行业比较多，要跳转到行业页面选择后再跳转回来
- 上传头像
- 等等

另外，有几个表单页面，字段达到数十个，这真是很难处理用户体验，而且我们也没有专门的用户体验师，设计师也有其它任务，所以app界面啥的都是我们自己整。

而且，表单还有下面一些基本的要求：
1. 验证字段
1. 本地存储没有提交的表单 
1. 初始化已经提交过的表单
1. 表单提交后，没有审核通过，需要提示用户哪些字段有问题(这里不是同步通过的，人工审核还需要时间) 

所以如果没有一个整体的方案，这么多表单都是难以管理的。

**思考**

之前我做web表单时，通常是用不同的type自动生成对应的input框。所以我在rn上也采用了这个方法。比如我写一个Form组件，传入下面的数据。

```javascript
// data格式
this.state = {
    formdata:[
        {
            name: 'name',
            type: 'text',
            required: true,
            value: '',
            placeholder:'请输入姓名'
        },
        {
            name: 'age',
            type: 'number',
            required: true,
            value: '',
            min: 0,
            max:100,
            allow_edit:false 
        },
        {
            name: 'avatar',
            type: 'image',
            required: true,
            value: '',
            allow_edit: true
        },
    ]
}

// formdata 是表单的所有数据
submit = (formdata)=>{

}

// 组件
<Form data={formdata} submit={this.submit}>
```

根据这种formdata格式数据里的type就很容易生成不同类型的输入框控件，另外submit也很好处理了，接着来看看我的具体做法吧。

**具体方案**

下面是我的表单控件，放在`components/Form`里。

**index.js**

在这里我导出了表单组件Form，伪代码如下。

```
class Form extends Component{

    constructor(props){
        let formData = props.formData.map(f => {
            // 给单选框设置初始值，防止rn picker 只有触发change时才会修改值
            if (f.type === 'select' && f.value == null) {
                f.value = f.option[0].id 
            }
            return f
        })
        this.state = {
            formData
        }
    }

    onChange = async (item) => {
        let formData = this.state.formData.map(f => {
            if (f.name === item.name) {
                f = item
            }
            return f
        })

        this.setState({
            formData
        }, () => {
            this.props.onChange && this.props.onChange(item, formData)
        })
    }

    submit = ()=>{
        this.props.submit && this.props.submit(data, this.state.formData)
    }
    
    renderItem = ()=>{
        // type = 'hidden'
        if (f.type == 'hidden') {
            return null
        }
        // 动态字段组件
        let CName
        try {
            CName = FormItem[f.type.charAt(0).toUpperCase() + $.toCamelCase(f.type.substring(1))]

            return <CName
                key={i}
                data={f}
                placeholderTextColor={'#ccc'}
                formData={this.state.formData}
                storeKey={this.props.storeKey}
                uploadEnd={this.props.uploadEnd}
                onChange={this.onChange}
            />
        } catch (e) {
            return <Text>字段渲染出错</Text>
        }
    }
    render(){
        <ScrollView>
            {
                formData && formData.map((f, i) => {
                    return <View
                        key={i}
                        pointerEvents={f.allow_edit == 1 ? 'auto' : 'none'}>  // 用来控制是否可编辑
                        {this.renderItem(f, i)}
                    </View>
                })
            }    
            <Button onPress={this.submit}>确认</Button>
        </ScrollView>
    }
}
```

好了，`index.js`大致就是上面那样，当然，还有表单的本地存储，初始化表单数据，这些代码我没贴上来，之后单独再说。

下面是每个字段组件，也就是上面的`FormItem`对象下的各种组件：

- `Text.js`
- `Phone.js`
- `Number.js`
- 等等

```
// Text.js
export default class Text extends Component {

    constructor(props) {
        super(props)
    }

    render = () => {
        let { data } = this.props
        return (
            <Item inlineLabel style={this.props.style}>
                <Label style={this.props.labelStyle}>{data.title}</Label>
                <Input
                    value={data.value || ''}
                    type={'text'}
                    onChangeText={value => {
                        data.value = value
                        this.props.onChange(data)
                    }}
                    placeholder={data.placeholder}
                />
            </Item>
        )
    }
}
```

像上面，我在`Input`的`onChangeText`里修改了字段的value值，并且调用了`index.js`里的`onChange`更新表单的数据。

再来看看单选组件类似：

```
export default class Image extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let {data} = this.props
        return (
            <Item style={[this.props.style, {paddingRight: 10}]}>
                <Label style={this.props.labelStyle}>{data.title}</Label>
                <Picker
                    placeholder="请选择"
                    selectedValue={data.value}
                    onValueChange={(value) => {
                        data.value = value
                        this.props.onChange(data)
                    }}
                >
                    {
                        data.option.map((o, i) => {
                            return <Picker.Item key={i} label={o.text} value={o.id}/>
                        })
                    }
                </Picker>
            </Item>
        )
    }
}
```

使用：像这样处理之后，我们在外部使用表单组件就是十分的简单了。只需要像下面这样：

```js
class MineVerified extends Component {

    static options(passProps) {
        return {
            topBar: {
                title: {
                    text: '资料编辑'
                }
            }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            formData: [
                {
                    allow_edit: 1,
                    required: 1,
                    name: "avatar",
                    option: null,
                    title: "头像",
                    type: "image",
                    desc: '',
                    style: 'avatar',
                    value:  '' 
                },
                {
                    allow_edit: 1,
                    required: 1,
                    name: "nickname",
                    option: null,
                    title: "昵称",
                    type: "text",
                    desc: '',
                    value:  ''
                }
            ]
        }
    }

    submit = async (data) => {
    }

    render() {
        return (
            <Container>
                <Form formData={this.state.formData}
                      submit={this.submit}
                      componentId={this.props.componentId}
                />
            </Container>
        )
    }
}
```

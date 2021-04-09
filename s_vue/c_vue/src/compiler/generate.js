const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
function genProps(attrs) {
    let str = '';
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i]; // name,value
        if (attr.name === 'style') {
            let obj = {};
            attr.value.split(';').forEach(item => {
                let [key, value] = item.split(':');
                obj[key] = value
            });
            attr.value = obj; // {style:{color:red}}
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},` // {a:'aaa',a:1,b:2,}
    }
    return `{${str.slice(0,-1)}}`;
}

function genChildren(el) {
    const children  = el.children;
    if(children){
        return children.map(child=>gen(child)).join(',')
    }
}
function gen(node){ // 区分是元素 还是文本
    if(node.type == 1){
        return generate(node);
    }else{
        //文本 逻辑不能用 _c来处理
        // 有{{}} 普通文本  混合文本 {{aa}} aaa {{bbb}} ccc
        let text =  node.text;
        if(defaultTagRE.test(text)){ // _v(_s(name) + 'aa' + _s(age) + '哈哈'）
            let tokens = [];
            let match ;
            let index = 0;
            let lastIndex = defaultTagRE.lastIndex = 0;
            while(match = defaultTagRE.exec(text)){ // aa {{ age }} haha 
                index = match.index;
                if(index >lastIndex){
                    tokens.push(JSON.stringify(text.slice(lastIndex,index)));
                }
                tokens.push(`_s(${match[1].trim()})`);
                lastIndex = index + match[0].length;
            }
            if(lastIndex < text.length){
                tokens.push(JSON.stringify(text.slice(lastIndex)))
            }
            return  `_v(${tokens.join('+')})`

            // 是带有{{}}
        }else{
            return `_v(${JSON.stringify(text)})`
        }
    }
}
export function generate(el) {
    // console.log(el); // 转换成render代码
    let children = genChildren(el);
    let code = `_c('${el.tag}',${
        el.attrs.length? genProps(el.attrs):'undefined'
    } ${
        children? (',' + children) : ''
    })`;
    // => js代码 html=> js代码  字符串拼接
    return code;
}


/* 
<div id="app" a=1 b=2>
    <span style"=color:red">{{name}} <a>hello</a></span>
</div> 
 _c(
    'div',{id:'app',a:1,b:2}
    ,_c(
        'span',
        {style:{color:'red'}}
        ,_s(_v(name)),
        _c(a,undefined,_v('hello'))
        )
)
*/
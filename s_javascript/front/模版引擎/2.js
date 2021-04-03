var tpl = `
    <% for(var i=0;i<this.posts.length;i++){
        var post = posts[i]; %>
        <% if(!post.expert){ %>
            <span> post is null </span>
        <% } else { %>
            <a href='#'><% post.expert %> at <% post.time %></a>

        <% } %>
    <% } %>
`

var data = {
    "posts": [{
        "expert": "<img src='x' onerror='alert(1)'>",
        "time": "yesterday"
    }, {
        "expert": "content 2",
        "time": "today"
    }, {
        "expert": "content 3",
        "time": "tomorrow"
    }, {
        "expert": "",
        "time": "eee"
    }]
};

function tplEngine(tpl, data) {
    const reg = /<%([\s\S]+?)%>/g,
        regOut = /^\s*(if|for|else|switch|case|break|{|})/;
    let code = 'var r = [];\n',
        cursor = 0;

    // 将tpl放到数组
    function add(line, js) {
        js ? (code += regOut.test(line) ? line : `r.push(${line});`) :
            (code += /^\s*$/.test(line) ? '' : `r.push("${line.replace(/(['"])/g, '\\$1')}");`)
        return add
    }

    while (match1 = reg.exec(tpl)) {
        add(tpl.slice(cursor, match.index))(match[1], true)
        cursor = match.index + match[0].length
    }
    add(tpl.slice(cursor))
    code += ";return r.join('')"

    return new Function('data', code.replace(/[\t\n\r]/g, ''))
    // return new Function(`with(this){${code.replace(/[\t\n\r]/g, '')}}`).apply(data)
}


var res = tplEngine(tpl, data)
console.log(res)
// document.body.innerHTML = res

//
// console.log(`hell
// x`.replace(/[\n]/, ''))

var tpl = 'Hei, my name is <%name%>, and I\'m <%age%> years old.';
var data = {
    name: 'barret lee',
    age: 20
}

var result = tplEngine(tpl, data)


function tplEngine(tpl, data) {
    const reg = /<%([\s\S]+?)%>/g
    return tpl.replace(reg, function (match, p1, start, input) {
        console.log(arguments)
        return data[arguments[1]]
    })
}

console.log(result)
var tpl = 'Hei, my name is <%name%>, and I\'m <%info.age%> years old.';
var data = {
    "name": "Barret Lee",
    "info": {
        age: "20"
    }
}

var result = tplEngine(tpl, data)


function tplEngine(tpl, data) {
    const reg = /<%([\s\S]+?)%>/g
    return tpl.replace(reg, function (match, p1, start, input) {
        return data[arguments[1]]
    })
}

console.log(result)
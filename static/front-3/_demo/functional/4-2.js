// 返回匹配的字符串

//var _ = require('lodash')

var match = function(reg){
    return function(str){
        return str.match(reg)
    }
}

var matchEmtpy = match(/\s+/)

console.log(matchEmtpy(' hello'))


//console.log(_.curry)

function add (num){
    return function (num2){
        return num + num2
    }
}

var a = add(1)
var b = add(10)

console.log(a(2))
console.log(b(2))

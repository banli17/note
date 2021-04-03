

var b = 2
function foo(){
    console.log(b)
    console.log(a)
}

;(function(){
    var a = 1
    foo()
})();
var a = 'hello nihao hello nix hel'

var reg = /h/g
var ok
while (ok = reg.exec(a)) {
    console.log(ok)
}
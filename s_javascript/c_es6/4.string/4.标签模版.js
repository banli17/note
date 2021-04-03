function tag(stringArr, ...value) {
    console.log(stringArr, value)
}

let a = 19
tag`hello ${a} {{c}}world ${a}`

// let b = '\\unicode'
// let a = `bad escape sequence: ${b}`
// console.log(a)
String.raw`hello\n "world`


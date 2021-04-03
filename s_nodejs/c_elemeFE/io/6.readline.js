const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('please input a word:', (answer) => {
    console.log('you have enter [%s]', answer.toUpperCase())
    rl.close()
})
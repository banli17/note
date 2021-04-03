const fs = require('fs')
const path = require('path')
const readline = require('readline')

function log(data) {
    // const readStream = fs.createReadStream(data)

    const writeFilePath = path.join(__dirname, '../', '../', 'logs/access.log')
    const writeStream = fs.createWriteStream(writeFilePath, {
        flags: 'a'
    })
    writeStream.write(data + '\n')
}

function getChromeRate() {
    let chromeNum = 0
    let num = 0
    const logPath = path.join(__dirname, '../', '../', 'logs/access.log')
    const readStream = fs.createReadStream(logPath)
    const rl = readline.createInterface({
        input: readStream
    })
    rl.on('line', (input) => {
        console.log(input.includes('Chrome'))
        if(input.includes('favicon.ico')){
            return
        }
        if (input.includes('Chrome')) {
            chromeNum++
        }
        num++
    })
    rl.on('close', ()=>{
        console.log(chromeNum / num)
    })
}

getChromeRate()

module.exports = {log}
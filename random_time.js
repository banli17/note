const fs = require('fs')
const path = require('path')
const blUtil = require('bl-util')

// 将posts里的文章时间全部随机成15年 - 19年
function randomDate() {
    let now = Date.now()
    let rtime = parseInt(Math.random() * 60 * 60 * 24 * 360 * 3 * 1000)
    let date = new Date(now - rtime)
    return blUtil.datejs(date).ymdhis
}

function modifyFileDate(file, content) {
    content = content.replace(/^(date:)(.+)$/m, '$1 ' + randomDate())
    fs.writeFileSync(file, content)
}

// 给空文件添加头
function addEmptyHeader(file, content) {
    if (!content.includes(`---`) || !content) {
        console.log('不包含')
        content = `---
        title: 无名
        ---
        ` + content
        fs.writeFileSync(file, content)
    }
}

function recursionRead(dir, processCallback) {
    let ls = fs.readdirSync(dir)
    ls.forEach(l => {
        let file = path.join(dir, l)
        try {
            let stat = fs.statSync(file)
            if (stat.isDirectory()) {
                recursionRead(file, processCallback)
            } else {
                let extname = path.extname(l)
                if (extname === '.md') {
                    let content = fs.readFileSync(file, 'utf8')
                    processCallback(file, content)
                }
            }
        } catch (e) {
            console.log(e)
        }
    })
}
recursionRead('./source/_posts', processCallback)

function processCallback(...args) {
    modifyFileDate(...args)
    addEmptyHeader(...args)
}

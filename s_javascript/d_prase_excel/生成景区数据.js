const parseXlsx = require('excel').default
const json = {}
const sData = require('./data')
const fs = require('fs')

// 给 data.js 增加 scenic_ids 字段，数据从 xlsx 里面读取
parseXlsx('开放景区.xlsx').then((data) => {
    data.map(d => {
        const key = d[2]
        if (key) {
            if (!json[key]) {
                json[key] = []
            }
            if (d[1] && /^\d+$/.test(d[1])) {
                json[key].push(d[1])
            }
        }
    })
    for (let i in json) {
        json[i] = json[i].join(',')
    }

    sData.citys.map(city => {
        city.childs.map(child => {
            child.scenic_ids = json[child.title]
        })
    })

    fs.writeFileSync('./newData.js', `export default `+JSON.stringify(sData, null, 4))
});

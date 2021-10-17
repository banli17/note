const Application = require('./application')

const app = new Application()

const statInfo = {
    io: 15,
    memory: 110,
}

app.getAlert().check(statInfo)
const http = require('http')
const serverHandle = require('../app')
const PORT = 5000


const server = http.createServer(serverHandle)

server.listen(PORT, ()=>{
    console.log(`listening on http://localhost:${PORT}`)
})
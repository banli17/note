const fs = require('fs')

fs.realpath('./b', (err) => {
  console.log(err)
})

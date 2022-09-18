const { spawn } = require("child_process");
const path = require("path");
const stream = require('stream');

// use a Writable stream
var customStream = new stream.Writable();
customStream._write = function (data) {
    console.log(data.toString());
};
//'--loglevel',  'verbose'
const npminstall = () => {
  const a = spawn("npm.cmd", ["i", '-ddd' ], {
    stdio: ['pipe','pipe','pipe'],//[null, 'pipe', 'inherit'],//"inherit",
    cwd: path.resolve(__dirname),
  });
  process.on('message', ()=>{
    console.log('message')
  })
  a.stdout.pipe(customStream)
  a.on('error', (err)=>{
    console.log('error', err)
  })
  a.on("data", (data) => {
    console.log("data", data);
  });
  a.on('exit', (data)=>{
    console.log('exit', data);
  })
  process.on('data', ()=>{
    console.log('gg');
  })
};

npminstall();

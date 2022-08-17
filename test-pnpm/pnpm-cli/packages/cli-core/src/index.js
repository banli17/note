const log = require("cli-log");
const pkg = require('../package.json')

function core() {
  try{
    await prepare()
  }catch(e){
    log.error('core', e)
  }
}

function prepare(){
    checkCliVersion()
}

function checkCliVersion(){
    log.info('cli', pkg.version)
}

function checkNodeVersion(){

}

function checkRoot(){
}

function checkUserHome(){

}



module.exports = core;

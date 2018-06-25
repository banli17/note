const openQQ = ()=>{
    console.log('打开qq')
}

const openChrome = ()=>{
    console.log('打开谷歌浏览器')
}

const openPS = ()=>{
    console.log('打开PS')
}

const command = {
    tasks: [],
    add(command){
        this.tasks.push( command );
    },
    execute(){
        this.tasks.forEach((command)=>{
            command()
        })
    }
}
command.add(openQQ)
command.add(openChrome)
command.add(openPS)

command.execute()

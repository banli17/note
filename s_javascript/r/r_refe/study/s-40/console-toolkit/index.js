const stdin = process.stdin
const stdout = process.stdout

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();
stdin.setEncoding('utf8')

function getChar() {
    return new Promise(resolve => {
        stdin.once('data', function (key) {
            resolve(key)
        })
    })
}

function up(n = 1) {
    stdout.write('\033[' + n + 'A')
}

function right(n = 1) {
    stdout.write('\033[' + n + 'C')
}

function down(n = 1) {
    stdout.write('\033[' + n + 'B')
}

function left(n = 1) {
    stdout.write('\033[' + n + 'D')
}

void async function () {
    let selected = 0
    let selects = ['vue', 'react', 'angular']
    for (let i = 0; i < selects.length; i++) {
        let s = selects[i]
        if (selected === i) {
            stdout.write(`[*] ${s}\n`)
        } else {
            stdout.write(`[ ] ${s}\n`)
        }
    }
    up(selects.length)
    right()
    while (true) {
        let char = await getChar()
        // console.log(char)
        if (char === '\u0003') {
            // https://github.com/cmderdev/cmder/issues/1425
            // https://www.cnblogs.com/leona-d/articles/11469607.html
            //stdout.write("\x1B[32m 关闭控制台 \x1B[39m\n")
            process.exit()
            break
        }
        if (char === 'w' && selected > 0) {
            stdout.write(' ')
            left()
            selected--
            up()
            stdout.write('*')
            left()
        }
        if (char === 's' && selected < selects.length - 1) {
            stdout.write(' ')
            left()
            selected++
            down()
            stdout.write('*')
            left()
        }
        if (char === '\r') {
            down(selects.length - selected)
            left()
            stdout.write('answer is ' + selects[selected] + '\n')
            process.exit()
            return
        }
        //console.log(char.split('').map(c => c.charCodeAt(0)))
    }
}()



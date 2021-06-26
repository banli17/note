#!/usr/bin/env node

const { chalk, semver } = require('@v/cli-shared-utils')
const requiredVersion = require('../package.json').engines.node
const leven = require('leven')

function checkNodeVersion(wanted, id) {
    if (!semver.satisfies(process.version, wanted, {
        includePrerelease: true
    })) {
        console.log(chalk.red(
            `You are using Node ${process.version}, but this version of ${id} requires Node ${wanted} .\nPlease upgrade your Node version.`
        ))
        process.exit(1)
    }
}

checkNodeVersion(requiredVersion, '@v/cli')

const fs = require('fs')
const path = require('path')
const slash = require('slash/index')
const minimist = require('minimist')

// enter debug mode when creating test repo
if (
    slash(process.cwd()).indexOf('/packages/test') > 0 && (
        fs.existsSync(path.resolve(process.cwd(), '../@v')) ||
        fs.existsSync(path.resolve(process.cwd(), '../../@v'))
    )
) {
    process.env.VUE_CLI_DEBUG = true
}

// console.log('slash 1', slash('\\\\hello')) // '//hello'
// console.log('slash 2', slash('我hello\\world'))  // '我hello\world'

const program = require('commander')
const loadCommand = require('../lib/util/loadCommand')

// v --version
program.version(`@v/cli ${require('../package').version}`)
    // 给 v 命令添加使用方法，在命令行敲 v 回车提示
    .usage('<command> [options]')

program
    .command('create <app-name>')
    .description('create a new project powered by v-cli-service')
    // 使用预设的配置
    .option('-p', '--preset <presetName>', 'Skip prompt and use saved or remote preset')
    // 使用默认的预设
    .option('-d, --default', 'Skit prompts and use default preset')
    // 使用行内 json 预设
    .option('-i, --inlinePreset <json>', 'Skip prompts and use inline JSON string as preset')
    // 安装依赖时，使用此 npm registry 地址，只针对 npm
    .option('-r, --registry <url>', 'Use specified npm registry when installing dependencies (only for npm)')
    // 强制使用初始化信息对 git 初始化
    .option('-g, --git [message]', 'Force git initialization with initial commit message')
    // 跳过 git 初始化
    .option('-n, --no-git', 'Skip git initialization')
    // 如果目录存在，会强制覆盖
    .option('-f, --force', 'Overwrite target directory if it exists')
    // 如果目录存在，会合并目录
    .option('--merge', 'Merge target directory if it exists')
    // 当使用远程预设时，用 git clone 拉取
    .option('-c, --clone', 'Use git clone when fetching remote preset')
    // 创建项目时使用代理
    .option('-x, --proxy <proxyUrl>', 'Use specified proxy when creating project')
    // bare 光秃秃的，无初学者指导的脚手架工程
    .option('-b, --bare', 'Scaffold project without beginner instructions')
    // 跳过 Get started 介绍
    .option('--skipGetStarted', 'Skip displaying "Get started" instructions')
    .action((name, options) => {
        // console.log('process.argv', process.argv)
        // console.log('process.argv.slice(3)', process.argv.slice(3));
        // console.log('minimist', minimist(process.argv.slice(3)));
        // 1. vue create x y 提示只有第一个参数会当作 app 名称，后面的将忽略
        if (minimist(process.argv.slice(3))._.length > 1) {
            console.log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the app\'s name, this rest are ignored'))
        }

        // 2. 如果带 -g 或 --git，就设 forceGit 为 true 
        if (process.argv.includes('-g') || process.argv.includes('--git')) {
            options.forceGit = true
        }

        // 3. 真正解析 vue create 命令
        require('../lib/create')(name, options)
    })

program
    .command('add <plugin> [pluginOptions]')
    .description('install a plugin and invoke its generator in an already created project')
    .option('--registry <url>', 'Use specified npm registry when installing dependencies (only for npm)')
    .allowUnknownOption()
    .action((plugin) => {
        require('../lib/add')(plugin, minimist(process.argv.slice(3)))
    })

program
    .command('invoke <plugin> [pluginOptions]')
    .description('invoke the generator of a plugin in an already created project')
    .option('--registry <url>', 'Use specified npm registry when installing dependencies (only for npm)')
    .allowUnknownOption()
    .action((plugin) => {
        require('../lib/invoke')(plugin, minimist(process.argv.slice(3)))
    })

program
    .command('inspect [paths...]')
    .description('inspect the webpack config in a project with vue-cli-service')
    .option('--mode <mode>')
    .option('--rule <ruleName>', 'inspect a specific module rule')
    .option('--plugin <pluginName>', 'inspect a specific plugin')
    .option('--rules', 'list all module rule names')
    .option('--plugins', 'list all plugin names')
    .option('-v --verbose', 'Show full function definitions in output')
    .action((paths, options) => {
        require('../lib/inspect')(paths, options)
    })

program
    .command('serve')
    .description('alias of "npm run serve" in the current project')
    .allowUnknownOption()
    .action(() => {
        require('../lib/util/runNpmScript')('serve', process.argv.slice(3))
    })

program
    .command('build')
    .description('alias of "npm run serve" in the current project')
    .action((cmd) => {
        require('../lib/util/runNpmScript')('build', process.argv.slice(3))
    })

program
    .command('ui')
    .description('start and open the vue-cli ui')
    .option('-H, --host <host>', 'Host used for the UI server (default: localhost)')
    .option('-p, --port <port>', 'Port used for the UI server (by default search for available port)')
    .option('-D, --dev', 'Run in dev mode')
    .option('--quiet', `Don't output starting messages`)
    .option('--headless', `Don't open browser on start and output port`)
    .action((options) => {
        checkNodeVersion('>=8.6', 'vue ui')
        require('../lib/ui')(options)
    })

program
    .command('init <template> <app-name>')
    .description('generate a project from a remote template (legacy API, requires @vue/cli-init)')
    .option('-c, --clone', 'Use git clone when fetching remote template')
    .option('--offline', 'Use cached template')
    .action(() => {
        loadCommand('init', '@vue/cli-init')
    })

program
    .command('config [value]')
    .description('inspect and modify the config')
    .option('-g, --get <path>', 'get value from option')
    .option('-s, --set <path> <value>', 'set option value')
    .option('-d, --delete <path>', 'delete option from config')
    .option('-e, --edit', 'open config with default editor')
    .option('--json', 'outputs JSON result only')
    .action((value, options) => {
        require('../lib/config')(value, options)
    })

program
    .command('outdated')
    .description('(experimental) check for outdated vue cli service / plugins')
    .option('--next', 'Also check for alpha / beta / rc versions when upgrading')
    .action((options) => {
        require('../lib/outdated')(options)
    })

program
    .command('upgrade [plugin-name]')
    .description('(experimental) upgrade vue cli service / plugins')
    .option('-t, --to <version>', 'Upgrade <package-name> to a version that is not latest')
    .option('-f, --from <version>', 'Skip probing installed plugin, assuming it is upgraded from the designated version')
    .option('-r, --registry <url>', 'Use specified npm registry when installing dependencies')
    .option('--all', 'Upgrade all plugins')
    .option('--next', 'Also check for alpha / beta / rc versions when upgrading')
    .action((packageName, options) => {
        require('../lib/upgrade')(packageName, options)
    })

program
    .command('migrate [plugin-name]')
    .description('(experimental) run migrator for an already-installed cli plugin')
    .requiredOption('-f, --from <version>', 'The base version for the migrator to migrate from')
    .action((packageName, options) => {
        require('../lib/migrate')(packageName, options)
    })

program
    .command('info')
    .description('print debugging information about your environment')
    .action((cmd) => {
        console.log(chalk.bold('\nEnvironment Info:'))
        require('envinfo').run(
            {
                System: ['OS', 'CPU'],
                Binaries: ['Node', 'Yarn', 'npm'],
                Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
                npmPackages: '/**/{typescript,*vue*,@vue/*/}',
                npmGlobalPackages: ['@vue/cli']
            },
            {
                showNotFound: true,
                duplicates: true,
                fullTree: true
            }
        ).then(console.log)
    })

program.on('command:*', ([cmd]) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
    suggestCommands(cmd)
    process.exitCode = 1
})

program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.cyan(`vue <command> --help`)} for detailed usage of given command.`)
    console.log()
})

// 增强错误信息
const enhanceErrorMessage = require('../lib/util/enhanceErrorMessage')

enhanceErrorMessage('missingArgument', argName => {
    return `Missing required arugment ${chalk.yellow(`<${argName}>`)}`
})

enhanceErrorMessage('unknownOption', optionName => {
    return `Unknown option ${chalk.yellow(optionName)}`
})

enhanceErrorMessage('optionMissingArgument', (option, flag) => {
    return `Missing required argument for option ${chalk.yellow(option.flags)}` + (
        flag ? `, got ${chalk.yellow(flag)}` : ``
    )
})

program.commands.forEach(c => c.on('--help', () => console.log()))

function suggestCommands(unknownCommand) {
    // 可执行的命令列表
    const availableCommands = program.commands.map(cmd => cmd._name)

    // 给出建议可能的命令
    let suggestion

    availableCommands.forEach(cmd => {
        const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
        if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
            suggestion = cmd
        }
    })

    if (suggestion) {
        console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
    }
}

program.parse(process.argv)  // 启动

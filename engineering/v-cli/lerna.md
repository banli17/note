# lerna

用于管理具有多个包的 JavaScript 项目的工具。

包项目的管理

- 多个包，每个包一个 git 仓库，不好管理、更改麻烦、测试复杂
- 多个包，共享一个 git 仓库 monorepos

优点

- Lerna 是一个工具，可以优化围绕使用 git 和 npm 管理多包存储库的工作流程。
- Lerna 还可以减少开发和构建环境中大量包副本的时间和空间需求——通常是将项目分成许多单独的 NPM 包的缺点。

命令

- lerna init

两种模式

- 固定/锁定模式(默认)：这种模式下只有一条根目录下 lerna.json version 字段控制的版本线。当运行 lerna publish 时，如果模块在上次发布后更改了，它会更新到一个新版本，这样意味着你只需要发布一个包的新版本。
  如果 major 版本为 0，运行 lerna publish 并选择非预发行版本时会导致所有包都升到新版本，即使有些包上次发布后没有更新。
  这是 babel 目前的模式，这种方式的问题是任何包的 major 修改都会导致所有包有一个 major 版本更新。
- 独立模式 lerna init --independent
  可以独立的增加包版本，每次 publish dough 收到已更改包的提示，以指定版本。
  将 lerna.json 的 version 设为 independent 就会以独立模式运行。

  https://semver.org/#spec-item-4

```
# $_ 为上一个命令的最后一个参数，如果没有参数就是上一个命令。
mkdir my-new-project && cd $_
ls && $_
```

```
Commands:
  lerna add <pkg> [globs..]  Add a single dependency to matched packages
  lerna bootstrap            Link local packages together and install remaining package dependencies
  lerna changed              List local packages that have changed since the last tagged release
                                                                                   [aliases: updated]
  lerna clean                Remove the node_modules directory from all packages
  lerna create <name> [loc]  Create a new lerna-managed package
  lerna diff [pkgName]       Diff all packages or a single package since the last release
  lerna exec [cmd] [args..]  Execute an arbitrary command in each package
  lerna import <dir>         Import a package into the monorepo with commit history
  lerna info                 Prints debugging information about the local environment
  lerna init                 Create a new Lerna repo or upgrade an existing repo to the current
                             version of Lerna.
  lerna link                 Symlink together all packages that are dependencies of each other
  lerna list                 List local packages                                [aliases: ls, la, ll]
  lerna publish [bump]       Publish packages in the current project.
  lerna run <script>         Run an npm script in each package that contains that script
  lerna version [bump]       Bump version of packages changed since the last release.

Global Options:
      --loglevel       What level of logs to report.                         [string] [default: info]
      --concurrency    How many processes to use when lerna parallelizes tasks. [number] [default: 8]
      --reject-cycles  Fail if a cycle is detected among dependencies.                      [boolean]
      --no-progress    Disable progress bars. (Always off in CI)                            [boolean]
      --no-sort        Do not sort packages topologically (dependencies before dependents). [boolean]
      --max-buffer     Set max-buffer (in bytes) for subcommand execution                    [number]
  -h, --help           Show help                                                            [boolean]
  -v, --version        Show version number                                                  [boolean]
```

- `lerna create pkg [loc]`
  这里的 loc 必须先在 lerna.json 的 packages 字段定义有这个前缀才行。

```
lerna create cli-ui packages/@v
```

## yarn workspace

yarn 命令会将 workspace 里的包在 node_modules 目录里创建软链接，名称是根据 package.json 里的 name 来的，这样 packages 里的包就可以直接 require 引用。

```
// 这里的 @v/cli-shared-utils 是包的 package.json 里的 name
require('@v/cli-shared-utils')
```

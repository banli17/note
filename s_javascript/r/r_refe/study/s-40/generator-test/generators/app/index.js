var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }

    // installLodash() {
    //     // 安装依赖，或者直接创建 package.json ，然后 this.npmInstall
    //     this.npmInstall(['lodash'], {'save-dev': true})
    // }

    // writing() {
    //     const pkgJson = {
    //         devDependencies: {
    //             eslint: '^3.15.0'
    //         },
    //         dependencies: {
    //             react: '^16.2.0'
    //         }
    //     };
    //
    //     // Extend or create package.json file in destination path
    //     this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    // }
    //
    // install() {
    //     this.npmInstall();
    // }

    // async prompting() {
    //     const answers = await this.prompt([
    //         {
    //             type: "input",  // 输入类型 input
    //             name: "name",
    //             message: "Your project name",
    //             default: this.appname // Default to current folder name
    //         },
    //         {
    //             type: "confirm", // 确认类型 true false  y/n
    //             name: "cool",
    //             message: "使用哪个模版引擎?",
    //         }
    //     ]);
    //
    //     this.log("app name", answers.name);
    //     this.log("cool feature", answers.cool);
    // }
    writing() {
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('public/index.html'),
            { title: 'Templating with Yeoman' }
        );
    }
    method1() {
        this.log('你好 方法1');
    }

    method2() {
        this.log('method 2 just ran');
    }
};

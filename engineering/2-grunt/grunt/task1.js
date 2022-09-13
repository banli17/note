module.exports = (grunt) => {
  grunt.initConfig({
    foo: {
      name: "zhangsan",
      age: 12,
    },
    build: {
      options: {
        msg: "task options",
      },
      foo: {
        options: {
          msg: "foo target options",
        },
      },
      bar: "456",
    },
    clean: {
      cssdir: "css/**", // clean 会将指定的所有文件夹删除
    },
  });

  grunt.registerTask("foo", function () {
    console.log(this);
    console.log(grunt.config("foo")); // { name: 'zhangsan', age: 12 }
    console.log(grunt.config("foo.age")); // 12
    console.log("foo task");
  });

  grunt.registerTask("bad", () => {
    console.log("bad!!!");
    return false;
  });

  grunt.registerTask("bar", () => {
    console.log("bar");
  });

  grunt.registerTask("default", "默认任务", ["foo", "bad", "bar"], () => {
    console.log("default task");
  });

  // 多目标模式
  grunt.registerMultiTask("build", function () {
    // 通过 this.data.options 获取子任务的 options
    console.log(`task: build, target: ${this.target}, data: ${this.data}`);
    console.log(this.options()); // 获取 build 公共的配置 {msg: "task options"}
  });
  // Running "build:foo" (build) task
  // task: build, target: foo, data: [object Object]
  // { msg: 'foo target options' }

  // Running "build:bar" (build) task
  // task: build, target: bar, data: 456
  // { msg: 'task options' }

  grunt.loadNpmTasks("grunt-contrib-clean");
};

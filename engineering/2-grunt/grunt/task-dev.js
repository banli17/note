const sass = require("sass");
const loadGruntTasks = require("load-grunt-tasks");

module.exports = (grunt) => {
  grunt.initConfig({
    // grunt-babel @babel/core @babel/preset-env
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"],
      },
      main: {
        files: {
          // 键是目标，值是原文件
          "dist/js/app.js": "src/js/app.js",
        },
      },
    },
    // grunt-contrib-sass
    sass: {
      options: {
        sourceMap: true,
        implementation: sass, // 需要加
      },
      main: {
        files: {
          "dist/css/index.css": "src/scss/index.scss",
        },
      },
    },
    // grunt-contrib-watch
    watch: {
      options: {
        livereload: {
          host: "localhost",
          port: 9000,
        },
      },
      js: {
        files: ["src/js/*.js"],
        tasks: ["babel"],
      },
      css: {
        files: ["src/scss/*.scss"],
        tasks: ["sass"],
      },
    },
  });

  loadGruntTasks(grunt);

  grunt.registerTask("default", "", ["babel", "sass", "watch"], () => {
    console.log("default task running...");
  });
};

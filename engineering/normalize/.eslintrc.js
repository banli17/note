module.exports = {
  root: true,
  env: {
    // 成员是否可用
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  overrides: [],
  parserOptions: {
    // 用于检测语法
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // off warn error
    // "no-alert": "error",
    // "react/jsx-uses-react": 2, //设置插件里的项
  },
  globals: {
    jQuery: "readonly",
  },
  // plugins: ["react"],
};

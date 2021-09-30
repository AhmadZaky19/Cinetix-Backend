module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourcerType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-unused-expressions": "off", // memperbolehkan ternary operator
    "consistent-return": "off", // memperbolehkan suatu fungsi tidak mengembalikan return
    "prefer-destructuring": ["error", { object: true, array: false }], // memperbolehkan array tidak destructuring
    "no-else-return": "off", // memperbolehkan penggunaan else didalam kondisi
    "no-param-reassign": ["error", { props: false }], // memperbolehkan suatu object untuk dimanipulasi
  },
};

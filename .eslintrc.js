module.exports = {
  extends: ['airbnb', '@mate-academy/eslint-config'],
  env: {
    commonjs: true,
    node: true,
    es6: true,
    browser: true
  },
  parserOptions: {
    sourceType: "module",
    "ecmaVersion": 2017,
  },
  "globals": {
    it: false
  },
  parser: "babel-eslint",
  rules: {
    
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'no-console': 'off',
    "no-param-reassign": 0
  }
};

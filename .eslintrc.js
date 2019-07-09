module.exports = {
  extends: ['airbnb', '@mate-academy/eslint-config'],
  env: {
    commonjs: true,
    node: true,
    es6: true,
    browser: true
  },
  parserOptions: {
    sourceType: "module"
  },
  "globals": {
    it: false
  },
  rules: {
    "max-len":[2, 120],
    "react/destructuring-assignment": ['never'],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'no-console': 'off',
    "no-param-reassign": 0
  }
};

module.exports = {
  extends: "@mate-academy/eslint-config-react-typescript",
  rules: {
    "@typescript-eslint/interface-name-prefix": [
      "error",
      {
        "prefixWithI": "always"
      }
    ],
    "no-restricted-syntax": [
      "error",
      "BinaryExpression[operator='in']",
    ],
    "guard-for-in": 0,
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": ["error", {
      "allowShortCircuit": true,
      "allowTernary": true,
    }],
    "arrow-body-style": 0,
    "object-curly-newline": [2, {
      "ObjectExpression": {
        "consistent": true,
        "minProperties": 5,
      },
    }],
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "hrefLeft", "hrefRight" ],
      "aspects": [ "preferButton" ]
    }],
  }
};

module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended"
  ],
  overrides: [
    {
      files: [ "*.ts", "*.tsx" ],
      plugins: [
        "@typescript-eslint"
      ],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ]
    }
  ],
  ignorePatterns: [
    "dist",
    "static"
  ],
  rules: {
    camelcase: "error",
    curly: "error",
    "default-case": "error",
    eqeqeq: "error",
    indent: [
      "error",
      2,
      {
        SwitchCase: 1
      }
    ],
    "no-trailing-spaces": "error",
    "no-var": "error",
    quotes: [
      "error",
      "double"
    ],
    semi: [
      "error",
      "never"
    ]
  }
}

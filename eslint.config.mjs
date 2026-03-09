import manufacEslintConfig from "@manufac/eslint-config/react";

export default [
  ...manufacEslintConfig,
  {
    ignores: ["*.config.js"],
  },
  {
    rules: {
      "single-return/single-return": "off",
    },
  },
];

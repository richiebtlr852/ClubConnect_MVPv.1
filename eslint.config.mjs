// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import manufacEslintConfig from "@manufac/eslint-config/react";
import { configs } from "eslint-plugin-storybook";

export default [
  ...manufacEslintConfig,
  {
    ignores: ["*.config.js", ".storybook/**/*"],
  },
  ...configs["flat/recommended"],
];

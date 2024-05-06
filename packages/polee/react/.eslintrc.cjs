/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@mash-ui/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
};

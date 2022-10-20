// eslint-disable-next-line no-undef
module.exports = {
  plugins: ["react", "react-hooks", "prettier"],
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        indent: ["error", 4],
        'linebreak-style': ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        'prettier/prettier': "error",
    },
};

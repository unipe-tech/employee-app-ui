const { STAGE } = process.env;

const inProduction = STAGE === "prod";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      "react-native-reanimated/plugin",
    ],
    env: {
      production: {
        plugins: ["transform-remove-console", { exclude: ["error", "warn"] }],
      },
    },
  };
};

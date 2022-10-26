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
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            'Components': './components',
            'Screens': './screens',
            'Assets': './assets',
            'Constants': './constants',
            'Helpers': './helpers',
            'Navigators': './navigators',
            'Services': './services',
            'Store': './store',
            'Templates': './templates',
          },
        },
      ],
    ],
  };
};

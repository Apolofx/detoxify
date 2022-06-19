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
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      ["react-native-reanimated/plugin"],
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@components": "./src/components",
            "@config": "./src/config",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
            "@hooks": "./src/utils/hooks",
          },
        },
      ],
    ],
  };
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
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

import { extendTheme } from "native-base";

export const NativeBaseConfig = {
  dependencies: {
    // For Expo projects (Bare or managed workflow)
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
    // For non expo projects
    // 'linear-gradient': require('react-native-linear-gradient').default,
  },
  theme: extendTheme({
    config: {
      initialColorMode: "dark",
    },
  }),
};

import React from "react";
import { View, Text } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { VStack, Box, Divider } from "native-base";
type TeamProps = DrawerScreenProps<RootParamList, "Team">;

export default function Team({ navigation, route }: TeamProps) {
  return (
    <VStack
      space={4}
      justifyContent="flex-start"
      alignItems="center"
      flex={1}
      bg={{
        linearGradient: {
          colors: ["#B721FF", "#21D4FD"],
          start: [0, 0.5, 1],
          end: [1, 0.5, 0],
        },
      }}
    >
      <Box m="2" borderWidth={1} borderRadius="xl">
        <VStack space="4" divider={<Divider />}>
          <Box px="4" pt="4">
            NativeBase
          </Box>
          <Box px="4">
            NativeBase is a free and open source framework that enable
            developers to build high-quality mobile apps using React Native iOS
            and Android apps with a fusion of ES6.
          </Box>
          <Box px="4" pb="4">
            GeekyAnts
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
}

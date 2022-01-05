import React from "react";
import { View, Text } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";

type StatisticsProps = DrawerScreenProps<RootParamList, "Statistics">;
export default function Statistics({ navigation, route }: StatisticsProps) {
  return (
    <View>
      <Text>Stats</Text>
    </View>
  );
}

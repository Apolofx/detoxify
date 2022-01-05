import React from "react";
import { View, Text } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";

type SupportProps = DrawerScreenProps<RootParamList, "Support">;
export default function Support({ navigation, route }: SupportProps) {
  return (
    <View>
      <Text>Support</Text>
    </View>
  );
}

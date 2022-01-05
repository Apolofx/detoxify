import React from "react";
import { View, Text } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";

type SettingsProps = DrawerScreenProps<RootParamList, "Settings">;
export default function Settings({ navigation, route }: SettingsProps) {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
}

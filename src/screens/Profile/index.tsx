import React from "react";
import { View, Text } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";

type ProfileProps = DrawerScreenProps<RootParamList, "Profile">;
export default function Profile({ navigation, route }: ProfileProps) {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}

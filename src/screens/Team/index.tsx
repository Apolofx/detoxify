import React from "react";
import { View, Text } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";

type TeamProps = DrawerScreenProps<RootParamList, "Team">;
export default function Team({ navigation, route }: TeamProps) {
  return (
    <View>
      <Text>Team</Text>
    </View>
  );
}

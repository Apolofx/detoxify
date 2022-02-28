import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Timer } from "@components";
import { SafeAreaView } from "react-native-safe-area-context";

type HomeProps = DrawerScreenProps<RootParamList, "Home">;

export default function Home({ navigation }: HomeProps) {
  const fetchUser = async () => {
    try {
      const user = await fetch("http://192.168.1.21:8080/users/1").then((res) =>
        res.json()
      );
      console.log(JSON.stringify(user));
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  React.useEffect(() => {
    fetchUser();
  });
  return (
    <>
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Home Screen</Text>
        <Timer />
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Team")}>
          <Text>Team</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Statistics")}>
          <Text>Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Text>Settings</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

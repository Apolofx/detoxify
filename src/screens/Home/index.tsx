import { TouchableOpacity, Text, View } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Timer } from "@components";

type HomeProps = DrawerScreenProps<RootParamList, "Home">;

export default function Home({ navigation }: HomeProps) {
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
      </View>
    </>
  );
}

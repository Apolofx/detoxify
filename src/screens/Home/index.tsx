import React from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SCREENS } from "@config";
// import { Profile, Statistics, Team } from "../index";
import Profile from "./Profile/index";
import Statistics from "./Statistics/index";
import Team from "./Team/index";
import { Ionicons } from "@expo/vector-icons";

type HomeProps = DrawerScreenProps<RootParamList, "Home">;

const Tab = createBottomTabNavigator();

export default function Home({ navigation, route }: HomeProps) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "purple",
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
      }}
      initialRouteName="Perfil"
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
        name="Perfil"
        component={Profile}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name="stats-chart" color={color} size={size} />
          ),
        }}
        name="Estadísticas"
        component={Statistics}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
        name="Equipo"
        component={Team}
      />
    </Tab.Navigator>
  );
}

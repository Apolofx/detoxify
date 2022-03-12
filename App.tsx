// In App.js in a new project

//Navigators
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//UI Provider
import { NativeBaseProvider } from "native-base";
import { NativeBaseConfig } from "@config";
//Screens
import { SCREENS } from "@config";
import {
  Home,
  Auth,
  Profile,
  Settings,
  Statistics,
  Support,
  Team,
} from "@screens";

//Helpers
import { useAuthentication } from "@hooks";

import { IconButton } from "@components";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function App() {
  const authentication = useAuthentication();
  const { isAuthenticated, isLoading } = authentication;
  return (
    <NativeBaseProvider config={NativeBaseConfig}>
      {!isAuthenticated ? (
        <Auth authentication={authentication} />
      ) : (
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerRight: () => (
                <IconButton
                  type="log-out-outline"
                  onPress={() => authentication.signOut()}
                  touchableProps={{ style: { marginRight: 16 } }}
                />
              ),
            }}
          >
            <Drawer.Screen name={SCREENS.HOME} component={Home} />
            <Drawer.Screen name={SCREENS.PROFILE} component={Profile} />
            <Drawer.Screen name={SCREENS.STATS} component={Statistics} />
            <Drawer.Screen name={SCREENS.TEAM} component={Team} />
            <Drawer.Screen name={SCREENS.SETTINGS} component={Settings} />
            <Drawer.Screen name={SCREENS.SUPPORT} component={Support} />
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </NativeBaseProvider>
  );
}

export default App;

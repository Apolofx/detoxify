// In App.js in a new project

//Navigators
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { registerForPushNotificationsAsync } from "@utils";
//UI Provider
import { NativeBaseProvider } from "native-base";
import { NativeBaseConfig } from "@config";
//Screens
import { SCREENS } from "@config";
import { Home, Auth, Settings, Support } from "@screens";

//Helpers
import { useAuthentication } from "@hooks";

import { IconButton } from "@components";

const Drawer = createDrawerNavigator();

registerForPushNotificationsAsync()
function App() {
  const authentication = useAuthentication();
  const { isAuthenticated } = authentication;
  return (
    <NativeBaseProvider config={NativeBaseConfig}>
      {!isAuthenticated ? (
        <Auth authentication={authentication} />
      ) : (
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName={SCREENS.HOME}
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
            <Drawer.Screen name={SCREENS.SETTINGS} component={Settings} />
            <Drawer.Screen name={SCREENS.SUPPORT} component={Support} />
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </NativeBaseProvider>
  );
}

export default App;

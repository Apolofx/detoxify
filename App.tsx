// In App.js in a new project

//Navigators
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import { SCREENS } from "@config";
import {
  Home,
  Login,
  Profile,
  Settings,
  Statistics,
  Support,
  Team,
} from "@screens";

//Helpers
import { useAuthentication } from "@hooks";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function App() {
  const { error, isLoading, token, isAuthenticated } = useAuthentication();
  
  if(!isAuthenticated) return <Login /> //Aca puedo retornar un stack navigator con el login y signup 
  return (
    <NavigationContainer>
      {/* if authenticated initial route is home else login */}
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name={SCREENS.HOME} component={Home} />
        <Drawer.Screen name={SCREENS.PROFILE} component={Profile} />
        <Drawer.Screen name={SCREENS.STATS} component={Statistics} />
        <Drawer.Screen name={SCREENS.TEAM} component={Team} />
        <Drawer.Screen name={SCREENS.SETTINGS} component={Settings} />
        <Drawer.Screen name={SCREENS.SUPPORT} component={Support} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

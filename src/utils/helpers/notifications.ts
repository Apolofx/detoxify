import {
  getPermissionsAsync,
  requestPermissionsAsync,
  getExpoPushTokenAsync,
  setNotificationChannelAsync,
  AndroidImportance,
} from "expo-notifications";
import { isDevice } from "expo-device";
import Platform from "react-native";

export const registerForPushNotificationsAsync = async () => {
  if (isDevice) {
    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const token = (await getExpoPushTokenAsync()).data;
    console.log(token);
    //   this.setState({ expoPushToken: token });
  } else {
    alert("Must use physical device for Push Notifications");
  }
  //@ts-ignore
  if (Platform.OS === "android") {
    setNotificationChannelAsync("default", {
      name: "default",
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

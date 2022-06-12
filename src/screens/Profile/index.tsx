import React from "react";
import { TouchableOpacity } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Timer } from "@components";
import { useAuthentication } from "@hooks";
import { Spinner, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";

type ProfileProps = DrawerScreenProps<RootParamList, "Profile">;
export default function Profile({ navigation, route }: ProfileProps) {
  const { userID, token } = useAuthentication();
  const [userData, setUserData] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchUserData = async () => {
      await fetch(`http://dev.detoxify.ar/api/users/${userID}/snapshot`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData((prev: any) => ({ ...prev, ...data }));
          console.log(data);
        })
        .catch((e) => console.log(e))
        .finally(() => setIsLoading(false));
    };
    if (token !== null && userID !== null) fetchUserData();
  }, [token, userID]);

  return (
    <VStack space={8} justifyContent="center" alignItems="center" flex={1}>
      {isLoading ? (
        <Spinner color="purple" size="lg" />
      ) : (
        <>
          <Timer startDate={new Date(userData?.userDetails?.quitAt)} />
          <TouchableOpacity onPress={() => alert("Panic attack")}>
            <Ionicons name="alert-circle" color="purple" size={50} />
          </TouchableOpacity>
        </>
      )}
    </VStack>
  );
}

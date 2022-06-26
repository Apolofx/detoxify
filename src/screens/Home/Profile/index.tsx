import React from "react";
import { TouchableOpacity } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Timer } from "@components";
import { useAuthentication } from "@hooks";
import { Spinner, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { fetchUserData } from "@utils";
import MaskedView from "@react-native-masked-view/masked-view";

type ProfileProps = DrawerScreenProps<RootParamList, "Profile">;
export default function Profile({ navigation, route }: ProfileProps) {
  const { userID, token } = useAuthentication();
  const [userData, setUserData] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (token !== null && userID !== null)
      fetchUserData(userID, token)
        .then((data) => {
          setUserData((prev: any) => ({ ...prev, ...data }));
          console.log("USER DATA >> ", data);
        })
        .catch((e) => {
          console.log("ERROR FETCHING USER DATA >>> ", JSON.stringify(e));
        })
        .finally(() => setIsLoading(false));
  }, [token, userID]);

  return (
    <VStack
      space={4}
      justifyContent="flex-start"
      alignItems="center"
      flex={1}
      bg={{
        linearGradient: {
          colors: ["#B721FF", "#21D4FD"],
          start: [0, 0.5, 1],
          end: [1, 0.5, 0],
        },
      }}
    >
      {isLoading ? (
        <Spinner color="purple" size="lg" />
      ) : (
        <>
          <Timer startDate={new Date(userData?.userDetails?.quitAt)} />
          <TouchableOpacity onPress={() => alert("Panic attack")}>
            <Ionicons name="alert-circle" color="white" size={50} />
          </TouchableOpacity>
        </>
      )}
    </VStack>
  );
}

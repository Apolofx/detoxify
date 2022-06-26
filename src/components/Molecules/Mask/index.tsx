import { View, Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";


export default (props: { progress: number }) => (
  <View
    style={{
      width: "100%",
      height: 100,
      position: "relative",
      backgroundColor: "transparent",
      opacity: 1,
      borderColor: "black",
      borderWidth: 3,
    }}
  >
    <MaskedView
      style={{
        flex: 1,
        flexDirection: "row",
        height: "100%",
        width: "100%",
        zIndex: 10,
      }}
      maskElement={
        <View
          style={{
            // Transparent background because mask is based off alpha channel.
            backgroundColor: "transparent",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 80,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Basic Mask
          </Text>
        </View>
      }
    >
      {/* Shows behind the mask, you can put anything here, such as an image */}
      <View
        style={{
          flex: props.progress,
          borderColor: "black",
          zIndex: 10,
          // height: "100%",
          // width: 1,
          backgroundColor: "#324376",
        }}
      />
      {/* <View style={{ flex: 1, height: "100%", backgroundColor: "#F5DD90" }} /> */}
      {/* <View style={{ flex: 1, height: "100%", backgroundColor: "#F76C5E" }} /> */}
      {/* <View style={{ flex: 1, height: "100%", backgroundColor: "#e1e1e1" }} /> */}
    </MaskedView>
  </View>
);

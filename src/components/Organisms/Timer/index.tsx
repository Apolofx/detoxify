import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTimer } from "@hooks";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import { BlurView } from "expo-blur";

interface ITimer {
  startDate: Date;
}

export default function Timer({ startDate }: ITimer) {
  const { days, hours, months, minutes, seconds } = useTimer({
    startDate,
  });
  const HumanDate = `${startDate.getDate()}/${
    startDate.getMonth() + 1
  }/${startDate.getFullYear()}`;
  const [fontsLoaded] = useFonts({ Nunito_400Regular });

  const TimeData = () => (
    <>
      <Text style={styles.timerText}>No fumas desde {HumanDate}</Text>
      <Text style={{ ...styles.timerText, fontSize: 20 }}>
        {days} días -{" "}
        {`${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds}`}
        {} horas
      </Text>
    </>
  );

  if (!fontsLoaded) return <AppLoading />;

  return (
    <View
      style={{
        overflow: "hidden",
        borderRadius: 16,
        width: "90%",
        marginHorizontal: 10,
      }}
    >
      <BlurView intensity={15} style={styles.timerContainer} tint={"default"}>
        {/* <View style={styles.timerContainer}> */}
        <TimeData />
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    padding: 16,
    // margin: 16
  },
  timerText: {
    backgroundColor: "transparent",
    textAlign: "right",
    fontFamily: "Nunito_400Regular",
    fontSize: 32,
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTimer } from "@hooks";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";

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
      <Text style={styles.timerText}>{days} días</Text>
      <Text style={styles.timerText}>
        {`${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds}`}
        {} horas
      </Text>
    </>
  );

  if (!fontsLoaded) return <AppLoading />;

  return (
    <View style={styles.timerContainer}>
      <TimeData />
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    elevation: 3,
    borderRadius: 16,
    padding: 16,
    margin: 16,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    shadowColor: "purple",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  timerText: {
    backgroundColor: "transparent",
    textAlign: "right",
    fontFamily: "Nunito_400Regular",
    fontSize: 40,
    textShadowColor: "purple",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 2,
  },
});

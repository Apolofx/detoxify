import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTimer } from "@hooks";
import AppLoading from "expo-app-loading";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";

interface ITimer {
  startDate: Date;
}

export default function Timer() {
  const { days, hours, months, minutes, seconds } = useTimer({
    startDate: new Date(),
  });
  const [fontsLoaded] = useFonts({ Nunito_400Regular });
  if (!fontsLoaded) return <AppLoading />;
  return (
    <View style={styles.timerContainer}>
      {/* <Text style={styles.timerText}>{years} years</Text> */}
      <Text style={styles.timerText}>{months} months</Text>
      <Text style={styles.timerText}>{days} days</Text>
      <Text style={styles.timerText}>
        {`${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds}`}
        {} hours
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    minWidth: "90%",
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

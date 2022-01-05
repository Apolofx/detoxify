import React from "react";
import { View, Text } from "react-native";

interface ITimer {
  startDate: Date;
}

export default function Timer() {
  const mockedDate = new Date();
  const [time, setTime] = React.useState<string>();
  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let diff = (now.getTime() - mockedDate.getTime()) / 1000; //diff in seconds
      const seconds = Math.floor(diff % 60);
      diff = Math.floor(diff / 60)
      const minutes = diff % 60
      diff = Math.floor(diff / 60)
      const hours = diff % 24
      diff = Math.floor(diff / 24)
      const days = diff
      const months = Math.floor(
        (now.getTime() - mockedDate.getTime()) / 2.628e9
      );
      setTime(
        `${hours < 24 ? hours : 0}:${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <View>{time && <Text>{time}</Text>}</View>;
}

import React from "react";
import { View, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IconButton {
  type: "menu";
  onPress: () => void;
  touchableProps?: TouchableOpacityProps;
  size?: number;
  color?: string;
}

export default function IconButton({
  type,
  size = 24,
  color = "black",
  onPress,
  touchableProps,
}: IconButton) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} {...touchableProps}>
        <Ionicons name={type} size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
}

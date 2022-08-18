import React from "react";
import { Button } from "@react-native-material/core";
import { dev } from "../styles";

function DevMenuButton({ onPress, title }) {
  return (
    <Button
      title={title}
      style={dev.title}
      uppercase={false}
      onPress={onPress}
    />
  );
}

export default DevMenuButton;

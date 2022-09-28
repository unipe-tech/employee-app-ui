import React from "react";
import { Button } from "@react-native-material/core";
import { dev } from "../styles";
import TextButton from "./atoms/TextButton";

export default DevMenuButton = ({ onPress, title }) => {
  return (
    <TextButton
      label={title}
      style={dev.title}
      uppercase={false}
      onPress={onPress}
    />
  );
};

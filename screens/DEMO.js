import { View, Text, NativeModules, Button } from "react-native";
import React from "react";

const DEMO = () => {
  const onStartBtnPress = async () => {
    await NativeModules.BackgroundWorkManager.startBackgroundWork();
    console.log("task started");
  };
  const onCancelBtnPress = async () => {
    await NativeModules.BackgroundWorkManager.stopBackgroundWork();
    console.log("task cancelled");
  };
  return (
    <View>
      <Button title="start" onPress={onStartBtnPress} />
      <Button title="cancel" onPress={onCancelBtnPress} />
    </View>
  );
};

export default DEMO;

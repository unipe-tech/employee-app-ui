import { View, Text, NativeModules, Button } from "react-native";
import React from "react";

const DEMO = () => {
  const onStartBtnPress = async () => {
    NativeModules.BackgroundWorkManager.startBackgroundWork();
  };
  const onCancelBtnPress = async () => {
    NativeModules.BackgroundWorkManager.stopBackgroundWork();
  };
  return (
    <View>
      <Button title="start" onPress={onStartBtnPress} />
      <Button title="start" onPress={onCancelBtnPress} />
    </View>
  );
};

export default DEMO;

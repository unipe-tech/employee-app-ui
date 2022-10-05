import React, { useEffect } from "react";

import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import EXAMPLE from "./Example";

const DEMO = () => {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => EXAMPLE.startService()}>
          <Text>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => EXAMPLE.stopService()}>
          <Text>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DEMO;

import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const GeoFencingSuccess = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          color: "#4E46F1",
        }}
      >
        Geo Fencing was done successfully
      </Text>
    </SafeAreaView>
  );
};

export default GeoFencingSuccess;

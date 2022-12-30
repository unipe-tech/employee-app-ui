import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../../constants/Theme";

function LoadingComponent() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.white,
        margin: -25,
      }}
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

function Loading({ isLoading = false, withModal = true }) {
  if (withModal) {
    return (
      <Modal style={styles.cont} transparent visible={isLoading}>
        <LoadingComponent />
      </Modal>
    );
  }
  if (isLoading) {
    return <LoadingComponent />;
  }
  return null;
}

export default Loading;

const styles = StyleSheet.create(() => ({
  cont: {
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
}));

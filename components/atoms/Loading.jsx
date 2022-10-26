import React from "react";
import { ActivityIndicator, StyleSheet,View } from "react-native";
import Modal from "react-native-modal";

const LoadingComponent = ({ loaderColor }) => (
    <View style={styles.cont}>
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color={loaderColor} />
      </View>
    </View>
  )

const Loading = ({
  isLoading = false,
  withModal = true,
  loaderColor = "blue",
}) => {
  if (withModal) {
    return (
      <Modal style={styles.cont} transparent visible={isLoading}>
        <LoadingComponent loaderColor={loaderColor} />
      </Modal>
    );
  }
  if (isLoading) {
    return <LoadingComponent loaderColor={loaderColor} />;
  }
  return null;
}

export default Loading;

const styles = StyleSheet.create(() => ({
  cont: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}));

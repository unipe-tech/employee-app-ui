import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { AntDesign } from "react-native-vector-icons";
import { WebView } from "react-native-webview";

const WebViewModal = (isModalVisible, setIsModalVisible, html) => {
  return (
    <Modal
      isVisible={isModalVisible}
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }}
    >
      <Pressable
        onPress={() => setIsModalVisible(false)}
        style={{
          position: "absolute",
          top: 30,
          right: 50,
          zIndex: 999,
        }}
      >
        <AntDesign name="closesquareo" size={24} color="black" />
      </Pressable>
      <View
        style={{
          height: Dimensions.get("window").height - 100,
          width: Dimensions.get("window").width - 40,
          backgroundColor: "white",
          borderRadius: 5,
        }}
      >
        <WebView
          style={{ flex: 1 }}
          containerStyle={{ padding: 10 }}
          originWhitelist={["*"]}
          source={{ html: html }}
        />
      </View>
    </Modal>
  );
};

export default WebViewModal;

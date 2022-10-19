import React from "react";
import { WebView } from "react-native-webview";
import privacyPolicy from "../../templates/docs/PrivacyPolicy";

const PrivacyPolicy = () => {
  return (
    <WebView
      style={{ flex: 1 }}
      containerStyle={{ padding: 10, backgroundColor: "white" }}
      originWhitelist={["*"]}
      source={{ html: privacyPolicy }}
    />
  );
};

export default PrivacyPolicy;

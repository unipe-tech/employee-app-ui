import React from "react";
import { WebView } from "react-native-webview";
import termsOfUse from "../../templates/docs/TermsOfUse";

const TermsAndConditions = () => {
  return (
    <WebView
      style={{ flex: 1 }}
      containerStyle={{ padding: 10, backgroundColor: "white" }}
      originWhitelist={["*"]}
      source={{ html: termsOfUse }}
    />
  );
};

export default TermsAndConditions;

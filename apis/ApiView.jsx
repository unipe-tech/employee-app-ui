import React from "react";
import { Button } from "@react-native-material/core";

function ApiView(props) {
  const { disabled, goForFetch, loading, style } = props;
  return (
    <Button
      testID="apiButton"
      title={loading ? "Verifying" : "Continue"}
      uppercase={false}
      type="solid"
      color="#4E46F1"
      style={style}
      disabled={loading || disabled}
      onPress={() => {
        goForFetch();
      }}
    />
  );
}

export default ApiView;

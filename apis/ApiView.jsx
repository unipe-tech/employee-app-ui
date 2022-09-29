import React from "react";
import { Button } from "@react-native-material/core";
import TextButton from "../components/atoms/TextButton";

const ApiView = (props) => {
  const { disabled, goForFetch, loading, style, title } = props;

  return (
    <TextButton
      label={loading ? "Verifying" : "Continue"}
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
};

export default ApiView;

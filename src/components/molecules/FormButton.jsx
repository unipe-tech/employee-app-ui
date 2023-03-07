import { View, Text, Dimensions } from "react-native";
import React from "react";
import LoadingButton from "../atoms/LoadingButton";

const FormButton = ({ onPress, title, disabled, accessibilityLabel }) => {
  let loadingButton;
  return (
    <View>
      <LoadingButton
        accessibilityLabel={accessibilityLabel}
        ref={(c) => (loadingButton = c)}
        width={Dimensions.get("window").width}
        height={50}
        title={title}
        disabled={disabled}
        backgroundColor="rgb(29,18,121)"
        borderRadius={4}
        onPress={async () => {
          loadingButton.showLoading(true);
          onPress();
          loadingButton.showLoading(false);
        }}
      />
    </View>
  );
};

export default FormButton;

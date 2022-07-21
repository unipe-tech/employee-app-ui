import { View, Text } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { form } from "../styles";

/**
 *
 * @param value -> value of the picker
 * @param setValue -> used like useState for setting value for the picker
 * @param promptText -> defines the title for the picker
 * @param wrapperStyle -> used to provide container styling to the  picker Container
 * @param style -> used to provide styling to the picker
 * @param otherProps -> used for defining other props to the picker
 */

const DropdownPicker = ({
  children,
  value,
  setValue,
  promptText,
  style,
  wrapperStyle,
  otherProps,
}) => {
  return (
    <View style={wrapperStyle}>
      <Picker
        selectedValue={value}
        style={[form.picker, style]}
        onValueChange={setValue}
        prompt={promptText}
        {...otherProps}
      >
        {children}
      </Picker>
    </View>
  );
};

export default DropdownPicker;

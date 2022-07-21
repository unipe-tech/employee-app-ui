import { View, Text, Pressable } from "react-native";
import React from "react";
import { checkBox } from "../styles";
import CheckBox from "@react-native-community/checkbox";

/**
 * @param value -> Value of the custom check box
 * @param setValue -> used for setting the value of the CustomCheckBox
 * @param title -> Title of the custom check box
 * @param titleStyle -> Styling of the title
 * @param wrapperStyle -> Style of the container for providing things like margin and padding
 * @param checkBoxStyle -> Style of the checkbox
 * @param tintColor -> color of the checkbox on checked
 *
 */

const CustomCheckBox = ({
  value,
  setValue,
  title,
  titleStyle,
  wrapperStyle,
  checkBoxStyle,
  tintColor = "#4E46F1",
}) => {
  return (
    <Pressable
      onPress={() => setValue(!value)}
      style={[checkBox.flexRow, wrapperStyle]}
    >
      <CheckBox
        value={value}
        onValueChange={() => setValue(!value)}
        style={[checkBox.checkBox, checkBoxStyle]}
        tintColors={{ true: tintColor }}
      />
      <Text style={[checkBox.checkBoxText, titleStyle]}>{title}</Text>
    </Pressable>
  );
};

export default CustomCheckBox;

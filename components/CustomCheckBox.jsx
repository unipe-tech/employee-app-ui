import { View, Text, Pressable } from "react-native"
import React from "react"
import { checkBox } from "../screens/styles"
import CheckBox from "@react-native-community/checkbox"

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
  )
}

export default CustomCheckBox

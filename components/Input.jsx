import { View, TextInput, Text } from "react-native"
import React from "react"
import { form, styles } from "../screens/styles"

/**
 *
 * @param value -> value of the textinput
 * @param setValue -> used like useState for setting value for the textinput
 * @param placeholder -> defines the placeholder for the textinput
 * @param required -> checks if the field is required or not
 * @param maxLength -> defines the maxLength of input in textinput
 * @param wrapperStyle -> used to provide container styling to the Textinput Container
 * @param style -> used to provide styling to the textinput
 * @param otherProps -> used for defining other props to the Textinput
 * @author Tanish Garg <tanish@unipe.co>
 */

const Input = ({
  value,
  setValue,
  label,
  placeholder,
  required,
  maxLength,
  wrapperStyle,
  style,
  otherProps,
}) => {
  return (
    <View style={wrapperStyle}>
      <Text style={form.formLabel}>{label}</Text>
      <TextInput
        style={[form.formTextInput, style]}
        value={value}
        onChangeText={setValue}
        maxLength={maxLength}
        placeholder={placeholder}
        required={required}
        {...otherProps}
      />
    </View>
  )
}

export default Input

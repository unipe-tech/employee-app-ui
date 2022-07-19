import React from "react"
import { View, Pressable, StyleSheet } from "react-native"

/**
 * @param onPress -> Used for handling the onPress event
 * @param isChecked -> Used for the RadioButton to provide the value to be checked or unchecked
 * @param unSelectedText -> Used for providing the unselected text
 * @param selectedText -> Used for providing the selected text
 * @param Icon -> Used for providing the icon (optional)
 */

function TextRadioButton({
  onPress,
  isChecked,
  unSelectedText,
  selectedText,
  Icon,
}) {
  const styles = style(isChecked)
  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <View style={[styles.parentView, isChecked && styles.checked]}>
        {Icon && <Icon style={styles.ICO} />}
        <Label
          type="b1"
          style={{
            color: isChecked ? "#fff" : "#00000099",
          }}
          title={isChecked ? selectedText : unSelectedText}
        />
      </View>
    </Pressable>
  )
}

const style = StyleSheet.create((isChecked) => ({
  wrapper: { height: 48, flexWrap: "wrap" },
  parentView: {
    borderRadius: 8,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    backgroundColor: isChecked ? "#4E46F1" : "#E9E9EA",
  },
  checked: {
    borderWidth: 0,
  },
  unChecked: {
    borderWidth: 2,
    borderColor: "#00000090",
  },
  textStyle: {
    fontSize: 14,
  },
  checkedText: { color: "#4e46f1" },
  uncheckedText: { color: "e9e9e9" },
  ICO: {
    height: 24,
    width: 24,
    marginRight: 4,
  },
}))

export default TextRadioButton

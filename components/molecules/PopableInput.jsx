import EStyleSheet from "react-native-extended-stylesheet";
import React from "react";
import FormInput from "../atoms/FormInput";
import { MaterialIcons } from "react-native-vector-icons";
import { COLORS, FONTS } from "../../constants/Theme";
import { useState } from "react";
import { Popable } from "react-native-popable";

const PopableInput = ({
  containerStyle,
  value,
  onChange,
  placeholder,
  autoCapitalize,
  content,
}) => {
  return (
    <FormInput
      containerStyle={{ ...styles.container, ...containerStyle }}
      placeholder={placeholder}
      value={value}
      autoCapitalize={autoCapitalize}
      onChange={onChange}
      appendComponent={
        <Popable content={content} position="left" caret={false}>
          <MaterialIcons name="info-outline" size={20} color="grey" />
        </Popable>
      }
    />
  );
};

const styles = EStyleSheet.create({
  container: {
    marginTop: "15rem",
  },
  header: {
    ...FONTS.h3,
    marginBottom: "10rem",
    alignSelf: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "15rem",
  },
  listText: {
    ...FONTS.h3,
    flex: 1,
    marginLeft: "10rem",
  },
});

export default PopableInput;

import { View, Text } from "react-native";
import React, { memo } from "react";
import CheckBox from "@react-native-community/checkbox";
import EStyleSheet from "react-native-extended-stylesheet";
import { checkBox } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";

const Checkbox = ({ value, setValue, text }) => {
  return (
    <View style={styles.container}>
      <CheckBox
        value={value}
        onValueChange={setValue}
        tintColors={{ true: COLORS.primary }}
      />
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "10rem",
  },
  title: {
    marginLeft: "5rem",
    ...FONTS.h4,
    color: COLORS.gray,
    flex: 1,
  },
});

export default memo(Checkbox);

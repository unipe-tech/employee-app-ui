import React from "react";
import { StyleSheet,Text, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import { COLORS, FONTS } from "../../constants/Theme";
import { checkBox } from "../../styles";

const Checkbox = ({ value, setValue, text }) => (
    <View style={styles.container}>
      <CheckBox
        value={value}
        onValueChange={setValue}
        tintColors={{ true: COLORS.primary }}
      />
      <Text style={styles.title}>{text}</Text>
    </View>
  );

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    marginLeft: 5,
    ...FONTS.h4,
    color: COLORS.gray,
    flex: 1,
  },
});

export default Checkbox;

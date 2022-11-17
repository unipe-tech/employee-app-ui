import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { MaterialIcons } from "react-native-vector-icons";
import React from "react";
import { COLORS, FONTS } from "../../constants/Theme";

const InfoCard = ({ info }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="info-outline" size={20} color={COLORS.primary} />
      <Text style={styles.text}>{info}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryBackground,
    width: "100%",
    marginTop: "20rem",
    padding: "10rem",
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 5,
  },
  text: { paddingLeft: "10rem", ...FONTS.body4, color: COLORS.black, flex: 1 },
});

export default InfoCard;

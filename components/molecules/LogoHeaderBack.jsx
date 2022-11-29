import { View, Text } from "react-native";
import React from "react";
import LogoHeader from "../atoms/LogoHeader";
import { Ionicons, MaterialCommunityIcons } from "react-native-vector-icons";
import { COLORS } from "../../constants/Theme";
const LogoHeaderBack = ({ leftOnPress, rightOnPress }) => {
  return (
    <LogoHeader
      leftIcon={<Ionicons name="arrow-back" size={28} color={COLORS.primary} />}
      leftOnPress={leftOnPress}
      rightIcon={
        <Ionicons name="help-circle-outline" size={28} color={COLORS.primary} />
      }
      rightOnPress={rightOnPress}
    />
  );
};

export default LogoHeaderBack;

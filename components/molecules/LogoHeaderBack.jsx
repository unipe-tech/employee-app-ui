import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import LogoHeader from "../atoms/LogoHeader";
import { Ionicons, MaterialCommunityIcons } from "react-native-vector-icons";
import { COLORS, FONTS } from "../../constants/Theme";

const LogoHeaderBack = ({ leftOnPress, rightOnPress, title, skipEnabled }) => {
  return (
    <LogoHeader
      leftIcon={
        <Ionicons
          accessibilityLabel="BackIcon"
          name="arrow-back-outline"
          size={28}
          color={COLORS.primary}
        />
      }
      leftOnPress={leftOnPress}
      title={title}
      rightIcon={
        skipEnabled ? (
          <View
            accessibilityLabel="ForwardIcon"
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ ...FONTS.h5, color: COLORS.warning }}>Skip</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color={COLORS.warning}
            />
          </View>
        ) : (
          <Ionicons
            name="help-circle-outline"
            size={28}
            color={COLORS.primary}
          />
        )
      }
      rightOnPress={rightOnPress}
    />
  );
};

export default LogoHeaderBack;

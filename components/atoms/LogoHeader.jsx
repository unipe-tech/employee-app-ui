import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../../constants/Theme";
import LogoImage from "../../assets/HeaderLogo.svg";

const LogoHeader = ({
  containerStyle,
  leftIcon,
  leftOnPress,
  rightIcon,
  rightOnPress,
  title,
}) => {
  const EmptyView = () => {
    return <View style={styles.empty} />;
  };

  return (
    <View style={[styles.container, { ...containerStyle }]}>
      {leftIcon && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ marginRight: 10 }}
          onPress={leftOnPress}
        >
          {leftIcon}
        </TouchableOpacity>
      )}
      <View
        style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start" }}
      >
        <LogoImage style={styles.logo} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {rightIcon ? (
        <TouchableOpacity activeOpacity={0.7} onPress={rightOnPress}>
          {rightIcon}
        </TouchableOpacity>
      ) : (
        <EmptyView />
      )}
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1.5,
    borderColor: COLORS.lightgray_01,
  },
  empty: { backgroundColor: "transparent", height: 32, width: 32 },
  logo: {
    height: 20,
    width: 30,
  },
});

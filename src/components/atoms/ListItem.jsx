import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { COLORS, FONTS } from "../../constants/Theme";
import Animated, { Layout, SlideInDown, ZoomOut } from "react-native-reanimated";

const ListItem = ({ item, disabled, showIcon, index}) => {
  const { title, subtitle, iconName, onPress } = item;

  return (
    <Animated.View
      entering={SlideInDown.delay(50 * index)}
      exiting={ZoomOut}
      layout={Layout}
      onTouchEnd={onPress}
      accessibilityLabel="InfoCard"
      style={styles.container}
      disabled={disabled}
    >
      <MaterialCommunityIcons name={iconName} size={24} color={COLORS.gray} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {showIcon && (
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={COLORS.gray}
        />
      )}
    </Animated.View>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    padding: "15rem",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: COLORS.lightgray_01,
  },
  textContainer: {
    paddingLeft: "10rem",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
  },
  title: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  subtitle: { ...FONTS.body5, color: COLORS.gray },
});

export default ListItem;
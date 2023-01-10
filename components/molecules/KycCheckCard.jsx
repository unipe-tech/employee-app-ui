import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Layout, SlideInDown, ZoomOut } from "react-native-reanimated";
import { Ionicons } from "react-native-vector-icons";
import { COLORS, FONTS } from "../../constants/Theme";

const KycCheckCard = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
      {props.message.map((item, index) =>
        item != null ? (
          <Animated.View
            key={index}
            entering={SlideInDown.delay(50 * index)}
            exiting={ZoomOut}
            layout={Layout}
            onTouchEnd={() =>
              navigation.navigate("AccountStack", {
                screen: "KYC",
                params: { screen: item.value },
              })
            }
            style={styles.card}
          >
            <Ionicons
              name="add-circle-outline"
              color={COLORS.primary}
              size={24}
            />
            <Text style={styles.cardText}>{item.label}</Text>
          </Animated.View>
        ) : null
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: "column",
  },
  title: {
    ...FONTS.body4,
    textAlign: "center",
    color: COLORS.gray,
  },
  subtitle: {
    ...FONTS.body2,
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
    //elevation: 1,
    borderWidth: 1.5,
    borderColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  cardText: { ...FONTS.h4, color: COLORS.black, flex: 1, paddingLeft: 10 },
});

export default KycCheckCard;

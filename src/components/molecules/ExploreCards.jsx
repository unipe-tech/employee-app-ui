import { useNavigation } from "@react-navigation/core";
import { ScrollView, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Earn from "../../assets/Earn.svg";
import ODS from "../../assets/GetODS.svg";
import Refer from "../../assets/Refer.svg";
import { COLORS, FONTS } from "../../constants/Theme";
import { useRef } from "react";
import { Ionicons } from "react-native-vector-icons";
import Animated, { Layout, SlideInRight } from "react-native-reanimated";

const Card = ({ destination, component, inactive , index}) => {
  const navigation = useNavigation();
  return (
    <Animated.View
      layout={Layout}
      entering={SlideInRight.delay(50 * index)}
      activeOpacity={0.8}
      onTouchEnd={() => {
        navigation.navigate(destination);
      }}
    >
      {component}
    </Animated.View>
  );
};
const data = [
  {
    destination: "Money",
    component: <ODS width={150} height={200} />,
  },
  {
    destination: "Invest",
    component: <Earn width={150} height={200} />,
  },
  {
    component: <Refer width={150} height={200} />,
    inactive: true,
  },
];

const ExploreCards = () => {
  const scrollRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Explore</Text>
        <View style={{ justifyContent: "flex-end" }}>
          <Ionicons
            name="arrow-forward"
            color={COLORS.darkGray}
            size={20}
            onPress={() => scrollRef.current.scrollToEnd({ animated: true })}
          />
        </View>
      </View>
      <ScrollView
        horizontal={true}
        disableIntervalMomentum={true}
        pagingEnabled
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"center"}
        style={styles.cardsView}
        ref={scrollRef}
      >
        {data.map((item, index) => (
          <Card
            key={index}
            index={index}
            destination={item.destination}
            component={item.component}
            inactive={item.inactive}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginVertical: "10rem",
    paddingVertical: "20rem",
    flexDirection: "column",
  },
  title: {
    ...FONTS.h3,
    textAlign: "left",
    marginHorizontal: "10rem",
    color: COLORS.black,
  },
  cardsView: {
    marginTop: "10rem",
  },
});

export default ExploreCards;

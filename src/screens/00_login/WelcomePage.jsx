import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { Linking, SafeAreaView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import Clock from "../../assets/Clock.svg";
import InterestFree from "../../assets/InterestFree.svg";
import OnDemand from "../../assets/OnDemand.svg";
import LogoHeader from "../../components/atoms/LogoHeader";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import ShieldTitle from "../../components/atoms/ShieldTitle";
import SvgListItem from "../../components/molecules/SvgListItem";
import { COLORS, FONTS } from "../../constants/Theme";
import { useEffect } from "react";
import { requestUserPermission } from "../../services/notifications/notificationService";
import { onboardingStyles, styles } from "../../styles";
import { addCurrentScreen } from "../../store/slices/navigationSlice";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(addCurrentScreen("Welcome"));
  }, []);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const data = [
    {
      title: "On-demand Salary\n(पाएँ वेतन अपने मनचाहे समय पर)",
      imageUri: <OnDemand />,
    },
    {
      title: "Interest Free\nशून्य ब्याज दर",
      imageUri: <Clock />,
    },
    {
      title:
        "Money in your bank in 5 mins\nसिर्फ़ पाँच मिनट में पैसा आपके बैंक अकाउंट में",
      imageUri: <InterestFree />,
    },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        rightIcon={
          <Icon name="logo-whatsapp" size={28} color={COLORS.primary} />
        }
        rightOnPress={() => {
          Linking.openURL(`whatsapp://send?text=&phone=7483447528`);
        }}
      />
      <View style={styles.container}>
        <Text
          style={{
            ...FONTS.title,
            color: COLORS.primary,
          }}
        >
          नमस्ते
        </Text>
        <View style={styles.row}>
          <View style={onboardingStyles.curvedBox} />
          <Text style={{ ...FONTS.h2, color: COLORS.secondary }}>
            Unipe के साथ पाएँ
          </Text>
        </View>
        {data.map((item, index) => (
          <SvgListItem item={item} key={index} />
        ))}

        <View style={{ flex: 1 }} />
        <ShieldTitle title="100% Secure" />
        <PrimaryButton
          title="Get Started Now"
          onPress={() => {
            requestUserPermission();
            Analytics.trackEvent("WelcomePage", {
              unipeEmployeeId: unipeEmployeeId,
            });
            navigation.navigate("HomeStack");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;

import {
  View,
  Text,
  SafeAreaView,
  Alert,
  BackHandler,
  Linking,
} from "react-native";
import { onboardingStyles, styles } from "../../styles";
import LogoHeader from "../../components/atoms/LogoHeader";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, FONTS } from "../../constants/Theme";
import Analytics from "appcenter-analytics";
import { requestUserPermission } from "../../services/notifications/notificationService";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import KycSteps from "../../assets/KycSteps.svg";
import Info from "../../assets/Info.svg";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import SvgContainer from "../../components/SvgContainer";
import LinearGradient from "react-native-linear-gradient";

const LoginSuccess = () => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("LoginSuccess"));
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to Logout?", [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => navigation.navigate("Login") },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const profileComplete = useSelector((state) => state.profile.profileComplete);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);

  const handleConditionalNav = () => {
    if (!profileComplete) {
      navigation.navigate("AccountStack", {
        screen: "Profile",
      });
    } else if (aadhaarVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "AADHAAR",
        },
      });
    } else if (panVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "PAN",
        },
      });
    } else if (bankVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "BANK",
        },
      });
    }
  };

  return (
    <SafeAreaView accessibilityLabel="WelcomePage" style={styles.safeContainer}>
      <LogoHeader
        rightIcon={
          <Icon name="logo-whatsapp" size={28} color={COLORS.primary} />
        }
        rightOnPress={() => {
          Linking.openURL(`whatsapp://send?text=&phone=7483447528`);
        }}
      />

      <View style={styles.container}>
        <Text style={[styles.headline, { ...FONTS.h1 }]}>
          Congratulations on joining Unipe!
        </Text>
        <Text
          style={[
            styles.subHeadline,
            {
              color: COLORS.secondary,
              ...FONTS.body3,
              width: "100%",
            },
          ]}
        >
          Your employer,{" "}
          <Text
            style={{
              ...FONTS.h3,
            }}
          >
            XXXXXXX
          </Text>
          , has initiated your onboarding process.
        </Text>
        <LinearGradient
          colors={["#ffffff", "#E9FFF6"]}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            marginHorizontal: -15,
          }}
        >
          <SvgContainer width={300} height={280}>
            <KycSteps />
          </SvgContainer>
        </LinearGradient>

        <View style={onboardingStyles.alertBox}>
          <SvgContainer width={40} height={40}>
            <Info />
          </SvgContainer>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.secondary,
              flex: 1,
              paddingLeft: 10,
            }}
          >
            As per RBI guidelines, you have to complete e-KYC to get Advance
            Salary
          </Text>
        </View>

        <PrimaryButton
          title="Start KYC"
          accessibilityLabel="WelcomeBtn"
          onPress={() => {
            requestUserPermission();
            Analytics.trackEvent("WelcomePage", {
              unipeEmployeeId: unipeEmployeeId,
            });
            handleConditionalNav();
          }}
        />
        <PrimaryButton
          title="I will do it later"
          containerStyle={{
            backgroundColor: COLORS.white,
            borderWidth: 1.5,
            borderColor: COLORS.warning,
          }}
          titleStyle={{ color: COLORS.warning }}
          onPress={() => {
            navigation.navigate("HomeStack");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginSuccess;

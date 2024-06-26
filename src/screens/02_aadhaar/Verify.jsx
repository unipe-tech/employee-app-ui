import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Alert, SafeAreaView, BackHandler } from "react-native";
import OnboardingProgressBar from "../../navigators/OnboardingProgressBar";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import AadhaarVerifyTemplate from "../../templates/aadhaar/Verify";
import Header from "../../components/atoms/Header";

const AadhaarVerify = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [back, setBack] = useState(false);

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarVerify"));
  }, []);

  const backAction = () => {
    if (back) {
      Alert.alert("OTP Timer", "You must wait for 10 minutes to resend OTP.");
    } else {
      Alert.alert(
        "Hold on!",
        "Are you sure you want to go back? Continue if you want to edit your Aadhaar number.",
        [
          { text: "No", onPress: () => null, style: "cancel" },
          { text: "Yes", onPress: () => navigation.navigate("AadhaarForm") },
        ]
      );
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Onboarding"
        onLeftIconPress={() => backAction()}
        progress={30}
      />
      <OnboardingProgressBar step={1} />
      <AadhaarVerifyTemplate
        back={back}
        setBack={setBack}
      />
    </SafeAreaView>
  );
};

export default AadhaarVerify;

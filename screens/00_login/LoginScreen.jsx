import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
import SmsRetriever from "react-native-sms-retriever";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import Otp from "../../apis/login/Otp";
import SVGImg from "../../assets/UnipeLogo.svg";
import FormInput from "../../components/atoms/FormInput";
import TermsAndPrivacyModal from "../../components/molecules/TermsAndPrivacyModal";
import { COLORS, FONTS } from "../../constants/Theme";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { addPhoneNumber } from "../../store/slices/authSlice";
import {
  addCurrentScreen,
  addCurrentStack,
} from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import privacyPolicy from "../../templates/docs/PrivacyPolicy.js";
import termsOfUse from "../../templates/docs/TermsOfUse.js";

const LoginScreen = () => {
  SplashScreen.hide();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);

  const authSlice = useSelector((state) => state.auth);
  const [phoneNumber, setPhoneNumber] = useState(authSlice?.phoneNumber);

  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);

  useEffect(() => {
    dispatch(addCurrentStack("OnboardingStack"));
    dispatch(addCurrentScreen("Login"));
  }, []);

  useEffect(() => {
    dispatch(addPhoneNumber(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    var phoneno = /^[0-9]{10}$/gm;
    if (phoneno.test(phoneNumber) && phoneNumber.length === 10) {
      setDisabled(false);
      console.log("true");
    } else {
      setDisabled(true);
      console.log("false");
    }
  }, [phoneNumber]);

  const onPhoneNumberPressed = async () => {
    try {
      var phoneNumber = await SmsRetriever.requestPhoneNumber();
      setPhoneNumber(phoneNumber.replace("+91", ""));
    } catch (error) {
      console.log("Error while fetching phoneNumber: ", error.toString());
    }
  };

  useEffect(() => {
    onPhoneNumberPressed();
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingWrapper>
        <View>
          <SVGImg style={styles.logo} />
          <Text style={styles.headline}>
            Please enter your mobile number to login:
          </Text>

          <FormInput
            placeholder="Enter mobile number"
            containerStyle={{ marginVertical: 30 }}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChange={setPhoneNumber}
            autoFocus={true}
            maxLength={10}
            prependComponent={
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRightWidth: 1,
                  borderColor: COLORS.gray,
                  marginRight: 10,
                  height: "80%",
                }}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.black,
                    paddingRight: 10,
                    // fontWeight: "bold",
                  }}
                >
                  + 91
                </Text>
              </View>
            }
          />

          <Text style={styles.dataUseText}>
            This number will be used for all communication. You shall receive an
            SMS with code for verification. By continuing, you agree to our{" "}
            <Text
              onPress={() => setIsTermsOfUseModalVisible(true)}
              style={styles.termsText}
            >
              Terms of Service
            </Text>{" "}
            &{" "}
            <Text
              onPress={() => setIsPrivacyModalVisible(true)}
              style={styles.termsText}
            >
              Privacy Policy
            </Text>
          </Text>
          <Otp disabled={disabled} type="login" />
        </View>
      </KeyboardAvoidingWrapper>

      {isTermsOfUseModalVisible && (
        <TermsAndPrivacyModal
          isVisible={isTermsOfUseModalVisible}
          setIsVisible={setIsTermsOfUseModalVisible}
          data={termsOfUse}
        />
      )}

      {isPrivacyModalVisible && (
        <TermsAndPrivacyModal
          isVisible={isPrivacyModalVisible}
          setIsVisible={setIsPrivacyModalVisible}
          data={privacyPolicy}
        />
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

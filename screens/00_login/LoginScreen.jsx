import { useEffect, useState } from "react";
import {
  Alert, Dimensions,
  Pressable, SafeAreaView, Text,
  View
} from "react-native";
import Modal from "react-native-modal";
import SmsRetriever from "react-native-sms-retriever";
import SplashScreen from "react-native-splash-screen";
import { AntDesign } from "react-native-vector-icons";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";

import SVGImg from "../../assets/UnipeLogo.svg";
import FormInput from "../../components/atoms/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import { COLORS, FONTS } from "../../constants/Theme";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { putBackendData } from "../../services/employees/employeeServices";
import { sendSmsVerification } from "../../services/otp/Gupshup/services";
import {
  addId,
  addOnboarded,
  addPhoneNumber
} from "../../store/slices/authSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { resetTimer } from "../../store/slices/timerSlice";
import { styles } from "../../styles";
import privacyPolicy from "../../templates/docs/PrivacyPolicy";
import termsOfUse from "../../templates/docs/TermsOfUse";

const LoginScreen = () => {
  SplashScreen.hide();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(false);

  const authSlice = useSelector((state) => state.auth);
  const [id, setId] = useState(authSlice?.id);
  const [onboarded, setOnboarded] = useState(authSlice?.onboarded);
  const [phoneNumber, setPhoneNumber] = useState(authSlice?.phoneNumber);

  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);

  let phoneNum = "";

  useEffect(() => {
    dispatch(addCurrentScreen("Login"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(addId(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(addOnboarded(onboarded));
  }, [dispatch, onboarded]);

  useEffect(() => {
    dispatch(addPhoneNumber(phoneNumber));
  }, [dispatch, phoneNumber]);

  useEffect(() => {
    const phoneno = /^[0-9]{10}$/gm;
    if (phoneno.test(phoneNumber) && phoneNumber.length === 10) {
      setNext(true);
      console.log("true");
    } else {
      setNext(false);
      console.log("false");
    }
  }, [phoneNumber]);

  const onPhoneNumberPressed = async () => {
    try {
      phoneNum = await SmsRetriever.requestPhoneNumber();
      setPhoneNumber(phoneNum.replace("+91", ""));
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  useEffect(() => {
    onPhoneNumberPressed();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = () => {
    setLoading(true);
    dispatch(resetTimer());
    const fullPhoneNumber = `+91${phoneNumber}`;
    putBackendData({ document: { number: fullPhoneNumber }, xpath: "mobile" })
      .then((res) => {
        console.log("LoginScreen res.data: ", res.data);
        if (res.data.status === 200) {
          Analytics.trackEvent(`LoginScreen|SignIn|Success`, {
            userId: res.data.body.id,
          });
          setId(res.data.body.id);
          setOnboarded(res.data.body.onboarded);
          sendSmsVerification(phoneNumber)
            .then((result) => {
              console.log("sendSmsVerification result: ", result);
              if (result.response.status === "success") {
                setLoading(false);
                Analytics.trackEvent("LoginScreen|SendSms|Success", {
                  userId: id,
                });
                navigation.navigate("Otp");
              } else {
                setLoading(false);
                Analytics.trackEvent("LoginScreen|SendSms|Error", {
                  userId: id,
                  error: result.response.details,
                });
                Alert.alert(
                  result.response.status,
                  result.response.details
                );
              }
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
              Analytics.trackEvent("LoginScreen|SendSms|Error", {
                userId: id,
                error,
              });
              Alert("Error", "Something is Wrong");
            });
        } else {
          setLoading(false);
          Analytics.trackEvent("LoginScreen|SignIn|Error", {
            phoneNumber,
            error: res.data.message,
          });
          Alert.alert("Error", res.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        Analytics.trackEvent("LoginScreen|SignIn|Error", {
          phoneNumber,
          error,
        });
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
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
            autoFocus
            maxLength={10}
            prependComponent={
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRightWidth: 1,
                  borderColor: COLORS.black,
                  marginRight: 10,
                  height: "80%",
                }}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.black,
                    paddingRight: 10,
                    fontWeight: "900",
                  }}
                >
                  +91
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
          <PrimaryButton
            title="Continue"
            disabled={!next}
            loading={loading}
            onPress={() => signIn()}
          />
        </View>
      </KeyboardAvoidingWrapper>

      <Modal
        isVisible={isPrivacyModalVisible}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        <Pressable
          onPress={() => setIsPrivacyModalVisible(false)}
          style={{
            position: "absolute",
            top: 30,
            right: 50,
            zIndex: 999,
          }}
        >
          <AntDesign name="closesquareo" size={24} color="black" />
        </Pressable>
        <View
          style={{
            height: Dimensions.get("window").height - 100,
            width: Dimensions.get("window").width - 40,
            backgroundColor: "white",
            borderRadius: 5,
          }}
        >
          <WebView
            style={{ flex: 1 }}
            containerStyle={{ padding: 10 }}
            originWhitelist={["*"]}
            source={{ html: privacyPolicy }}
          />
        </View>
      </Modal>
      <Modal
        isVisible={isTermsOfUseModalVisible}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        <Pressable
          onPress={() => setIsTermsOfUseModalVisible(false)}
          style={{
            position: "absolute",
            top: 30,
            right: 50,
            zIndex: 999,
          }}
        >
          <AntDesign name="closesquareo" size={24} color="black" />
        </Pressable>
        <View
          style={{
            height: Dimensions.get("window").height - 100,
            width: Dimensions.get("window").width - 40,
            backgroundColor: "white",
            borderRadius: 5,
          }}
        >
          <WebView
            style={{ flex: 1 }}
            containerStyle={{ padding: 10 }}
            originWhitelist={["*"]}
            source={{ html: termsOfUse }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginScreen;
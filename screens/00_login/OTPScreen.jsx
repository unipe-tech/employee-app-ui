import { Icon } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
import CountDown from "react-native-countdown-component";
import { useDispatch, useSelector } from "react-redux";
import Otp from "../../apis/login/Otp";
import Verify from "../../apis/login/Verify";
import SVGImg from "../../assets/UnipeLogo.svg";
import FormInput from "../../components/atoms/FormInput";
import Header from "../../components/atoms/Header";
import { COLORS, SIZES } from "../../constants/Theme";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { setLoginTimer } from "../../store/slices/timerSlice";
import { styles } from "../../styles";

const OTPScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [otp, setOtp] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [back, setBack] = useState(false);

  const countDownTime = useSelector((state) => state.timer.login);
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);

  useEffect(() => {
    dispatch(addCurrentScreen("Otp"));
  }, []);

  useEffect(() => {
    if (otp.length === 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [otp]);

  const backAction = () => {
    if (!back) {
      Alert.alert("OTP Timer", "You must wait for 2 minutes to resend OTP.");
    } else {
      Alert.alert("Hold on!", "Do you want to update your phone number ?", [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("Login") },
      ]);
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
      <Header title="OTP" onLeftIconPress={() => backAction()} />
      <KeyboardAvoidingWrapper>
        <View style={styles.container}>
          <SVGImg style={styles.logo} />
          <Text style={styles.headline}>
            {" "}
            Please wait, we will auto verify the OTP {"\n"} sent to{" "}
            {phoneNumber}
            {back ? (
              <Icon
                name="edit"
                size={12}
                color={COLORS.primary}
                onPress={() => navigation.navigate("Login")}
              />
            ) : (
              <Icon
                name="edit"
                size={12}
                color={COLORS.gray}
                onPress={() =>
                  Alert.alert(
                    "OTP Timer",
                    "You must wait for 2 minutes to edit number."
                  )
                }
              />
            )}
          </Text>
          <FormInput
            containerStyle={{
              marginTop: 30,
              width: SIZES.width * 0.6,
              alignSelf: "center",
            }}
            letterSpacing={SIZES.width * 0.0699}
            autoFocus={true}
            value={otp}
            onChange={setOtp}
            maxLength={6}
            keyboardType="numeric"
            placeholder={"******"}
          />

          <CountDown
            until={countDownTime}
            onFinish={() => {
              setBack(true);
            }}
            size={20}
            style={{ marginTop: 20 }}
            digitStyle={{ backgroundColor: "#FFF" }}
            digitTxtStyle={{ color: COLORS.primary }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: "MM", s: "SS" }}
            onChange={(time) => {
              dispatch(setLoginTimer(time));
            }}
          />
          {back ? <Otp /> : null}
          <Text style={styles.otpreadtxt}>
            {" "}
            Sit back & relax while we fetch the OTP & log you inside the Unipe
            App
          </Text>
          <Verify disabled={disabled} otp={otp}/>
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default OTPScreen;

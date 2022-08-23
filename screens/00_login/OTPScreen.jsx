import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import SmsRetriever from "react-native-sms-retriever";
import CountDown from "react-native-countdown-component";
import {
  checkVerification,
  sendSmsVerification,
} from "../../services/otp/Twilio/verify";
import { addLoginVerifyStatus } from "../../store/slices/authSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { MaterialIcons } from "react-native-vector-icons";

function OTPScreen() {
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const [next, setNext] = useState(false);
  const [back, setBack] = useState(false);
  const auth = useSelector((state) => state.auth);

  console.log("OTPScreen state.auth: ", auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentScreen("Otp"));
  }, []);

  const otpVerify = () => {
    const fullPhoneNumber = `+91${phoneNumber}`;
    setNext(false);
    checkVerification(fullPhoneNumber, otp).then((success) => {
      if (!success) Alert.alert("err", "Incorrect OTP");
      success && navigation.navigate("AadhaarForm");
      console.log(fullPhoneNumber, otp);
      dispatch(addLoginVerifyStatus("SUCCESS"));
      SmsRetriever.removeSmsListener();
    });
  };

  // useEffect(() => {
  //   dispatch({
  //     type: "SET_USER",
  //     payload: user,
  //   });
  // }, [user]);

  useEffect(() => {
    if (otp.length === 6) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [otp]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingWrapper>
        <View style={styles.container}>
          <View style={styles.otpback}>
            {back ? (
              <IconButton
                icon={
                  <MaterialIcons name="arrow-back" size={30} color="#4E46F1" />
                }
                onPress={() => navigation.navigate("Login")}
              />
            ) : (
              <IconButton
                icon={
                  <MaterialIcons name="arrow-back" size={30} color="#808080" />
                }
                onPress={() =>
                  Alert.alert(
                    "OTP Timer",
                    "You must wait for 30 seconds to resend otp"
                  )
                }
              />
            )}
          </View>
          <Image
            style={styles.logo}
            source={require("../../assets/unipe-Thumbnail.png")}
          />
          <Text style={styles.headline}>
            {" "}
            Please wait, we will auto verify the OTP {"\n"} sent to{" "}
            {phoneNumber}
            {back ? (
              <MaterialIcons
                name="edit"
                size={12}
                color="#4E46F1"
                onPress={() => navigation.navigate("Login")}
              />
            ) : (
              <MaterialIcons
                name="edit"
                size={12}
                color="#808080"
                onPress={() =>
                  Alert.alert(
                    "OTP Timer",
                    "You must wait for 30 seconds to edit number"
                  )
                }
              />
            )}
          </Text>
          <TextInput
            style={styles.otpInput}
            letterSpacing={23}
            maxLength={6}
            numeric
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <CountDown
            until={60}
            onFinish={() => {
              setBack(true);
            }}
            size={20}
            style={{ marginTop: 20 }}
            digitStyle={{ backgroundColor: "#FFF" }}
            digitTxtStyle={{ color: "#4E46F1" }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: "MM", s: "SS" }}
          />
          {back ? (
            <Text
              style={styles.resendText}
              onPress={() => {
                sendSmsVerification(`+91${phoneNumber}`).then((sent) => {
                  console.log("Sent!");
                });
                setOtp("");
              }}
            >
              Resend
            </Text>
          ) : null}
          <Text style={styles.otpreadtxt}>
            {" "}
            Sit back & relax while we fetch the OTP & log you inside the Unipe
            App
          </Text>
          <Button
            uppercase={false}
            title="Verify"
            type="solid"
            color="#4E46F1"
            style={styles.ContinueButton}
            onPress={otpVerify}
            disabled={!next}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
}

export default OTPScreen;

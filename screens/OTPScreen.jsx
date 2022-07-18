import React, { useEffect, useState } from "react";
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
import { styles } from "./styles";
import SmsRetriever from "react-native-sms-retriever";
import { checkVerification, sendSmsVerification } from "../services/otp/Twilio/verify";
import CountDown from "react-native-countdown-component";
import { useDispatch, useSelector } from "react-redux";
import { addVerifyStatus } from "../store/slices/authSlice";
import { addCurrentScreen } from "../store/slices/navigationSlice";

export default OTPScreen = () => {
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const [next, setNext] = useState(false);
  const [user, setUser] = useState(null);
  const [back, setBack] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {dispatch(addCurrentScreen("Otp"))}, []);

  // HHrHWFsvgjF

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
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.otpback}>
            {back ? (
              <IconButton
                icon={<Icon name="arrow-back" size={30} color="#4E46F1" />}
                onPress={() => navigation.goBack()}
              />
            ) : (
              <IconButton
                icon={<Icon name="arrow-back" size={30} color="#808080" />}
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
            source={require("../assets/unipe-Thumbnail.png")}
          />
          <Text style={styles.headline}>
            {" "}
            Please wait, we will auto verify the OTP {"\n"} sent to{" "}
            {phoneNumber}
            {back ? (
              <Icon
                name="edit"
                size={12}
                color="#4E46F1"
                onPress={() => navigation.goBack()}
              />
            ) : (
              <Icon
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
                sendSmsVerification(phoneNumber).then((sent) => {
                  console.log("Sent!");
                });
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
          {next ? (
            <Button
              uppercase={false}
              title="Verify"
              type="solid"
              color="#4E46F1"
              style={styles.ContinueButton}
              onPress={() => {
                checkVerification(phoneNumber, otp).then((success) => {
                  if (!success) Alert.alert("err", "Incorrect OTP");
                  success && navigation.navigate("AadhaarForm");
                  dispatch(addVerifyStatus("SUCCESS"));
                  SmsRetriever.removeSmsListener();
                });
              }}
            />
          ) : (
            <Button
              title="Verify"
              uppercase={false}
              type="solid"
              style={styles.ContinueButton}
              disabled
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
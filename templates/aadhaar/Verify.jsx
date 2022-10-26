import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CountDown from "react-native-countdown-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import AadhaarOtpApi from "../../apis/aadhaar/Otp";
import AadhaarVerifyApi from "../../apis/aadhaar/Verify";
import FormInput from "../../components/atoms/FormInput";
import { COLORS, SIZES } from "../../constants/Theme";
import { setAadhaarTimer } from "../../store/slices/timerSlice";
import { form, styles } from "../../styles";

const AadhaarVerifyTemplate = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [resend, setResend] = useState(false);
  const [otp, setOtp] = useState("");
  const [validOtp, setValidOtp] = useState(true);
  const countDownTime = useSelector((state) => state.timer.aadhaar);
  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [number, setNumber] = useState(aadhaarSlice?.number);

  useEffect(() => {
    setValidOtp(otp.length === 6);
  }, [otp]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={form.OtpAwaitMsg}>
          Enter 6 digit OTP sent to your Aadhaar registered mobile number
        </Text>

        <FormInput
          containerStyle={{
            marginTop: 30,
            width: SIZES.width * 0.6,
            alignSelf: "center",
          }}
          letterSpacing={20}
          value={otp}
          onChange={setOtp}
          maxLength={6}
          keyboardType="numeric"
          placeholder="******"
          textAlign="center"
          autoFocus
        />

        <CountDown
          until={countDownTime}
          size={20}
          on
          onFinish={() => {
            setResend(true);
            props.function ||
              navigation.navigate("KYC", {
                screen: "Aadhaar",
              });
          }}
          style={{ marginTop: 20 }}
          digitStyle={{ backgroundColor: "#FFF" }}
          digitTxtStyle={{ color: COLORS.primary }}
          timeToShow={["M", "S"]}
          timeLabels={{ m: "MM", s: "SS" }}
          onChange={(time) => {
            dispatch(setAadhaarTimer(time));
          }}
        />
        {resend ? (
          <AadhaarOtpApi
            data={{ aadhaar_number: number, consent: "Y" }}
            style={form.nextButton}
            disabled={!resend}
            title="Resend"
            type={props?.route?.params?.type || ""}
          />
        ) : null}
        <AadhaarVerifyApi
          data={{ otp, include_xml: true, share_code: 5934 }}
          style={form.nextButton}
          disabled={!validOtp}
          type={props?.route?.params?.type || ""}
        />
      </View>
    </ScrollView>
  );
};

export default AadhaarVerifyTemplate;

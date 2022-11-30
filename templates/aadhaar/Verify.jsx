import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import CountDown from "react-native-countdown-component";
import { useDispatch, useSelector } from "react-redux";
import AadhaarVerifyApi from "../../apis/aadhaar/Verify";
import { useNavigation } from "@react-navigation/core";
import { setAadhaarTimer } from "../../store/slices/timerSlice";
import AadhaarOtpApi from "../../apis/aadhaar/Otp";
import { form, styles } from "../../styles";
import { COLORS, SIZES } from "../../constants/Theme";
import OtpInput from "../../components/molecules/OtpInput";

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
        <Text style={styles.headline}>Verify Aadhar</Text>
        <Text style={styles.subHeadline}>
          कृपया छ डिजिट का OTP यहाँ भरें। इसी के द्वारा ये स्पष्ट होगा की ऊपर
          भरा आधार नम्बर आपका है। ये जानकारी आपकी कम्पनी को दी जाएगी।
        </Text>
        <OtpInput otp={otp} setOtp={setOtp} />

        <Text style={styles.subHeadline}>
          Didn’t receive the secure code?{" "}
          {back ? (
            <Text
              style={{ ...FONTS.h4, color: COLORS.primary }}
              onPress={onResendOtp}
            >
              Resend OTP
            </Text>
          ) : (
            <Text style={{ color: COLORS.lightGray }}>
              Resend OTP in {Math.trunc(timer / 60)}:
              {String("0" + (timer % 60)).slice(-2)}
            </Text>
          )}
        </Text>
        {resend ? (
          <AadhaarOtpApi
            data={{ aadhaar_number: number, consent: "Y" }}
            disabled={!resend}
            title="Resend"
            type={props?.route?.params?.type || ""}
          />
        ) : null}
        <AadhaarVerifyApi
          data={{ otp: otp, include_xml: true, share_code: 5934 }}
          disabled={!validOtp}
          type={props?.route?.params?.type || ""}
        />
      </View>
    </ScrollView>
  );
};

export default AadhaarVerifyTemplate;

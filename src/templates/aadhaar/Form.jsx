import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { styles } from "../../styles";
import AadhaarOtpApi from "../../apis/aadhaar/Otp";
import { addNumber } from "../../store/slices/aadhaarSlice";
import InfoCard from "../../components/atoms/InfoCard";
import FormInput from "../../components/atoms/FormInput";
import { COLORS, FONTS } from "../../constants/Theme";

const AadhaarFormTemplate = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [validNumber, setValidNumber] = useState(false);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [number, setNumber] = useState(aadhaarSlice?.number);

  var aadhaarReg = /^[0-9]{12}$/gm;

  useEffect(() => {
    dispatch(addNumber(number));
    if (number.length == 12 && aadhaarReg.test(number)) {
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
  }, [number]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingWrapper>
        <View style={[styles.container, { padding: 0 }]}>
          <Text style={styles.headline}>Enter your Aadhaar number</Text>
          <Text style={styles.subHeadline}>
            कृपया अपना आधार नम्बर यहाँ भरें ॰ इस आधार नम्बर से जुड़े मोबाइल
            नम्बर पर हम ओ॰टी॰पी॰ भेजेंगे ॰
          </Text>
          <FormInput
            accessibilityLabel={"AadhaarInput"}
            placeholder={"Aadhaar Number"}
            keyboardType="numeric"
            autoFocus={isFocused}
            value={number}
            onChange={setNumber}
            maxLength={12}
            errorMsg={
              number.length == 12 && !aadhaarReg.test(number)
                ? "Invalid Aadhaar Number"
                : ""
            }
            numeric
            appendComponent={
              <Text style={{ ...FONTS.body5, color: COLORS.gray }}>
                {number.length}/12
              </Text>
            }
          />

          <InfoCard
            info={
              "I agree with the KYC registration Terms & Conditions to verifiy my identity. You will receive an OTP to your Aadhaar registered mobile number."
            }
          />

          <AadhaarOtpApi
            disabled={!validNumber}
            type={props?.route?.params?.type || ""}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default AadhaarFormTemplate;

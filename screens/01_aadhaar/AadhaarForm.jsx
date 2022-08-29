import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, SafeAreaView, Text, TextInput, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { AppBar, Button, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";

import ProgressBarTop from "../../components/ProgressBarTop";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { bankform, checkBox, form, styles } from "../../styles";

import Otp from "../../apis/aadhaar/Otp";
import { addNumber } from "../../store/slices/aadhaarSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { MaterialIcons } from "react-native-vector-icons";

function AadhaarForm({ navigation }) {
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  const [consent, setConsent] = useState(false);
  const [validNumber, setValidNumber] = useState(true);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [number, setNumber] = useState(aadhaarSlice?.number);

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarForm"));
  }, []);

  useEffect(() => {
    var aadhaarReg = /^[0-9]{12}$/gm;
    if (aadhaarReg.test(number)) {
      dispatch(addNumber(number));
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
  }, [number]);

  const returnNull = () => null;

  const navigateToPan = () => navigation.navigate("PanForm");
  const navigateToOtp = () => navigation.navigate("Otp");

  const SkipAadhaar = () => {
    Alert.alert(
      "Aadhaar KYC pending",
      `To formally complete your employment with the company, Aadhaar KYC is required.`,
      [
        { text: "No", onPress: returnNull, style: "cancel" },
        { text: "Yes", onPress: navigateToPan },
      ]
    );
  };

  const backAlert = () => {
    Alert.alert(
      "Do you want to go back ?",
      "If you go back your Mobile Number Verification will have to be redone.",
      [
        { text: "No", onPress: returnNull, style: "cancel" },
        { text: "Yes", onPress: navigateToOtp },
      ]
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Aadhaar Verification"
          color="#4E46F1"
          leading={
            <IconButton
              testID="backIcon"
              icon={<MaterialIcons name="arrow-back" size={20} color="white" />}
              onPress={() => {
                backAlert();
              }}
            />
          }
          trailing={
            <IconButton
              testID="forwardIcon"
              icon={
                <MaterialIcons name="arrow-forward" size={20} color="white" />
              }
              onPress={() => {
                SkipAadhaar();
              }}
            />
          }
        />

        <ProgressBarTop step={1} />
        <Text style={form.formHeader}>Aadhaar Verification</Text>
        <KeyboardAvoidingWrapper>
          <View>
            <Text style={form.formLabel}>Enter AADHAAR Number</Text>
            <TextInput
              style={form.formTextInput}
              value={number}
              onChangeText={setNumber}
              // placeholder="1234123412341234"
              maxLength={12}
              numeric
            />
            {number && !validNumber ? (
              <Text style={bankform.formatmsg}>Invalid AADHAAR Number.</Text>
            ) : null}

            <View style={bankform.infoCard}>
              <MaterialIcons name="info-outline" size={20} color="#4E46F1" />
              <Text style={bankform.infoText}>
                My Mobile number is linked with AADHAAR on which you can receive
                the OTP.
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <CheckBox
                value={consent}
                onValueChange={setConsent}
                style={checkBox.checkBox}
                tintColors={{ true: "#4E46F1" }}
              />
              <Text style={checkBox.checkBoxText}>
                I agree with the KYC registration Terms and Conditions to
                verifiy my identity.
              </Text>
            </View>
            <Otp
              url={"https://api.gridlines.io/aadhaar-api/boson/generate-otp"}
              data={{ aadhaar_number: number, consent: "Y" }}
              style={form.nextButton}
              disabled={!validNumber || !consent}
              navigation={navigation}
            />

            <Button
              testID="skipBtn"
              title="Skip"
              uppercase={false}
              type="solid"
              color="#4E46F1"
              style={form.skipButton}
              onPress={() => {
                SkipAadhaar();
              }}
            />
          </View>
        </KeyboardAvoidingWrapper>
      </SafeAreaView>
    </>
  );
}

export default AadhaarForm;

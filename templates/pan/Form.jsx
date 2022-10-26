import { useEffect, useState } from "react";
import { Linking, SafeAreaView, Text, View } from "react-native";
import { useDispatch,useSelector } from "react-redux";

import PanVerifyApi from "../../apis/pan/Verify";
import Checkbox from "../../components/atoms/Checkbox";
import FormInput from "../../components/atoms/FormInput";
import InfoCard from "../../components/atoms/InfoCard";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { addNumber } from "../../store/slices/panSlice";
import { bankform, form, styles } from "../../styles";

const PanFormTemplate = ({route}) => {
  const dispatch = useDispatch();

  const [consent, setConsent] = useState(false);
  const [validNumber, setValidNumber] = useState(true);

  const panSlice = useSelector((state) => state.pan);
  const [number, setNumber] = useState(panSlice?.number);

  useEffect(() => {
    const panReg = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/gm;
    if (panReg.test(number)) {
      dispatch(addNumber(number));
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
  }, [dispatch, number]);

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <KeyboardAvoidingWrapper>
        <View>
          <FormInput
            placeholder="Enter PAN Number"
            containerStyle={{ marginVertical: 10 }}
            autoCapitalize="characters"
            value={number}
            autoFocus
            onChange={setNumber}
            maxLength={10}
          />
          {number && !validNumber ? (
            <Text style={bankform.formatmsg}>Invalid PAN Number.</Text>
          ) : null}

          <View style={form.forgotText}>
            <Text
              style={styles.termsText}
              onPress={() =>
                Linking.openURL(
                  "https://docs.google.com/document/d/19nf3qwzXcun0yTN6WH6iA5hpGKlgsg4erbHuDql0EZQ/edit"
                )
              }
            >
              Forgot PAN?
            </Text>
          </View>

          <InfoCard
            info="PAN is required to verify name and date of birth."
          />

          <Checkbox
            text="I agree with the KYC registration Terms and Conditions to verifiy my identity."
            value={consent}
            setValue={setConsent}
          />

          <PanVerifyApi
            data={{ pan_number: number, consent: "Y" }}
            style={form.nextButton}
            disabled={!validNumber || !consent}
            type={route?.params?.type || ""}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default PanFormTemplate;

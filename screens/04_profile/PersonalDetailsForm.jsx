import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addAltMobile,
  addQualification,
  addEmail,
  addMaritalStatus,
} from "../../store/slices/profileSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { bankform, form, styles } from "../../styles";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { COLORS } from "../../constants/Theme";
import TextButton from "../../components/atoms/TextButton";

export default PersonalDetailsForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [next, setNext] = useState(false);

  const panSlice = useSelector((state) => state.pan);
  const profileSlice = useSelector((state) => state.profile);
  const [maritalStatus, setMaritalStatus] = useState(
    profileSlice?.maritalStatus
  );
  const [qualification, setQualification] = useState(
    profileSlice?.qualification
  );
  const [altMobile, setAltMobile] = useState(profileSlice?.altMobile);
  const [email, setEmail] = useState(profileSlice?.email || panSlice?.email);

  useEffect(() => {
    dispatch(addCurrentScreen("PersonalDetailsForm"));
  }, []);

  useEffect(() => {
    dispatch(addMaritalStatus(maritalStatus));
  }, [maritalStatus]);

  useEffect(() => {
    dispatch(addQualification(qualification));
  }, [qualification]);

  useEffect(() => {
    dispatch(addAltMobile(altMobile));
  }, [altMobile]);

  useEffect(() => {
    dispatch(addEmail(email));
  }, [email]);

  useEffect(() => {
    if (maritalStatus && qualification) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [maritalStatus, qualification]);

  const qualifications = [
    "10th Pass",
    "12th Pass",
    "Graduate",
    "Post Graduate",
    "None of the Above",
  ];

  const maritalStatuses = ["Unmarried", "Married"];

  return (
    <>
      <AppBar
        title="Setup Profile"
        color="#4E46F1"
        leading={
          <IconButton
            icon={<Icon name="arrow-back" size={20} color="white" />}
            onPress={() => navigation.navigate("BankForm")}
          />
        }
      />
      <SafeAreaView style={styles.container}>
        <ProgressBarTop step={3} />
        <Text style={form.formHeader}>Employee basic details</Text>
        <KeyboardAvoidingWrapper>
          <View>
            <Text style={form.formLabel}>
              Select Education <Text style={bankform.asterisk}>*</Text>
            </Text>
            <Picker
              selectedValue={qualification}
              style={form.picker}
              onValueChange={(itemValue) => setQualification(itemValue)}
              prompt="Educational Qualification"
            >
              {qualifications.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
            <Text style={form.formLabel}>
              Marital Status <Text style={bankform.asterisk}>*</Text>
            </Text>
            <View style={styles.flexrow}>
              {maritalStatuses.map((item, index) => {
                return (
                  <TextButton
                    key={index}
                    label={item}
                    containerStyle={{
                      ...form.choiceButton,
                      backgroundColor:
                        maritalStatus == item ? COLORS.primary : COLORS.gray,
                    }}
                    onPress={() => setMaritalStatus(item)}
                  />
                );
              })}
            </View>
            <Text style={form.formLabel}>
              Enter your alternate mobile number
            </Text>
            <TextInput
              style={form.formTextInput}
              value={altMobile}
              onChangeText={setAltMobile}
              autoCompleteType="tel"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              required
              placeholder="XXXXXXXXXX"
            />
            <Text style={form.formLabel}>Enter your Email ID</Text>
            <TextInput
              style={form.formTextInput}
              value={email}
              onChangeText={setEmail}
              autoCompleteType="email"
              keyboardType="email-address"
              placeholder="Enter Email"
              required
            />

            <TextButton
              label={"Continue"}
              onPress={() => {
                navigation.navigate("PersonalImage");
              }}
            />

            <View style={bankform.padding}></View>
          </View>
        </KeyboardAvoidingWrapper>
      </SafeAreaView>
    </>
  );
};

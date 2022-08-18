import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addAlternatePhone,
  addEducationalQualification,
  addEmail,
  addMaritalStatus,
} from "../../store/slices/profileSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { bankform, form, styles } from "../../styles";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import { COLORS } from "../../constants/Theme";
import TextButton from "../../components/atoms/TextButton";
import KYCSteps from "../../components/molecules/KYCSteps";

export default PersonalDetailsForm = () => {
  const educationalQualifications = [
    "10th Pass",
    "12th Pass",
    "Graduate",
    "Post Graduate",
    "None of the Above",
  ];
  const maritalStatuses = ["Unmarried", "Married"];
  const [maritalStatus, setMaritalStatus] = useState(
    useSelector((state) => state.profile["maritalStatus"])
  );
  const [educationalQualification, setEducationallQualification] = useState(
    useSelector((state) => state.profile["educationalQualification"])
  );
  const [alternatePhone, setAlternatePhone] = useState(
    useSelector((state) => state.profile["alternatePhone"])
  );
  const [email, setEmail] = useState(
    useSelector((state) => state.profile["email"])
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentScreen("PersonalDetailsForm"));
  }, []);
  useEffect(() => {
    dispatch(addMaritalStatus(maritalStatus));
  }, [maritalStatus]);
  useEffect(() => {
    dispatch(addEducationalQualification(educationalQualification));
  }, [educationalQualification]);
  useEffect(() => {
    dispatch(addAlternatePhone(alternatePhone));
  }, [alternatePhone]);
  useEffect(() => {
    dispatch(addEmail(email));
  }, [email]);

  return (
    <>
      <AppBar
        title="Setup Profile"
        color={COLORS.primary}
        leading={
          <IconButton
            icon={<Icon name="arrow-back" size={20} color="white" />}
            onPress={() => navigation.navigate("BankInfoForm")}
          />
        }
      />

      <SafeAreaView style={styles.container}>
        <KYCSteps step={4} />
        <Text style={form.formHeader}>Employee basic details</Text>
        <KeyboardAvoidingWrapper>
          <View>
            <Text style={form.formLabel}>Select Education*</Text>
            <Picker
              selectedValue={educationalQualification}
              style={form.picker}
              onValueChange={(itemValue) =>
                setEducationallQualification(itemValue)
              }
              prompt="Educational Qualification"
            >
              {educationalQualifications.map((item, index) => {
                return <Picker.Item label={item} value={item} />;
              })}
            </Picker>
            <Text style={form.formLabel}>Marital Status*</Text>
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
              style={styles.textInput}
              value={alternatePhone}
              onChangeText={setAlternatePhone}
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

import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, BackHandler, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OnboardingProgressBar from "../../navigators/OnboardingProgressBar";
import {
  addAltMobile,
  addQualification,
  addEmail,
  addMotherName,
  addMaritalStatus,
} from "../../store/slices/profileSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import { KeyboardAvoidingWrapper } from "../../KeyboardAvoidingWrapper";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import FormInput from "../../components/atoms/FormInput";
import DropDownForm from "../../components/molecules/DropDownForm";
import Analytics from "appcenter-analytics";
import LogoHeaderBack from "../../components/molecules/LogoHeaderBack";
import { updateProfile } from "../../queries/onboarding/profile";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [next, setNext] = useState(false);
  const [backendPush, setBackendPush] = useState(false);

  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  const profileSlice = useSelector((state) => state.profile);
  const [maritalStatus, setMaritalStatus] = useState(
    profileSlice?.maritalStatus
  );
  const [qualification, setQualification] = useState(
    profileSlice?.qualification
  );
  const [altMobile, setAltMobile] = useState(profileSlice?.altMobile);
  const [email, setEmail] = useState(profileSlice?.email);
  const [motherName, setMotherName] = useState(profileSlice?.motherName);
  const campaignId = useSelector(
    (state) => state.campaign.onboardingCampaignId
  );

  const { mutateAsync: updateProfileMutateAsync } = updateProfile();

  useEffect(() => {
    dispatch(addCurrentScreen("ProfileForm"));
  }, []);

  useEffect(() => {
    dispatch(addMaritalStatus(maritalStatus));
  }, [maritalStatus]);

  useEffect(() => {
    dispatch(addQualification(qualification));
  }, [qualification]);

  useEffect(() => {
    dispatch(addMotherName(motherName));
  }, [motherName]);

  useEffect(() => {
    dispatch(addAltMobile(altMobile));
  }, [altMobile]);

  useEffect(() => {
    dispatch(addEmail(email));
  }, [email]);

  useEffect(() => {
    if (maritalStatus && qualification && motherName && email) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [maritalStatus, qualification, motherName, email]);

  useEffect(() => {
    console.log("ProfileForm profileSlice: ", profileSlice);
    if (backendPush) {
      updateProfileMutateAsync({
        data: {
          unipeEmployeeId: unipeEmployeeId,
          maritalStatus: maritalStatus,
          qualification: qualification,
          altMobile: altMobile,
          email: email,
          motherName: motherName,
          campaignId: campaignId,
        },
        token: token,
      });
      setBackendPush(false);
    }
  }, [backendPush]);

  const qualifications = [
    "10th Pass",
    "12th Pass",
    "Graduate",
    "Post Graduate",
    "None of the Above",
  ];

  const maritalStatuses = ["Unmarried", "Married"];

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => navigation.navigate("Welcome") },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer} accessibilityLabel="ProfileForm">
      <LogoHeaderBack leftOnPress={backAction} />

      <OnboardingProgressBar step={0} />
      <Text style={styles.headline}>Tell us about you</Text>
      <Text style={styles.subHeadline}>(अपनी जानकारी यहाँ भरें)</Text>
      <KeyboardAvoidingWrapper>
        <View>
          <DropDownForm
            accessibilityLabel="EducationDropdown"
            placeholder={"Select Education*"}
            value={qualification}
            setValue={setQualification}
            data={qualifications}
          />
          <DropDownForm
            accessibilityLabel="MaritalStatusDropdown"
            placeholder={"Select Maritial Status*"}
            value={maritalStatus}
            setValue={setMaritalStatus}
            data={maritalStatuses}
          />
          <FormInput
            accessibilityLabel="MotherNameInput"
            placeholder={"Mother's Name*"}
            value={motherName}
            onChange={setMotherName}
          />
          <FormInput
            accessibilityLabel="AltPhoneNumberInput"
            placeholder={"Your alternate mobile no."}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            value={altMobile}
            onChange={setAltMobile}
          />
          <FormInput
            accessibilityLabel="EmailAddressInput"
            placeholder={"Your email ID"}
            autoCompleteType="email"
            keyboardType="email-address"
            value={email}
            onChange={setEmail}
          />
          <PrimaryButton
            accessibilityLabel={"ProfileBtn"}
            title="Continue"
            disabled={!next}
            onPress={() => {
              setBackendPush(true);
              Analytics.trackEvent("ProfileForm|PushData|Success", {
                unipeEmployeeId: unipeEmployeeId,
              });
              navigation.navigate("AadhaarForm");
            }}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

export default ProfileForm;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Alert, BackHandler, SafeAreaView, ScrollView } from "react-native";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { styles } from "../../styles";

import { addCurrentScreen } from "../../store/slices/navigationSlice";
import AadhaarConfirmApi from "../../apis/aadhaar/Confirm";
import { COLORS } from "../../constants/Theme";
import Header from "../../components/atoms/Header";

const AadhaarConfirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarConfirm"));
  }, []);

  function handleBackButtonClick() {
    navigation.navigate("AadhaarForm")
    return true;
  }
  
  useEffect(() => {
    BackHandler.addEventListener("AadhaarConfirmBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("AadhaarConfirmBackPress", handleBackButtonClick);
    };
  }, []);

  const backAlert = () => {
    Alert.alert(
      "Do you want to go back ?",
      "If you go back your AADHAAR Verification will have to be redone. Continue if you want to edit your Aadhaar number.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("AadhaarForm") },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <Header
        title="Aadhaar Data Confirmation"
        onLeftIconPress={() => backAlert()}
      />

      <ProgressBarTop step={2} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <AadhaarConfirmApi />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AadhaarConfirm;

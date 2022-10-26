import { useEffect } from "react";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import AadhaarConfirmApi from "../../apis/aadhaar/Confirm";
import Header from "../../components/atoms/Header";
import { COLORS } from "../../constants/Theme";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";

const AadhaarConfirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarConfirm"));
  }, []);

  const backAlert = () => {
    Alert.alert(
      "Do you want to go back ?",
      "If you go back your AADHAAR Verification will have to be redone. Continue if you want to edit your Aadhaar number.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("AadhaarVerify") },
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

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Alert, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import AadhaarFormTemplate from "../../templates/aadhaar/Form";
import { styles } from "../../styles";
import Header from "../../components/atoms/Header";


const AadhaarForm = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarForm"));
  }, []);

  const backAlert = () => {
    Alert.alert(
      "Do you want to go back ?",
      "If you go back your Mobile Number Verification will have to be redone.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("ProfileForm") },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Aadhaar Verification"
        onLeftIconPress={() => backAlert()}
      />
      <ProgressBarTop step={1} />
      <AadhaarFormTemplate />
    </SafeAreaView>
  );
};

export default AadhaarForm;

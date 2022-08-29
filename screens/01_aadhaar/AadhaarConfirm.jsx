import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import ProgressBarTop from "../../components/ProgressBarTop";
import { styles } from "../../styles";
import { MaterialIcons } from "react-native-vector-icons";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import Confirm from "../../apis/aadhaar/Confirm";

function AadhaarConfirm({ navigation }) {
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("AadhaarConfirm"));
  }, []);

  const returnNull = () => null;

  const navigateToAadhaarVerify = () => navigation.navigate("AadhaarVerify");

  const backAlert = () => {
    Alert.alert(
      "Do you want to go back ?",
      "If you go back your AADHAAR Verification will have to be redone. Continue if you want to edit your Aadhaar number.",
      [
        { text: "No", onPress: returnNull, style: "cancel" },
        { text: "Yes", onPress: navigateToAadhaarVerify },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Aadhaar Data Confirmation"
        color="#4E46F1"
        leading={
          <IconButton
            testID="backIcon"
            icon={<MaterialIcons name="arrow-back" size={20} color="white" />}
            onPress={backAlert}
          />
        }
      />

      <ProgressBarTop step={1} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <Confirm />
      </ScrollView>
    </SafeAreaView>
  );
}

export default AadhaarConfirm;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import ProgressBarTop from "../../components/ProgressBarTop";
import { styles } from "../../styles";
import { MaterialIcons } from "react-native-vector-icons";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import Confirm from "../../apis/pan/Confirm";

export default PanConfirm = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentScreen("PanConfirm"));
  }, []);

  const backAlert = () => {
    Alert.alert(
      "Do you want to go back ?",
      "If you go back your PAN Verification will have to be redone. Continue if you want to edit your PAN number.",
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("PanForm") },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="PAN Confirmation"
        color="#4E46F1"
        leading={
          <IconButton
            testID="backIcon"
            icon={<MaterialIcons name="arrow-back" size={20} color="white" />}
            onPress={() => backAlert()}
          />
        }
      />

      <ProgressBarTop step={2} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <Confirm />
      </ScrollView>
    </SafeAreaView>
  );
};

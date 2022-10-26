import { useEffect } from "react";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import PanConfirmApi from "../../apis/pan/Confirm";
import Header from "../../components/atoms/Header";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";

export default PanConfirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <Header title="PAN Confirmation" onLeftIconPress={() => backAlert()} />

      <ProgressBarTop step={3} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <PanConfirmApi />
      </ScrollView>
    </SafeAreaView>
  );
};

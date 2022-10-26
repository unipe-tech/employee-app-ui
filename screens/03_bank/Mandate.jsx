import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import Header from "../../components/atoms/Header";
import ProgressBarTop from "../../navigators/ProgressBarTop";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import MandateFormTemplate from "../../templates/mandate/Form";

const Mandate = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("Mandate"));
  }, []);
  
  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <Header
        title="Mandate Confirmation"
        onLeftIconPress={() => navigation.navigate("BankForm")}
      />
      <ProgressBarTop step={5} />
      <MandateFormTemplate type="Onboarding" />
    </SafeAreaView>
  );
};

export default Mandate;

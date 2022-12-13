import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView } from "react-native";
import MandateFormTemplate from "../../../../templates/mandate/Form";
import Header from "../../../../components/atoms/Header";
import { styles } from "../../../../styles";

const Mandate = () => {
  const navigation = useNavigation();
  const backAction = () => {
    navigation.navigate("EWA_KYC");
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("mandateBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("mandateBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Mandate" onLeftIconPress={() => backAction()} />
      <MandateFormTemplate type="EWA" />
    </SafeAreaView>
  );
};

export default Mandate;

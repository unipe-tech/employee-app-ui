import React, { useEffect } from "react";
import TopTabNav from "../../navigators/TopTabNav";
import Mandate from "./Mandate";
import Aadhaar from "./Aadhaar";
import Bank from "./Bank";
import Pan from "./PAN";
import Header from "../../components/atoms/Header";
import { SafeAreaView, BackHandler } from "react-native";
import { styles } from "../../styles";

const KYCScreen = ({ navigation }) => {
  const tabs = [
    { name: "AADHAAR", component: Aadhaar },
    { name: "PAN", component: Pan },
    { name: "BANK", component: Bank },
    { name: "MANDATE", component: Mandate },
  ];
  const backAction = () => {
    navigation.navigate("HomeStack", {
      screen: "DrawerHome",
      params: {
        screen: "Account",
      },
    });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("accountKycBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("accountKycBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="KYC" onLeftIconPress={() => backAction()} />
      <TopTabNav tabs={tabs} hide={false} />
    </SafeAreaView>
  );
};

export default KYCScreen;

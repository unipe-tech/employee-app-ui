import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BackHandler, SafeAreaView } from "react-native";
import MandateFormTemplate from "../../../../templates/mandate/Form";
import Header from "../../../../components/atoms/Header";
import { getBackendData } from "../../../../services/employees/employeeServices";
import { resetMandate } from "../../../../store/slices/mandateSlice";
import { styles } from "../../../../styles";

const Mandate = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const unipeEmployeeId = useSelector((state) => state.auth?.unipeEmployeeId);
  const token = useSelector((state) => state.auth?.token);
  const mandateVerifyStatus = useSelector((state) => state.mandate.verifyStatus);

  const backAction = () => {
    navigation.navigate("EWA_KYC");
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "mandate",
        token: token,
      })
        .then((response) => {
          console.log("mandateFetch response.data", response.data);
          if (response.data.status === 200) {
            dispatch(resetMandate(response.data.body));
          }
        })
        .catch((error) => {
          console.log("mandateFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (mandateVerifyStatus === "SUCCESS") {
      navigation.navigate("EWA_AGREEMENT");
    }
  }, [mandateVerifyStatus]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Mandate"
        onLeftIconPress={() => backAction()}
        progress={60}
      />
      <MandateFormTemplate type="EWA" />
    </SafeAreaView>
  );
};

export default Mandate;

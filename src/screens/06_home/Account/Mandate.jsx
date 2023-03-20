import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useIsFocused } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../../styles";
import DetailsCard from "../../../components/molecules/DetailsCard";
import {
  addVerifyStatus,
  resetMandate,
} from "../../../store/slices/mandateSlice";
import MandateFormTemplate from "../../../templates/mandate/Form";
import { getBackendData } from "../../../services/employees/employeeServices";
import PrimaryButton from "../../../components/atoms/PrimaryButton";

const Mandate = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const token = useSelector((state) => state.auth?.token);
  const unipeEmployeeId = useSelector((state) => state.auth?.unipeEmployeeId);
  const mandateSlice = useSelector((state) => state.mandate);
  const authType = mandateSlice.data?.authType?.toUpperCase();
  const [verifyStatus, setVerifyStatus] = useState(mandateSlice?.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);

  useEffect(() => {
    if (isFocused && unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "mandate",
        token: token,
      })
        .then((response) => {
          console.log("Form mandateFetch response.data", response.data);
          if (response.data.status === 200) {
            dispatch(resetMandate(response?.data?.body));
            dispatch(addVerifyStatus(response?.data?.body?.verifyStatus));
            setVerifyStatus(response?.data?.body?.verifyStatus);
          }
        })
        .catch((error) => {
          console.log("mandateFetch error: ", error);
        });
    }
  }, [isFocused]);

  const cardData = () => {
    var res = [
      {
        subTitle: "Mandate Type",
        value: authType,
        fullWidth: true,
      },
      {
        subTitle: "Verify Status",
        value: verifyStatus,
      },
    ];
    return res;
  };

  if (authType && verifyStatus === "SUCCESS") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.container}>
          <DetailsCard data={cardData()} />
        </View>
    </SafeAreaView>
    )
  } else if (bankVerifyStatus != "SUCCESS") {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <PrimaryButton
            title="Continue to Bank Verification"
            onPress={() => {
              navigation.navigate("KYC", {
                screen: "BANK",
              });
            }}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <MandateFormTemplate type="KYC" />
      </SafeAreaView>
    );
  }
};

export default Mandate;

import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";

import CollapsibleCard from "../../components/CollapsibleCard";
import FuzzyCheck from "../../components/FuzzyCheck";
import { COLORS, FONTS } from "../../constants/Theme";
import { bankBackendPush } from "../../helpers/BackendPush";
import { addVerifyMsg, addVerifyStatus } from "../../store/slices/bankSlice";
import { bankform, form, styles } from "../../styles";

const BankConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backendPush, setBackendPush] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const data = useSelector((state) => state.bank.data);
  const verifyTimestamp = useSelector((state) => state.bank.verifyTimestamp);

  const bankSlice = useSelector((state) => state.bank);
  const [verifyMsg, setVerifyMsg] = useState(bankSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(bankSlice?.verifyStatus);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    console.log("BankConfirmApi bankSlice : ", bankSlice);
    if (backendPush) {
      bankBackendPush({
        id,
        data,
        verifyMsg,
        verifyStatus,
        verifyTimestamp,
      });
      setBackendPush(false);
    }
  }, [backendPush]);

  const cardData = () => {
    const res = [
      { subTitle: "Bank Name", value: data?.bankName },
      { subTitle: "Branch Name", value: data?.branchName },
      { subTitle: "Branch City", value: data?.branchCity },
      { subTitle: "AccountHolderName", value: data?.accountHolderName },
      { subTitle: "AccountNumber", value: data?.accountNumber },
      { subTitle: "IFSC", value: data?.ifsc },
      { subTitle: "UPI", value: data?.upi },
    ];
    return res;
  };

  return (
    <View style={styles.container}>
      <CollapsibleCard
        data={cardData()}
        title="Are these your Bank details ?"
        isClosed={false}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Button
          title="No"
          type="solid"
          uppercase={false}
          style={form.noButton}
          color={COLORS.warning}
          titleStyle={{ ...FONTS.h3, color: COLORS.warning }}
          pressableContainerStyle={{ width: "100%" }}
          contentContainerStyle={{ width: "100%", height: "100%" }}
          onPress={() => {
            setVerifyMsg("Rejected by User");
            setVerifyStatus("ERROR");
            setBackendPush(true);
            Analytics.trackEvent("Bank|Confirm|Error", {
              userId: id,
              error: "Rejected by User",
            });
            {
              props?.route?.params?.type == "KYC"
                ? navigation.navigate("KYC", {
                    screen: "BANK",
                    params: {
                      screen: "Bank Data",
                    },
                  })
                : navigation.navigate("BankForm");
            }
          }}
        />
        <FuzzyCheck name={data?.accountHolderName} step="Bank Account" />
        <Button
          title="Yes"
          type="solid"
          uppercase={false}
          style={form.yesButton}
          color={COLORS.primary}
          titleStyle={{ ...FONTS.h3, color: COLORS.primary }}
          pressableContainerStyle={{ width: "100%" }}
          contentContainerStyle={{ width: "100%", height: "100%" }}
          onPress={() => {
            setVerifyMsg("Confirmed by User");
            setVerifyStatus("SUCCESS");
            setBackendPush(true);
            Analytics.trackEvent("Bank|Confirm|Success", {
              userId: id,
            });
            {
              props?.route?.params?.type == "KYC"
                ? navigation.navigate("KYC", {
                    screen: "BANK",
                  })
                : navigation.navigate("Mandate");
            }
          }}
        />
        <View style={bankform.padding} />
      </View>
    </View>
  );
};

export default BankConfirmApi;

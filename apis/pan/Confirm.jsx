import { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";

import CollapsibleCard from "../../components/CollapsibleCard";
import FuzzyCheck from "../../components/FuzzyCheck";
import { COLORS, FONTS } from "../../constants/Theme";
import { panBackendPush } from "../../helpers/BackendPush";
import { addVerifyMsg, addVerifyStatus } from "../../store/slices/panSlice";
import { bankform, form, styles } from "../../styles";


const PanConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backendPush, setBackendPush] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const data = useSelector((state) => state.pan.data);
  const number = useSelector((state) => state.pan.number);
  const verifyTimestamp = useSelector((state) => state.pan.verifyTimestamp);

  const panSlice = useSelector((state) => state.pan);
  const [verifyMsg, setVerifyMsg] = useState(panSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(panSlice?.verifyStatus);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    console.log(backendPush);
    if (backendPush) {
      panBackendPush({
        id,
        data,
        number,
        verifyMsg,
        verifyStatus,
        verifyTimestamp,
      });
      setBackendPush(false);
    }
  }, [backendPush]);

  const cardData = () => {
    const res = [
      { subTitle: "Number", value: number },
      { subTitle: "Name", value: data?.name },
      { subTitle: "Date of Birth", value: data?.date_of_birth },
      { subTitle: "Gender", value: data?.gender },
    ];
    if (data.email) {
      res.push({ subTitle: "Email", value: data?.email });
    }
    return res;
  };

  return (
    <View style={styles.container}>
      <CollapsibleCard
        data={cardData()}
        title="Are these your PAN details ?"
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
        <FuzzyCheck name={data.name} step="PAN" />
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
            Analytics.trackEvent("Pan|Confirm|Error", {
              userId: id,
              error: "Rejected by User",
            });
            {
              props?.route?.params?.type == "KYC"
                ? navigation.navigate("KYC", {
                    screen: "PAN",
                  })
                : navigation.navigate("PanForm");
            }
          }}
        />
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
            Analytics.trackEvent("Pan|Confirm|Success", {
              userId: id,
            });
            {
              props?.route?.params?.type == "KYC"
                ? navigation.navigate("KYC", {
                    screen: "PAN",
                    params: {
                      screen: "PAN Data",
                    },
                  })
                : navigation.navigate("BankForm");
            }
          }}
        />
        <View style={bankform.padding} />
      </View>
    </View>
  );
};

export default PanConfirmApi;

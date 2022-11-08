import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { View, Image } from "react-native";
import { Button } from "@react-native-material/core";
import {
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
} from "../../store/slices/aadhaarSlice";
import { bankform, form, styles } from "../../styles";
import { aadhaarBackendPush } from "../../helpers/BackendPush";
import { COLORS, FONTS } from "../../constants/Theme";
import Analytics from "appcenter-analytics";
import CollapsibleCard from "../../components/molecules/CollapsibleCard";

const AadhaarConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backendPush, setBackendPush] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const data = useSelector((state) => state.aadhaar.data);
  const number = useSelector((state) => state.aadhaar.number);
  const verifyTimestamp = useSelector((state) => state.aadhaar.verifyTimestamp);

  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [verifyMsg, setVerifyMsg] = useState(aadhaarSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(aadhaarSlice?.verifyStatus);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    dispatch(addVerifyTimestamp(verifyTimestamp));
  }, [verifyTimestamp]);

  useEffect(() => {
    console.log("AadhaarConfirmApi aadhaarSlice: ", aadhaarSlice);
    if (backendPush) {
      aadhaarBackendPush({
        data: {
          unipeEmployeeId: unipeEmployeeId,
          data: data,
          number: number,
          verifyMsg: verifyMsg,
          verifyStatus: verifyStatus,
          verifyTimestamp: verifyTimestamp,
        },
        token: token,
      });
      setBackendPush(false);
    }
  }, [backendPush]);

  const cardData = () => {
    var res = [
      { subTitle: "Number", value: number },
      { subTitle: "Name", value: data?.name },
      { subTitle: "Date of Birth", value: data?.date_of_birth },
      { subTitle: "Gender", value: data?.gender },
      { subTitle: "Address", value: data?.address },
    ];
    return res;
  };

  return (
    <View style={styles.container}>
      <CollapsibleCard
        data={cardData()}
        title="Are these your AADHAAR details ?"
        isClosed={false}
      />

      <Image
        source={{
          uri: `data:image/jpeg;base64,${data["photo_base64"]}`,
        }}
        style={form.aadharimg}
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
            Analytics.trackEvent("Aadhaar|Confirm|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: "Rejected by User",
            });
            {
              props?.route?.params?.type == "KYC"
                ? navigation.navigate("KYC", {
                    screen: "AADHAAR",
                    params: {
                      screen: "Aadhaar Form",
                    },
                  })
                : navigation.navigate("AadhaarForm");
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
            Analytics.trackEvent("Aadhaar|Confirm|Success", {
              unipeEmployeeId: unipeEmployeeId,
            });
            {
              props?.route?.params?.type == "KYC"
                ? navigation.navigate("KYC", {
                    screen: "AADHAAR",
                  })
                : navigation.navigate("PanForm");
            }
          }}
        />
        <View style={bankform.padding}></View>
      </View>
    </View>
  );
};

export default AadhaarConfirmApi;

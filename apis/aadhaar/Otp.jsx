import { OG_API_KEY } from "@env";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  addSubmitOTPtxnId,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
} from "../../store/slices/aadhaarSlice";
import { KYC_AADHAAR_GENERATE_OTP_API_URL } from "../../services/constants";
import { aadhaarBackendPush } from "../../helpers/BackendPush";
import { resetTimer } from "../../store/slices/timerSlice";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import Analytics from "appcenter-analytics";
import { COLORS, FONTS } from "../../constants/Theme";
import { setValue } from "../../helpers/SetRefValue";

const AadhaarOtpApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const aadhaarSlice = useSelector((state) => state.aadhaar);

  const submitOTPtxnId = useRef(aadhaarSlice?.submitOTPtxnId);
  const verifyMsg = useRef(aadhaarSlice?.verifyMsg);
  const verifyStatus = useRef(aadhaarSlice?.verifyStatus);
  const verifyTimestamp = useRef(aadhaarSlice?.verifyTimestamp);

  useEffect(() => {
    dispatch(addSubmitOTPtxnId(submitOTPtxnId.current));
  }, [submitOTPtxnId]);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg.current));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus.current));
  }, [verifyStatus]);

  useEffect(() => {
    dispatch(addVerifyTimestamp(verifyTimestamp.current));
  }, [verifyTimestamp]);

  const backendPush = (props) => {
    console.log("AadhaarOtpApi props: ", props);
    console.log("AadhaarOtpApi aadhaarSlice: ", aadhaarSlice);
    setValue({ ref: verifyMsg, value: props.verifyMsg });
    setValue({ ref: verifyStatus, value: props.verifyStatus });
    setValue({ ref: verifyTimestamp, value: props.verifyTimestamp });
    aadhaarBackendPush({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        data: aadhaarSlice?.data,
        number: aadhaarSlice?.number,
        verifyMsg: props.verifyMsg,
        verifyStatus: props.verifyStatus,
        verifyTimestamp: props.verifyTimestamp,
      },
      token: token,
    });
    setLoading(false);
  };

  const goForFetch = () => {
    setLoading(true);
    if (props.isTextButton) {
      props.toggle(false); // setResend(false)
    }

    const options = {
      method: "POST",
      headers: {
        "X-Auth-Type": "API-Key",
        "X-API-Key": OG_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.data),
    };

    fetch(KYC_AADHAAR_GENERATE_OTP_API_URL, options)
      .then((response) => response.json())
      .then((responseJson) => {
        try {
          if (responseJson["status"] == "200") {
            switch (responseJson["data"]["code"]) {
              case "1001":
                setValue({
                  ref: submitOTPtxnId,
                  value: responseJson["data"]["transaction_id"],
                });
                backendPush({
                  verifyMsg: "OTP sent to User",
                  verifyStatus: "PENDING",
                  verifyTimestamp: responseJson["timestamp"],
                });
                dispatch(resetTimer());
                Analytics.trackEvent("Aadhaar|Otp|Success", {
                  unipeEmployeeId: unipeEmployeeId,
                });
                {
                  props.type == "KYC"
                    ? navigation.navigate("KYC", {
                        screen: "AADHAAR",
                        params: {
                          screen: "Verify",
                        },
                      })
                    : navigation.navigate("AadhaarVerify");
                }
                break;
              default:
                backendPush({
                  verifyMsg: responseJson["data"]["message"],
                  verifyStatus: "ERROR",
                  verifyTimestamp: verifyTimestamp,
                });
                Alert.alert("Error", responseJson["data"]["message"]);
                Analytics.trackEvent("Aadhaar|Otp|Error", {
                  unipeEmployeeId: unipeEmployeeId,
                  error: responseJson["data"]["message"],
                });
                break;
            }
          } else if (responseJson?.error?.message) {
            backendPush({
              verifyMsg: responseJson["error"]["message"],
              verifyStatus: "ERROR",
              verifyTimestamp: verifyTimestamp,
            });
            Alert.alert("Error", responseJson["error"]["message"]);
            Analytics.trackEvent("Aadhaar|Otp|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: responseJson["error"]["message"],
            });
          } else {
            backendPush({
              verifyMsg: responseJson["message"],
              verifyStatus: "ERROR",
              verifyTimestamp: verifyTimestamp,
            });
            Alert.alert("Error", responseJson["message"]);
            Analytics.trackEvent("Aadhaar|Otp|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: responseJson["message"],
            });
          }
        } catch (error) {
          backendPush({
            verifyMsg: error.toString(),
            verifyStatus: "ERROR",
            verifyTimestamp: verifyTimestamp,
          });
          Alert.alert("Error", error.toString());
          Analytics.trackEvent("Aadhaar|Otp|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.toString(),
          });
        }
      })
      .catch((error) => {
        backendPush({
          verifyMsg: error.toString(),
          verifyStatus: "ERROR",
          verifyTimestamp: verifyTimestamp,
        });
        Alert.alert("Error", error.toString());
        Analytics.trackEvent("Aadhaar|Otp|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
      });
  };
  return props.isTextButton ? (
    <Text style={{ ...FONTS.h4, color: COLORS.primary }} onPress={goForFetch}>
      {props.textButton}
    </Text>
  ) : (
    <PrimaryButton
      accessibilityLabel={"AadhaarOtpBtn"}
      title={loading ? "Verifying" : props.title || "Continue"}
      disabled={props.disabled}
      loading={loading}
      onPress={() => {
        goForFetch();
      }}
    />
  );
};

export default AadhaarOtpApi;

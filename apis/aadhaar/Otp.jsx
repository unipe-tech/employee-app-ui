import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { OG_API_KEY } from "@env";
import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";

import PrimaryButton from "../../components/PrimaryButton";
import { aadhaarBackendPush } from "../../helpers/BackendPush";
import { KYC_AADHAAR_GENERATE_OTP_API_URL } from "../../services/constants";
import {
  addSubmitOTPtxnId,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
} from "../../store/slices/aadhaarSlice";
import { resetTimer } from "../../store/slices/timerSlice";

const AadhaarOtpApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [backendPush, setBackendPush] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [submitOTPtxnId, setSubmitOTPtxnId] = useState(
    aadhaarSlice?.submitOTPtxnId
  );
  const [verifyMsg, setVerifyMsg] = useState(aadhaarSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(aadhaarSlice?.verifyStatus);
  const [verifyTimestamp, setVerifyTimestamp] = useState(
    aadhaarSlice?.verifyTimestamp
  );

  useEffect(() => {
    dispatch(addSubmitOTPtxnId(submitOTPtxnId));
  }, [submitOTPtxnId]);

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
    console.log(
      "KYC_AADHAAR_GENERATE_OTP_API_URL: ",
      KYC_AADHAAR_GENERATE_OTP_API_URL
    );
    console.log("AadhaarOtpApi aadhaarSlice: ", aadhaarSlice);
    if (backendPush) {
      aadhaarBackendPush({
        id,
        data: aadhaarSlice?.data,
        number: aadhaarSlice?.number,
        verifyMsg,
        verifyStatus,
        verifyTimestamp,
      });
      setBackendPush(false);
      setLoading(false);
    }
  }, [backendPush]);

  const goForFetch = () => {
    setLoading(true);

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
          if (responseJson.status == "200") {
            switch (responseJson.data.code) {
              case "1001":
                setSubmitOTPtxnId(responseJson.data.transaction_id);
                setVerifyMsg("OTP sent to User");
                setVerifyStatus("PENDING");
                setBackendPush(true);
                setVerifyTimestamp(responseJson.timestamp);
                dispatch(resetTimer());
                Analytics.trackEvent("Aadhaar|Otp|Success", {
                  userId: id,
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
                setVerifyMsg(responseJson.data.message);
                Analytics.trackEvent("Aadhaar|Otp|Error", {
                  userId: id,
                  error: responseJson.data.message,
                });
                setVerifyStatus("ERROR");
                setBackendPush(true);
                Alert.alert("Error", responseJson.data.message);
                break;
            }
          } else if (responseJson?.error?.message) {
            setVerifyMsg(responseJson.error.message);
            Analytics.trackEvent("Aadhaar|Otp|Error", {
              userId: id,
              error: responseJson.error.message,
            });
            setVerifyStatus("ERROR");
            setBackendPush(true);
            Alert.alert("Error", responseJson.error.message);
          } else {
            setVerifyMsg(responseJson.message);
            Analytics.trackEvent("Aadhaar|Otp|Error", {
              userId: id,
              error: responseJson.message,
            });
            setVerifyStatus("ERROR");
            setBackendPush(true);
            Alert.alert("Error", responseJson.message);
          }
        } catch (error) {
          console.log("Error: ", error);
          Analytics.trackEvent("Aadhaar|Otp|Error", {
            userId: id,
            error,
          });
          setVerifyMsg(error);
          setVerifyStatus("ERROR");
          setBackendPush(true);
          Alert.alert("Error", error);
        }
      })
      .catch((error) => {
        setVerifyMsg(error);
        setVerifyStatus("ERROR");
        setBackendPush(true);
        Analytics.trackEvent("Aadhaar|Otp|Error", {
          userId: id,
          error,
        });
        Alert.alert("Error", error);
      });
  };
  return (
    <PrimaryButton
      title={loading ? "Verifying" : props.title || "Continue"}
      disabled={loading}
      loading={loading}
      onPress={() => {
        goForFetch();
      }}
    />
  );
};

export default AadhaarOtpApi;

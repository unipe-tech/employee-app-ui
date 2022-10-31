import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  addData,
  addVerifyMsg,
  addVerifyStatus,
  addVerifyTimestamp,
} from "../../store/slices/panSlice";
import { KYC_PAN_VERIFY_API_URL } from "../../services/constants";
import { panBackendPush } from "../../helpers/BackendPush";
import PrimaryButton from "../../components/PrimaryButton";
import Analytics from "appcenter-analytics";
import { useVerifyApi } from "../../queries/Verify";

const PanVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [backendPush, setBackendPush] = useState(false);

  const [responseJson, setResponseJson] = useState({});
  const id = useSelector((state) => state.auth.id);
  const panSlice = useSelector((state) => state.pan);
  const [data, setData] = useState(panSlice?.data);
  const [verifyMsg, setVerifyMsg] = useState(panSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(panSlice?.verifyStatus);
  const [verifyTimestamp, setVerifyTimestamp] = useState(
    panSlice?.verifyTimestamp
  );

  useEffect(() => {
    dispatch(addData(data));
  }, [data]);

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
    console.log("PanVerifyApi backendPush panSlice: ", backendPush, panSlice);
    if (backendPush) {
      panBackendPush({
        id: id,
        data: data,
        number: panSlice?.number,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
      });
      setBackendPush(false);
    }
    setLoading(false);
  }, [backendPush]);

  const mutation = useVerifyApi({
    data: props.data,
    url: KYC_PAN_VERIFY_API_URL,
  });

  const goForFetch = () => {
    mutation
      .mutateAsync({
        data: props.data,
        url: KYC_PAN_VERIFY_API_URL,
      })
      .then((responseJson) => {
        try {
          if (responseJson["status"] == "200") {
            switch (responseJson["data"]["code"]) {
              case "1000":
                var names = ["first", "middle", "last"];
                responseJson["data"]["pan_data"]["name"] = names
                  .filter((k) => responseJson["data"]["pan_data"][`${k}_name`])
                  .map((k) => responseJson["data"]["pan_data"][`${k}_name`])
                  .join(" ");
                console.log("PAN fetched data: ", responseJson);
                setData(responseJson["data"]["pan_data"]);
                setVerifyMsg("To be confirmed by User");
                setVerifyStatus("PENDING");
                setVerifyTimestamp(responseJson["timestamp"]);
                setBackendPush(true);
                Analytics.trackEvent("Pan|Verify|Success", {
                  userId: id,
                });
                {
                  props.type == "KYC"
                    ? navigation.navigate("KYC", {
                        screen: "PAN",
                        params: {
                          screen: "Confirm",
                        },
                      })
                    : navigation.navigate("PanConfirm");
                }
                break;
              default:
                setVerifyMsg(responseJson["data"]["message"]);
                setVerifyStatus("ERROR");
                setBackendPush(true);
                Alert.alert("Error", responseJson["data"]["message"]);
                Analytics.trackEvent("Pan|Verify|Error", {
                  userId: id,
                  error: responseJson["data"]["message"],
                });
            }
          } else if (responseJson?.error?.message) {
            setVerifyMsg(responseJson["error"]["message"]);
            setVerifyStatus("ERROR");
            setBackendPush(true);
            Alert.alert("Error", responseJson["error"]["message"]);
            Analytics.trackEvent("Pan|Verify|Error", {
              userId: id,
              error: responseJson["error"]["message"],
            });
          } else {
            setVerifyMsg(responseJson["message"]);
            setVerifyStatus("ERROR");
            setBackendPush(true);
            Alert.alert("Error", responseJson["message"]);
            Analytics.trackEvent("Pan|Verify|Error", {
              userId: id,
              error: responseJson["message"],
            });
          }
        } catch (error) {
          console.log("Error casda: ", error.message);
          setVerifyMsg(error.message);
          setVerifyStatus("ERROR");
          setBackendPush(true);
          Alert.alert("Error", error.message);
          Analytics.trackEvent("Pan|Verify|Error", {
            userId: id,
            error: error.message,
          });
        }
        console.log("fetch response: ", response);
      })
      .catch((error) => console.log(error));

    // var responseError = queryError;

    console.log("other responseJson >>> >>>>>>>>", responseJson);
    // console.log("personal responseError", responseError);
  };

  return (
    <PrimaryButton
      title={loading ? "Verifying" : "Continue"}
      disabled={props.disabled}
      loading={loading}
      onPress={() => {
        goForFetch();
      }}
    />
  );
};

export default PanVerifyApi;

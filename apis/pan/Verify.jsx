import { OG_API_KEY } from "@env";
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
import { UseAddData,  UsePOSTVerify } from "../../queries/Verify";

const PanVerifyApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [backendPush, setBackendPush] = useState(false);

  const [responseJson, setResponseJson] = useState({})
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

  // var { status, ...query } = useQuery(["panFetch",props.data], () => {
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "X-Auth-Type": "API-Key",
  //       "X-API-Key": OG_API_KEY,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(props.data),
  //   };

  //   if (props.data.consent === "Y") {
  //     return fetch(KYC_PAN_VERIFY_API_URL, options)
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .catch((error) => {
  //         console.log("Error: ", error);
  //         setVerifyMsg(error);
  //         setVerifyStatus("ERROR");
  //         Analytics.trackEvent("Pan|Verify|Error", {
  //           userId: id,
  //           error: error.toString(),
  //         });
  //         // setBackendPush(true);
  //         Alert.alert("Error", error);
  //         return error;
  //       });
  //   }
  // });

  // var { ...query} = UsePOSTVerify({data: props.data, url: KYC_PAN_VERIFY_API_URL})
  var { mutate, isLoading, isError, isIdle, isSuccess} = UseAddData()

  useEffect(() => {
    mutate( props.data, KYC_PAN_VERIFY_API_URL).then((response) => {
      console.log(response)
      setResponseJson(response)
    }).catch(console.log)
  },[])

  const goForFetch = () => {
    
    // var responseJson = query.data;
    console.log("PAN ResponseJSON: ", responseJson)
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
      } catch (error){
        console.log("Error casda: ", error);
        setVerifyMsg(error);
        setVerifyStatus("ERROR");
        setBackendPush(true);
        Alert.alert("Error", error);
        Analytics.trackEvent("Pan|Verify|Error", {
          userId: id,
          error: error,
        });
      }
      
    }
  


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

import { OG_API_KEY } from "@env";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  addSubmitOTPtxnId,
  addVerifyMsg,
  addVerifyStatus
} from "../../store/slices/aadhaarSlice";
import ApiView from "../ApiView";
import { aadhaarBackendPush } from "../../helpers/BackendPush";
import BugSnagNotify from "../../helpers/BugSnag";

export default Otp = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [backendPush, setBackendPush] = useState(false);

  const id = useSelector((state) => state.auth.id);
  
  const aadhaarSlice = useSelector((state) => state.aadhaar);
  const [submitOTPtxnId, setSubmitOTPtxnId] = useState(aadhaarSlice?.submitOTPtxnId);
  const [verifyMsg, setVerifyMsg] = useState(aadhaarSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(aadhaarSlice?.verifyStatus);

  useEffect(() => {
    dispatch(addSubmitOTPtxnId(submitOTPtxnId));
  }, [submitOTPtxnId]);

  useEffect(() => {
    dispatch(addVerifyMsg(verifyMsg))
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addVerifyStatus(verifyStatus))
  }, [verifyStatus]);

  useEffect(() => {
    console.log(backendPush);
    console.log("verifyStatus: ", verifyStatus);
    if (backendPush) {
      aadhaarBackendPush({
        id: id,
        number: aadhaarSlice?.number,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
      });
      setBackendPush(false);
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

    fetch(props.url, options)
      .then((response) => response.json())
      .then((responseJson) => {
        try {
          if (responseJson["status"] == "200") {
            switch (responseJson["data"]["code"]) {
              case "1001":
                setSubmitOTPtxnId(responseJson["data"]["transaction_id"]);
                setVerifyMsg("OTP sent to User");
                setVerifyStatus("PENDING");
                setBackendPush(true);
                navigation.navigate("AadhaarVerify");
                break;
              default:
                BugSnagNotify({text: responseJson["data"]["message"]});
                setVerifyMsg(responseJson["data"]["message"]);
                setVerifyStatus("ERROR");
                setBackendPush(true);
                Alert.alert("Error", responseJson["data"]["message"]);
                break;
            }
          } else if (responseJson["error"]) {
            BugSnagNotify({text: responseJson["error"]["message"]});
            setVerifyMsg(responseJson["error"]["message"]);
            setVerifyStatus("ERROR");
            setBackendPush(false);
            Alert.alert("Error", responseJson["error"]["message"]);
          } else {
            BugSnagNotify({text: responseJson["message"]});
            setVerifyMsg(responseJson["message"]);
            setVerifyStatus("ERROR");
            setBackendPush(true);
            Alert.alert("Error", responseJson["message"]);
          }
        }
        catch(error) {
          BugSnagNotify({text: error});
          console.log("Error: ", error);
          setVerifyMsg(error);
          setVerifyStatus("ERROR");
          setBackendPush(true);
          Alert.alert("Error", error);
        }
      })
      .catch((error) => {
        BugSnagNotify({text: error});
        setVerifyMsg(error);
        setVerifyStatus("ERROR");
        setBackendPush(true);
        Alert.alert("Error", error);
      });
      setLoading(false);
  };

  return (
    <ApiView
      disabled={props.disabled}
      loading={loading}
      goForFetch={goForFetch}
      style={props.style}
    />
  );

};
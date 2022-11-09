import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { putBackendData } from "../../services/employees/employeeServices";
import { sendSmsVerification } from "../../services/otp/Gupshup/services";
import {
  addOnboarded,
  addToken,
  addUnipeEmployeeId
} from "../../store/slices/authSlice";
import { resetTimer } from "../../store/slices/timerSlice";
import { styles } from "../../styles";

const Otp = ({ disabled, type }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const authSlice = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [onboarded, setOnboarded] = useState(authSlice?.onboarded);
  const phoneNumber = authSlice?.phoneNumber;
  const [token, setToken] = useState(authSlice?.token);
  const [unipeEmployeeId, setUnipeEmployeeId] = useState(
    authSlice?.unipeEmployeeId
  );

  useEffect(() => {
    dispatch(addToken(token));
  }, [token]);

  useEffect(() => {
    dispatch(addOnboarded(onboarded));
  }, [onboarded]);

  useEffect(() => {
    dispatch(addUnipeEmployeeId(unipeEmployeeId));
  }, [unipeEmployeeId]);

  const SendOtp = (type) => {
    if (type === "login") {
      setLoading(true);
      dispatch(resetTimer());
      var fullPhoneNumber = `+91${phoneNumber}`;
      putBackendData({
        data: { number: fullPhoneNumber },
        xpath: "mobile",
        token: token,
      })
        .then((res) => {
          console.log("LoginScreen res.data: ", res.data);
          if (res.data.status === 200) {
            setOnboarded(res.data.body.onboarded);
            setToken(res.data.body.token);
            setUnipeEmployeeId(res.data.body.unipeEmployeeId);
            sendSmsVerification(phoneNumber)
              .then((result) => {
                console.log("sendSmsVerification result: ", result);
                if (result["response"]["status"] === "success") {
                  setLoading(false);
                  Analytics.trackEvent("LoginScreen|SendSms|Success", {
                    unipeEmployeeId: unipeEmployeeId,
                  });
                  navigation.navigate("Otp");
                } else {
                  setLoading(false);
                  Alert.alert(
                    result["response"]["status"],
                    result["response"]["details"]
                  );
                  Analytics.trackEvent("LoginScreen|SendSms|Error", {
                    unipeEmployeeId: unipeEmployeeId,
                    error: result["response"]["details"],
                  });
                }
              })
              .catch((error) => {
                console.log("sendSmsVerification result: ", error.toString());
                setLoading(false);
                Alert("Error", error.toString());
                Analytics.trackEvent("LoginScreen|SendSms|Error", {
                  unipeEmployeeId: unipeEmployeeId,
                  error: error.toString(),
                });
              });
            Analytics.trackEvent(`LoginScreen|SignIn|Success`, {
              unipeEmployeeId: res.data.body.id,
            });
          } else {
            setLoading(false);
            Alert.alert("Error", res.data["message"]);
            Analytics.trackEvent("LoginScreen|SignIn|Error", {
              phoneNumber: phoneNumber,
              error: res.data["message"],
            });
          }
        })
        .catch((error) => {
          console.log("LoginScreen res.data: ", error.toString());
          setLoading(false);
          Analytics.trackEvent("LoginScreen|SignIn|Error", {
            phoneNumber: phoneNumber,
            error: error.toString(),
          });
        });
    } else {
      sendSmsVerification(phoneNumber)
        .then((res) => {
          if (res["response"]["status"] === "success") {
            dispatch(resetTimer());
            Analytics.trackEvent("OTPScreen|SendSms|Success", {
              unipeEmployeeId: unipeEmployeeId,
            });
            Alert.alert("OTP resent successfully");
          } else {
            Analytics.trackEvent("OTPScreen|SendSms|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: res["response"]["details"],
            });
            Alert.alert(res["response"]["status"], res["response"]["details"]);
          }
        })
        .catch((error) => {
          console.log(error.toString());
          Analytics.trackEvent("OTPScreen|SendSms|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.toString(),
          });
          Alert.alert("Error", error.toString());
        });
    }
  };

  return (
    <>
      {type === "login" ? (
        <PrimaryButton
          title="Sign In"
          onPress={() => {
            SendOtp(type);
          }}
          disabled={disabled}
          loading={loading}
        />
      ) : (
        <Text
          style={styles.resendText}
          onPress={() => {
            SendOtp(type);
          }}
        >
          Resend
        </Text>
      )}
    </>
  );
};

export default Otp;

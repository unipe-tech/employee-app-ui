import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { checkVerification } from "../../services/otp/Gupshup/services";
import { resetTimer } from "../../store/slices/timerSlice";

const Verify = ({ disabled, otp }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const onboarded = useSelector((state) => state.auth.onboarded);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  const checkOtp = () => {
    checkVerification(phoneNumber, otp)
      .then((res) => {
        console.log("res: ", res);
        if (res["response"]["status"] === "success") {
          if (onboarded) {
            navigation.navigate("BackendSync", {
              destination: "HomeStack",
            });
          } else {
            navigation.navigate("BackendSync", {
              destination: "Welcome",
            });
          }
          dispatch(resetTimer());
          Analytics.trackEvent("OTPScreen|Check|Success", {
            unipeEmployeeId: unipeEmployeeId,
            error: res["response"]["details"],
          });
        } else {
          Alert.alert(res["response"]["status"], res["response"]["details"]);
          Analytics.trackEvent("OTPScreen|Check|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: res["response"]["details"],
          });
        }
      })
      .catch((error) => {
        console.log(error.toString());
        Alert.alert("Error", error.toString());
        Analytics.trackEvent("OTPScreen|Check|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
      });
  };

  return (
    <PrimaryButton
      title="Verify"
      disabled={disabled}
      onPress={() => {
        checkOtp();
      }}
    />
  );
};

export default Verify;

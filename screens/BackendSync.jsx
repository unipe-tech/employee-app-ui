import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { resetAadhaar } from "../store/slices/aadhaarSlice";
import { resetBank } from "../store/slices/bankSlice";
import { resetPan } from "../store/slices/panSlice";
import { resetProfile } from "../store/slices/profileSlice";
import { resetMandate } from "../store/slices/mandateSlice";
import { getAadhaar } from "../queries/onboarding/aadhaar";
import { getPan } from "../queries/onboarding/pan";
import { getBank } from "../queries/onboarding/bank";
import { getMandate } from "../queries/mandate/mandate";
import { getProfile } from "../queries/onboarding/profile";

const BackendSync = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  useEffect(() => {
    console.log("BackendSync unipeEmployeeId: ", unipeEmployeeId);
    navigation.navigate(props.route.params.destination);
  }, []);

  const { data: getAadhaarData, isLoading: isGetAadhaarLoading } = getAadhaar({
    unipeEmployeeId,
    token,
  });
  const { data: getPanData, isLoading: isGetPanLoading } = getPan({
    unipeEmployeeId,
    token,
  });
  const { data: getBankData, isLoading: isGetBankLoading } = getBank({
    unipeEmployeeId,
    token,
  });
  const { data: getMandateData, isLoading: isGetMandateLoading } = getMandate({
    unipeEmployeeId,
    token,
  });
  const { data: getProfileData, isLoading: isGetProfileLoading } = getProfile({
    unipeEmployeeId,
    token,
  });

  useEffect(() => {
    if (!isGetAadhaarLoading && getAadhaarData != null && unipeEmployeeId) {
      if (getAadhaarData.data.status === 200) {
        console.log("AadhaarBackendFetch: ", getAadhaarData.data);
        dispatch(resetAadhaar(getAadhaarData.data.body));
      } else {
        console.error("Error in AadhaarBackendFetch: ", getAadhaarData);
      }
    }
  }, [unipeEmployeeId, getAadhaarData, isGetAadhaarLoading]);

  useEffect(() => {
    if (!isGetPanLoading && getPanData != null && unipeEmployeeId) {
      if (getPanData.data.status === 200) {
        console.log("PanBackendFetch: ", getPanData.data);
        dispatch(resetPan(getPanData.data.body));
      } else {
        console.error("Error in PanBackendFetch: ", getPanData);
      }
    }
  }, [unipeEmployeeId, getPanData, isGetPanLoading]);

  useEffect(() => {
    if (!isGetBankLoading && getBankData != null && unipeEmployeeId) {
      if (getBankData.data.status === 200) {
        console.log("BankBackendFetch: ", getBankData.data);
        dispatch(resetBank(getBankData.data.body));
      } else {
        console.error("Error in BankBackendFetch: ", getBankData);
      }
    }
  }, [unipeEmployeeId, getBankData, isGetBankLoading]);

  useEffect(() => {
    if (!isGetMandateLoading && getMandateData != null && unipeEmployeeId) {
      if (getMandateData.data.status === 200) {
        console.log("MandateBackendFetch: ", getMandateData.data);
        dispatch(resetMandate(getMandateData.data.body));
      } else {
        console.error("Error in MandateBackendFetch: ", getMandateData);
      }
    }
  }, [unipeEmployeeId, getMandateData, isGetMandateLoading]);

  useEffect(() => {
    if (!isGetProfileLoading && getProfileData != null && unipeEmployeeId) {
      if (getProfileData.data.status === 200) {
        console.log("ProfileBackendFetch: ", getProfileData.data);
        dispatch(resetProfile(getProfileData.data.body));
      } else {
        console.error("Error in ProfileBackendFetch: ", getProfileData);
      }
    }
  }, [unipeEmployeeId, getProfileData, isGetProfileLoading]);

  return (
    <Image
      source={require("../android/app/src/main/res/drawable/launch_screen.png")}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default BackendSync;

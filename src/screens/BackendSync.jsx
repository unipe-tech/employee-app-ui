import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getBackendData } from "../services/employees/employeeServices";
import { resetAadhaar } from "../store/slices/aadhaarSlice";
import { resetBank } from "../store/slices/bankSlice";
import { resetPan } from "../store/slices/panSlice";
import { resetProfile } from "../store/slices/profileSlice";
import { resetMandate } from "../store/slices/mandateSlice";
import SplashSvg from "../assets/Splash.svg";

const BackendSync = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

  useEffect(() => {
    console.log("BackendSync unipeEmployeeId: ", unipeEmployeeId);
    navigation.navigate(props.route.params.destination);
  }, []);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "aadhaar",
        token: token,
      })
        .then((response) => {
          console.log("aadhaarBackendFetch response.data", response.data);
          if (response.data.status === 200) {
            dispatch(resetAadhaar(response.data.body));
          }
        })
        .catch((error) => {
          console.log("aadhaarBackendFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "bank",
        token: token,
      })
        .then((response) => {
          console.log("bankBackendFetch response.data", response.data);
          if (response.data.status === 200) {
            dispatch(resetBank(response.data.body));
          }
        })
        .catch((error) => {
          console.log("bankBackendFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "pan",
        token: token,
      })
        .then((response) => {
          console.log("panBackendFetch response.data", response.data);
          if (response.data.status === 200) {
            dispatch(resetPan(response.data.body));
          }
        })
        .catch((error) => {
          console.log("panBackendFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "profile",
        token: token,
      })
        .then((response) => {
          console.log("profileBackendFetch response.data", response.data);
          if (response.data.status === 200) {
            dispatch(resetProfile(response.data.body));
          }
        })
        .catch((error) => {
          console.log("profileBackendFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  useEffect(() => {
    if (unipeEmployeeId) {
      getBackendData({
        params: { unipeEmployeeId: unipeEmployeeId },
        xpath: "mandate",
        token: token,
      })
        .then((response) => {
          console.log("mandateFetch response.data", response.data);
          if (response.data.status === 200) {
            dispatch(resetMandate(response.data.body));
          }
        })
        .catch((error) => {
          console.log("mandateFetch error: ", error);
        });
    }
  }, [unipeEmployeeId]);

  return (
    <SplashSvg />
  );
};

export default BackendSync;

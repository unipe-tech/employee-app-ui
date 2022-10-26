import { useEffect } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core"
import { getBackendData } from "Services/employees/employeeServices";
import { resetAadhaar } from "Store/slices/aadhaarSlice";
import { resetBank } from "Store/slices/bankSlice";
import { resetLicense } from "Store/slices/licenseSlice";
import { resetMandate } from "Store/slices/mandateSlice"
import { resetPan } from "Store/slices/panSlice";
import { resetProfile } from "Store/slices/profileSlice"

const launchScreenPng = require("../android/app/src/main/res/drawable/launch_screen.png");

const BackendSync = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const id = useSelector((state) => state.auth.id);
  

  useEffect(() => {
    navigation.navigate(route.params.destination);
  }, [navigation, route]);

  useEffect(() => {
    console.log("aadhaarBackendFetch BackendSync id: ", id);
    if (id) {
      getBackendData({ params: { id }, xpath: "aadhaar" })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetAadhaar(response.data.body));
            console.log("aadhaarBackendFetch response.data", response.data);
          }
        })
        .catch((error) => {
          console.log("aadhaarBackendFetch error: ", error);
        });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      getBackendData({ params: { id }, xpath: "bank" })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetBank(response.data.body));
            console.log("bankBackendFetch response.data", response.data);
          }
        })
        .catch((error) => {
          console.log("bankBackendFetch error: ", error);
        });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      getBackendData({ params: { id }, xpath: "pan" })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetPan(response.data.body));
            console.log("panBackendFetch response.data", response.data);
          }
        })
        .catch((error) => {
          console.log("panBackendFetch error: ", error);
        });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      getBackendData({ params: { id }, xpath: "profile" })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetProfile(response.data.body));
            console.log("profileBackendFetch response.data", response.data);
          }
        })
        .catch((error) => {
          console.log("profileBackendFetch error: ", error);
        });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      getBackendData({ params: { id }, xpath: "driving-license" })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetLicense(response.data.body));
            console.log("licenseBackendFetch response.data", response.data);
          }
        })
        .catch((error) => {
          console.log("licenseBackendFetch error: ", error);
        });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      getBackendData({ params: { unipeEmployeeId: id }, xpath: "mandate" })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(resetMandate(response.data.body));
            console.log("mandateFetch response.data", response.data);
          }
        })
        .catch((error) => {
          console.log("mandateFetch error: ", error);
        });
    }
  }, [dispatch, id]);

  return (
    <Image
      source={launchScreenPng}
    />
  );
}

export default BackendSync
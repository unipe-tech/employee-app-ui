import { OG_API_KEY } from "@env";
import CheckBox from "@react-native-community/checkbox";
import { AppBar, Button, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import ProgressBarTop from "../../components/ProgressBarTop";
import { GenerateDocument } from "../../helpers/GenerateDocument";
import { putAadhaarData } from "../../services/employees/employeeServices";
import { bankform, Camera, checkBox, form, styles } from "../styles";

import { useDispatch, useSelector } from "react-redux";
import {
  addAadhaarNumber,
  addAadhaarOCRData,
  addAadhaarSubmitOTPtxnId,
  addAadhaarVerifyStatus,
  setAadhaarPlaceholderImage,
} from "../../store/slices/aadhaarSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";

export default AadhaarForm = () => {
  const aadhaarFront = useSelector((state) => state.aadhaar.frontImg);
  const aadhaarBack = useSelector((state) => state.aadhaar.backImg);
  const id = useSelector((state) => state.auth.userId);
  const [consent, setConsent] = useState(false);
  const [aadhaar, setAadhaar] = useState(
    useSelector((state) => state.aadhaar.number)
  );
  const navigation = useNavigation();
  const [next, setNext] = useState(false);
  const [transactionId, setTransactionId] = useState(
    useSelector((state) => state.aadhaar.submitOTPtxnId)
  );
  const dispatch = useDispatch();
  const [frontAadhaarData, setFrontAadhaarData] = useState(
    useSelector((state) => state.aadhaar.frontData)
  );
  const [backAadhaarData, setBackAadhaarData] = useState(
    useSelector((state) => state.aadhaar.backData)
  );
  const [aadhaarFrontVerified, setAadhaarFrontVerified] = useState(false);
  const [aadhaarBackVerified, setAadhaarBackVerified] = useState(false);
  const [aadhaarLinked, setAadhaarLinked] = useState(true);

  useEffect(() => {dispatch(addCurrentScreen("AadhaarForm"))}, []);
  useEffect(() => {
    dispatch(addAadhaarSubmitOTPtxnId(transactionId));
  }, [transactionId]);

  useEffect(() => {
    dispatch(addAadhaarOCRData({ data: frontAadhaarData, type: "AADHAAR_FRONT" }));
  }, [frontAadhaarData]);

  useEffect(() => {
    dispatch(addAadhaarNumber(aadhaar));
  }, [aadhaar]);

  useEffect(() => {
    dispatch(addAadhaarOCRData({ data: backAadhaarData, type: "AADHAAR_BACK" }));
  }, [backAadhaarData]);

  useEffect(() => {
    if (aadhaar.length === 12) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [aadhaar]);

  const AadharPush = () => {
    var aadhaarPayload = GenerateDocument({
      src: "AadhaarOCR",
      id: id,
      frontAadhaarData: frontAadhaarData,
      backAadhaarData: backAadhaarData,
    });
    putAadhaarData(aadhaarPayload)
      .then((res) => {
        console.log(aadhaarPayload);
        console.log(res.data);
        Alert.alert("Message", res.data["message"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GenerateOtp = () => {
    const data = {
      aadhaar_number: aadhaar,
      consent: "Y",
    };
    const options = {
      method: "POST",
      headers: {
        "X-Auth-Type": "API-Key",
        "X-API-Key": OG_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`https://api.gridlines.io/aadhaar-api/boson/generate-otp`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        {
          if (response["status"] == "200") {
            switch (response["data"]["code"]) {
              case "1001":
                setTransactionId(response["data"]["transaction_id"]);
                navigation.navigate("AadhaarVerify");
                break;

              case "1011":
              case "1008":
                setAadhaarLinked(false);
                break;

              case "1012":
                Alert.alert("Error", response["data"]["message"]);
                break;
            }
          } else {
            Alert.alert("Error", response["error"]["message"]);
          }
        }
      })
      .catch((err) => Alert.alert("Error", err));
  };

  const AadhaarOCR = (type) => {
    const base64data = {
      consent: "Y",
      base64_data: type === "front" ? aadhaarFront : aadhaarBack,
    };
    const options = {
      method: "POST",
      headers: {
        "X-Auth-Type": "API-Key",
        "X-API-Key": OG_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(base64data),
    };

    fetch(`https://api.gridlines.io/aadhaar-api/ocr`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response["data"]["ocr_data"]);
        {
          response["data"]["ocr_data"] ? (
            <>
              {" "}
              {type === "front"
                ? setAadhaarFrontVerified(true)
                : setAadhaarBackVerified(true)}
            </>
          ) : null;
        }
        {
          type === "front"
            ? setFrontAadhaarData(response["data"]["ocr_data"]["document"])
            : setBackAadhaarData(response["data"]["ocr_data"]["document"]);
        }
      })
      .catch((err) => console.error(err));
  };

  const VerifyAadharOCR = () => {
    AadhaarOCR("front");
    AadhaarOCR();
    setTimeout(() => {
      !aadhaarBackVerified
        ? alert(
            `The Image captured is not verified please capture the image again for Aadhaar Back to get it verified.`
          )
        : null;
      !aadhaarFrontVerified
        ? alert(
            `The Image captured is not verified please capture the image again for Aadhaar Front to get it verified.`
          )
        : null;
      aadhaarBackVerified && aadhaarFrontVerified ? (
        <>
          {alert("Aadhar Verified through OCR.")}
          {navigation.navigate("PanCardInfo")}
          {dispatch(addAadhaarVerifyStatus({type:"OCR", status: "SUCCESS"}))}
          {AadharPush()}
        </>
      ) : null;
    }, 1000);
  };

  const backAlert = () =>
    Alert.alert(
      "Heading Back?",
      "If you continue to go back your OTP authentication would be invalid and you would have to redo it!",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.goBack() },
      ]
    );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="Setup Profile"
          color="#4E46F1"
          leading={
            <IconButton
              icon={<Icon name="arrow-back" size={20} color="white" />}
              onPress={() => {
                backAlert();
              }}
            />
          }
        />
        <ProgressBarTop step={1} />
        <Text style={form.formHeader}>
          Let's begin with your background verification processs with eKYC
        </Text>
        <ScrollView keyboardShouldPersistTaps="handled">
          {aadhaarLinked ? (
            <>
              {aadhaar ? (
                <Text style={form.formLabel}>
                  Enter 12 Digit Aadhaar Number
                </Text>
              ) : null}
              <TextInput
                style={form.formTextInput}
                value={aadhaar}
                onChangeText={setAadhaar}
                placeholder="Enter 12 Digit Aadhaar Number"
                maxLength={12}
                numeric
              />
              <View style={bankform.infoCard}>
                <Text style={bankform.infoText}>
                  <Icon name="info-outline" size={20} color="#4E46F1" />
                  My Mobile number is linked to my Aadhar card & I can receive
                  the OTP on my Aadhar Linked Mobile Number
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <CheckBox
                  value={consent}
                  onValueChange={setConsent}
                  style={checkBox.checkBox}
                  tintColors={{ true: "#4E46F1" }}
                />
                <Text style={checkBox.checkBoxText}>
                  I agree with the KYC registration Terms and Conditions to
                  verifiy my identity.
                </Text>
              </View>
              <Button
                style={form.AadharLinkedStatus}
                onPress={() => {
                  setAadhaarLinked(false);
                }}
                uppercase={false}
                title="My Mobile number is not linked to my Aadhar card"
              />
              {next && consent ? (
                <Button
                  uppercase={false}
                  title="Continue"
                  type="solid"
                  color="#4E46F1"
                  style={form.nextButton}
                  onPress={() => {
                    GenerateOtp();
                  }}
                />
              ) : (
                <Button
                  title="Continue"
                  uppercase={false}
                  type="solid"
                  style={form.nextButton}
                  disabled
                />
              )}
            </>
          ) : (
            <>
              <Text style={form.formLabel}>Upload Aadhar Front Photo</Text>
              {aadhaarFront ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${aadhaarFront}` }}
                  style={Camera.previewImage}
                />
              ) : null}
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  icon={<Icon name="camera-alt" size={20} color="black" />}
                  style={Camera.cameraButton}
                  onPress={() => {
                    navigation.navigate("ExpoIdCapture", {
                      type: "AADHAAR_FRONT",
                      front: false,
                      routeName: "AadhaarForm",
                    })
                  }}
                />
                <IconButton
                  icon={<Icon name="delete" size={20} color="black" />}
                  style={Camera.cameraButton}
                  onPress={() => {
                    dispatch(
                      setAadhaarPlaceholderImage({
                        type: "AADHAAR_FRONT",
                      })
                    );
                  }}
                />
              </View>
              <Text style={form.formLabel}>Upload Aadhar Back Photo</Text>
              {aadhaarBack ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${aadhaarBack}` }}
                  style={Camera.previewImage}
                />
              ) : null}
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  icon={<Icon name="camera-alt" size={20} color="black" />}
                  style={Camera.cameraButton}
                  onPress={() => {
                    navigation.navigate("IDCapture", {type: "AADHAAR_BACK"});
                  }}
                />
                <IconButton
                  icon={<Icon name="delete" size={20} color="black" />}
                  style={Camera.cameraButton}
                  onPress={() => {
                    dispatch(
                      setAadhaarPlaceholderImage({
                        type: "AADHAAR_BACK",
                      })
                    );
                  }}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <CheckBox
                  value={consent}
                  onValueChange={setConsent}
                  style={checkBox.checkBox}
                  tintColors={{ true: "#4E46F1" }}
                />
                <Text style={checkBox.checkBoxText}>
                  I agree with the KYC registration Terms and Conditions to
                  verifiy my identity.
                </Text>
              </View>
              <Button
                style={form.AadharLinkedStatus}
                onPress={() => {
                  setAadhaarLinked(true);
                }}
                uppercase={false}
                title="My Mobile number is linked to my Aadhar card."
              />
              {aadhaarFront && aadhaarBack && consent ? (
                <Button
                  uppercase={false}
                  title="Continue"
                  type="solid"
                  color="#4E46F1"
                  style={form.nextButton}
                  onPress={() => {
                    VerifyAadharOCR();
                  }}
                />
              ) : (
                <Button
                  title="Continue"
                  uppercase={false}
                  type="solid"
                  style={form.nextButton}
                  disabled
                />
              )}
            </>
          )}
          <View style={checkBox.padding}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
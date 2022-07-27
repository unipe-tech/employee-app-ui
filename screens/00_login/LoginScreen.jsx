import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SmsRetriever from "react-native-sms-retriever";

import { GenerateDocument } from "../../helpers/GenerateDocument";
import { putMobileData } from "../../services/employees/employeeServices";
import { sendSmsVerification } from "../../services/otp/Twilio/verify";
import { addId, addPhoneNumber } from "../../store/slices/authSlice";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { styles } from "../../styles";
import { useTranslation } from "react-i18next";

export default LoginScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState(
    useSelector((state) => state.auth.phoneNumber)
  );
  const [next, setNext] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);
  var phn = "";
  useEffect(() => {
    dispatch(addCurrentScreen("Login"));
  }, []);

  const onPhoneNumberPressed = async () => {
    try {
      phn = await SmsRetriever.requestPhoneNumber();
      setPhoneNumber(phn.replace("+91", ""));
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  // const signIn = () => {
  //   Auth.signIn(phoneNumber)
  //     .then((result) => {
  //       setSession(result);
  //       console.log(result);
  //       navigation.navigate("Otp");
  //     })
  //     .catch((e) => {
  //       if (e.code === 'UserNotFoundException') {
  //         signUp();
  //         console.log('User not found');
  //       } else if (e.code === 'UsernameExistsException') {
  //         signIn();
  //         console.log('User already exists');
  //       } else {
  //         console.log(e.code);
  //         console.error(e);
  //       }
  //     });
  // };
  // const signUp = async () => {
  //   const result = await Auth.signUp({
  //     username: phoneNumber,
  //     password,
  //     attributes: {
  //       phone_number: phoneNumber,
  //     },
  //   }).then(() => signIn());
  //   return result;
  // };
  // useEffect(() => {
  //   dispatch({
  //     type: "SET_SESSION",
  //     payload: session,
  //   })}, [session]);

  const signIn = () => {
    var fullPhoneNumber = `+91${phoneNumber}`;
    sendSmsVerification(fullPhoneNumber)
      .then((sent) => {
        console.log("Sent!");
        setIsLoading(true);
        var phonePayload = GenerateDocument({
          src: "otp",
          number: fullPhoneNumber,
        });
        putMobileData(phonePayload)
          .then((res) => {
            console.log(phonePayload);
            console.log(res.data);
            if (res.data["message"]) {
              Alert.alert("Error", res.data["message"]);
            } else {
              setId(res.data["id"]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        navigation.navigate("Otp");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(addId(id));
  }, [id]);

  useEffect(() => {
    dispatch(addPhoneNumber(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    var phoneno = /^[0-9]{10}$/gm;
    if (phoneno.test(phoneNumber) && phoneNumber.length === 10) {
      setNext(true);
      console.log("true");
    } else {
      setNext(false);
      console.log("false");
    }
  }, [phoneNumber]);

  useEffect(() => {
    onPhoneNumberPressed();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Image
          style={styles.logo}
          source={require("../../assets/unipe-Thumbnail.png")}
        />
        <Text style={styles.headline}>{t("login_heading")}</Text>
        <Text style={styles.fieldLabel}>Mobile Number</Text>
        <TextInput
          style={styles.textInput}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          maxLength={13}
          placeholder="9999999999"
        />
        <Text style={styles.dataUseText}>
          {t("terms_of_service_login_01")}{" "}
          <Text
            onPress={() =>
              Linking.openURL("https://policies.google.com/terms?hl=en-US")
            }
            style={styles.termsText}
          >
            {t("terms_of_service")}
          </Text>{" "}
          &{" "}
          <Text
            onPress={() =>
              Linking.openURL("https://policies.google.com/privacy?hl=en-US")
            }
            style={styles.termsText}
          >
            {t("privacy_policy")}
          </Text>
        </Text>
        {!isLoading ? (
          <>
            {next ? (
              <Button
                uppercase={false}
                title={t("continue")}
                type="solid"
                style={styles.ContinueButton}
                color="#4E46F1"
                onPress={() => signIn()}
              />
            ) : (
              <Button
                uppercase={false}
                title={t("continue")}
                type="solid"
                style={styles.ContinueButton}
                disabled
              />
            )}
          </>
        ) : (
          <TouchableOpacity>
            <View style={styles.LoadingButton}>
              <ActivityIndicator size="large" color="white" />
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

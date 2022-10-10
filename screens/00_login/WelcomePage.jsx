import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/PrimaryButton";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { checkBox, stepIndicatorStyles, styles, welcome } from "../../styles";
import SmsAndroid from "react-native-get-sms-android";
import { SMS_API_URL } from "../../services/employees/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";
import EndlessService from "react-native-endless-background-service-without-notification";
import SVGImg from "../../assets/UnipeLogo.svg";

export default WelcomePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const id = useSelector((state) => state.auth.id);
  let permissionGranted;

  const askPermission = async () => {
    permissionGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.SEND_SMS
    );
  };

  useEffect(async () => {
    dispatch(addCurrentScreen("Welcome"));
    AsyncStorage.setItem("smsdate", "0");
    askPermission();
  }, []);

  const btnOnPress = async () => {
    if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("id: ", id);
      await fetch(`${SMS_API_URL}?id=${id.toString()}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then(async (result) => {
          console.log(result?.body?.lastReceivedDate);
          if (result.body) {
            console.log("result body: ", result.body);
            await AsyncStorage.setItem(
              "smsdate",
              result?.body?.lastReceivedDate.toString()
            );
          } else {
            await AsyncStorage.getItem("smsDate");
          }
          console.log("Existing Employee Data", result);
        })
        .then(async () => {
          const lastReceivedSMSDate =
            (await AsyncStorage.getItem("smsdate")) || 0;
          const parsedSMSDate = parseInt(lastReceivedSMSDate);
          var filter = {
            box: "inbox",
            minDate: parsedSMSDate + 1,
          };

          await SmsAndroid.list(
            JSON.stringify(filter),
            (fail) => {
              console.log("Failed with this error: " + fail);
            },
            async (count, smsList) => {
              console.log(JSON.stringify(smsList[count - 1]));
              var parsedSmsList = JSON.parse(smsList);
              var newSMSArray = [];

              for (var i = 0; i < count; i++) {
                newSMSArray.push({
                  _id: parsedSmsList[i]._id,
                  address: parsedSmsList[i].address,
                  date_received: parsedSmsList[i].date,
                  date_sent: parsedSmsList[i].date_sent,
                  body: parsedSmsList[i].body,
                  seen: parsedSmsList[i].seen,
                });
              }

              await fetch(SMS_API_URL, {
                method: "POST",
                body: JSON.stringify({
                  texts: JSON.stringify(newSMSArray),
                  employeeId: id,
                  lastReceivedDate: parsedSmsList[0]?.date,
                  count: count,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then(() => {
                  AsyncStorage.setItem(
                    "smsdate",
                    parsedSmsList[0]?.date.toString()
                  );
                  EndlessService.startService(60);
                  navigation.navigate("AadhaarForm");
                })
                .catch(console.log);
              console.log(JSON.stringify(smsList[0]));
              var arr = JSON.parse(smsList);
            }
          );
        });
    } else {
      console.log("Camera permission denied");
      Alert.alert(
        "SMS Permission Required",
        `We need you to provide SMS Permission to track your salary messages \n\nFor enabling SMS Permission now,\nStep 1: Click Yes\nStep 2: Go to Permissions Tab\nStep 3: Look for SMS in not allowed section\nStep 4: Click on SMS and Allow\nStep 5: Close the app and reopen `,
        [
          { text: "No", onPress: () => null, style: "cancel" },
          { text: "Yes", onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  SplashScreen.hide();
  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: "feed",
      color: stepStatus === "finished" ? "#ffffff" : "#4E46F1",
      size: 15,
    };
    switch (position) {
      case 0: {
        iconConfig.name = "perm-identity";
        break;
      }
      case 1: {
        iconConfig.name = "mood";
        break;
      }
      case 2: {
        iconConfig.name = "payment";
        break;
      }
      case 3: {
        iconConfig.name = "library-add-check";
        break;
      }
      case 4: {
        iconConfig.name = "info-outline";
        break;
      }
      case 5: {
        iconConfig.name = "camera-front";
        break;
      }
      default: {
        break;
      }
    }
    return iconConfig;
  };

  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );

  const data = [
    "Aadhaar Card",
    "PAN Card",
    "Bank Account",
    "Mandate",
    "Profile",
    "Photo",
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SVGImg style={styles.logo} />
        <Text style={welcome.subTitle}>
          Let’s start onboarding process by {"\n"} verifying below documents.
        </Text>
        <View style={welcome.steps}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={6}
            direction="vertical"
            renderStepIndicator={renderStepIndicator}
            currentPosition={0}
            labels={data}
          />
        </View>
        <PrimaryButton
          title="Welcome!"
          color="#2CB77C"
          uppercase={false}
          onPress={() => {
            btnOnPress();
          }}
        />
        <View style={checkBox.padding}></View>
      </SafeAreaView>
    </>
  );
};

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../components/PrimaryButton";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { checkBox, stepIndicatorStyles, styles, welcome } from "../../styles";
import Loading from "../../components/Loading";
import SmsAndroid from "react-native-get-sms-android";
import { store } from "../../store/store";
import { addLastReceivedDate } from "../../store/slices/smsSlice";
import { SMS_API_URL } from "../../services/employees/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";

export default WelcomePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const id = useSelector((state) => state.auth.id);

  useEffect(() => {
    dispatch(addCurrentScreen("Welcome"));
  }, []);

  const btnOnPress = async () => {
    console.log("id: ", id);
    await fetch(`${SMS_API_URL}?id=${id}`, {
      method: "GET",
    })
      // await fetch(`${SMS_API_URL}?id=123412341234123412341234`, {
      //   method: "GET",
      // })
      .then((res) => res.json())
      .then(async (result) => {
        console.log(result?.body?.lastReceivedDate);
        if (result.body) {
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
        const lastReceivedSMSDate = await AsyncStorage.getItem("smsdate");
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
                // store.dispatch(
                //   addLastReceivedDate(parsedSmsList[0].date || "No Data for Date")
                // );
                navigation.navigate("AadhaarForm");
              })
              .catch(console.log);
            console.log(JSON.stringify(smsList[0]));
            var arr = JSON.parse(smsList);
          }
        );
      });
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
        iconConfig.name = "smartphone";
        break;
      }
      case 1: {
        iconConfig.name = "perm-identity";
        break;
      }
      case 2: {
        iconConfig.name = "mood";
        break;
      }
      case 3: {
        iconConfig.name = "payment";
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

  const data = ["Aadhaar Card", "PAN Card", "Bank Account", "Profile", "Photo"];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/unipe-Thumbnail.png")}
        />
        <Text style={welcome.subTitle}>
          Let’s start onboarding process by {"\n"} verifying below documents.
        </Text>
        <View style={welcome.steps}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={5}
            direction="vertical"
            renderStepIndicator={renderStepIndicator}
            currentPosition={0}
            labels={data}
          />
        </View>
        <PrimaryButton
          title="Welcome!"
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

import {
  View,
  Text,
  SafeAreaView,
  Alert,
  BackHandler,
  PermissionsAndroid,
  Linking,
} from "react-native";
import { styles } from "../../styles";
import LogoHeader from "../../components/atoms/LogoHeader";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, FONTS } from "../../constants/Theme";
import Analytics from "appcenter-analytics";
import { requestUserPermission } from "../../services/notifications/notificationService";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import Success from "../../assets/congratulations.svg";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import SmsAndroid from "react-native-get-sms-android";
import { SMS_API_URL } from "../../services/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EndlessService from "react-native-endless-background-service-without-notification";

const WelcomePage = () => {
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  console.log("token: ", token);

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

  const btnOnPress = async (token) => {
    if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("id: ", unipeEmployeeId);
      await fetch(`${SMS_API_URL}?id=${unipeEmployeeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
              console.log("MESSAGES: ", smsList);
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
                  unipeEmployeeId: unipeEmployeeId,
                  lastReceivedDate: parsedSmsList[0]?.date,
                  count: count,
                }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
                .then(() => {
                  AsyncStorage.setItem(
                    "smsdate",
                    parsedSmsList[0]?.date.toString()
                  );
                  EndlessService.startService(10);
                  navigation.navigate("ProfileForm");
                })
                .catch((e) => console.log("Error Occured in SMS: ", e));
            }
          );
        })
        .catch((e) =>
          console.log("Some error occured while fetching sms: ", e)
        );
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

  useEffect(() => {
    dispatch(addCurrentScreen("Welcome"));
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to Logout?", [
      { text: "No", onPress: () => null, style: "cancel" },
      { text: "Yes", onPress: () => navigation.navigate("Login") },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView accessibilityLabel="WelcomePage" style={styles.safeContainer}>
      <LogoHeader
        rightIcon={
          <Icon name="help-circle-outline" size={28} color={COLORS.primary} />
        }
      />

      <View style={styles.container}>
        <Success style={{ alignSelf: "center", width: "70%" }} />
        <View style={{ flex: 1 }} />

        <Text
          style={[styles.subHeadline, { width: "90%", alignSelf: "center" }]}
        >
          <Text style={{ color: COLORS.warning }}>Congratulations!</Text> {"\n"}
          Your phone number verified successfully.
        </Text>
        <Text
          style={[
            styles.headline,
            {
              ...FONTS.h3,
              width: "90%",
              alignSelf: "center",
              marginBottom: 20,
            },
          ]}
        >
          As a next step please complete your eKYC to get money in your bank
          account
        </Text>
        <PrimaryButton
          title="Start eKYC"
          accessibilityLabel="WelcomeBtn"
          onPress={() => {
            requestUserPermission();
            Analytics.trackEvent("WelcomePage", {
              unipeEmployeeId: unipeEmployeeId,
            });
            btnOnPress(token);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;

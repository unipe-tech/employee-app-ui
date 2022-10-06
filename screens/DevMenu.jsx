import { View, ScrollView, PermissionsAndroid } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import DevMenuButton from "../components/DevMenuButton";
import EndlessService from "react-native-endless-background-service-without-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default DevMenu = () => {
  const navigation = useNavigation();
  const screens = [
    { title: "Welcome", name: "Welcome" },
    { title: "Login", name: "Login" },
    { title: "OTP", name: "Otp" },
    { title: "AADHAAR", name: "AadhaarForm" },
    { title: "PAN", name: "PanForm" },
    { title: "BANK", name: "BankForm" },
    { title: "Mandate", name: "Mandate" },
    { title: "Profile", name: "PersonalDetailsForm" },
    { title: "Photo", name: "PersonalImage" },
    { title: "Home", name: "Home" },
    { title: "KYC Details", name: "KYC" },
    { title: "Profile Details", name: "Profile" },
    { title: "EWA", name: "EWA_OFFER" },
  ];

  let permissionGranted;

  const askPermission = async () => {
    permissionGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.SEND_SMS
    );
  };

  useEffect(async () => {
    AsyncStorage.setItem("smsdate", "0");
    askPermission();
  }, []);

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {screens.map((screen, index) => (
          <DevMenuButton
            key={index}
            style={{ marginTop: 20 }}
            title={screen.title}
            onPress={() => navigation.navigate(screen.name)}
          />
        ))}
        <DevMenuButton
          style={{ marginTop: 20 }}
          title="Demo"
          onPress={() => {
            EndlessService.startService(15);
          }}
        />
      </View>
    </ScrollView>
  );
};

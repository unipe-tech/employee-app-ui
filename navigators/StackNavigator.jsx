import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/00_login/LoginScreen";
import OTPScreen from "../screens/00_login/OTPScreen";
import WelcomePage from "../screens/00_login/WelcomePage";
import AadhaarConfirm from "../screens/01_aadhaar/AadhaarConfirm";
import AadhaarForm from "../screens/01_aadhaar/AadhaarForm";
import AadhaarVerify from "../screens/01_aadhaar/AadhaarVerify";
import PanCardInfo from "../screens/02_pan/PanCardInfo";
import BankInformationForm from "../screens/03_bank/BankInformationForm";
import PersonalDetailsForm from "../screens/04_profile/PersonalDetailsForm";
import PersonalImage from "../screens/05_photo/PersonalImage";
import Home from "../screens/06_home/Home";
import DevMenu from "../screens/DevMenu";
import RNPhotoCapture from "../components/RNPhotoCapture";

import { STAGE } from "@env";
import KYCScreen from "../screens/07_drawer/KYCScreen";
import Profile from "../screens/07_drawer/Profile";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const initialRoute = useSelector((state) => state.navigation.currentScreen);

  console.log("STAGE: ", STAGE);
  console.log("initialRoute: ", initialRoute);

  return (
    <Stack.Navigator
      initialRouteName={STAGE === "dev" ? "DevMenu" : initialRoute}
    >
      <Stack.Screen
        name="DevMenu"
        component={DevMenu}
        options={{
          headerShown: false,
          header: null,
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Otp"
        component={OTPScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PersonalDetailsForm"
        component={PersonalDetailsForm}
        options={{
          headerShown: false,
          header: null,
        }}
      />
      <Stack.Screen
        name="AadhaarForm"
        component={AadhaarForm}
        options={{
          headerShown: false,
          header: null,
        }}
      />
      <Stack.Screen
        name="RNPhotoCapture"
        component={RNPhotoCapture}
        options={{
          headerShown: false,
          header: null,
        }}
      />
      <Stack.Screen
        name="AadhaarVerify"
        component={AadhaarVerify}
        options={{
          headerShown: false,
          header: null,
        }}
      />
      <Stack.Screen
        name="AadhaarConfirm"
        component={AadhaarConfirm}
        options={{
          headerShown: false,
          header: null,
        }}
      />
      <Stack.Screen
        name="PanCardInfo"
        component={PanCardInfo}
        options={{
          headerShown: false,
          header: null,
        }}
      />
      <Stack.Screen
        name="BankInfoForm"
        component={BankInformationForm}
        options={{
          headerShown: false,
          header: null,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          header: null,
        }}
      />
      <Stack.Screen
        name="PersonalImage"
        component={PersonalImage}
        options={{
          headerShown: false,
          header: null,
        }}
      />
      <Stack.Screen
        name="KYC"
        component={KYCScreen}
        options={{
          headerShown: true,
          headerTitle: "KYC Details",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerTitle: "Profile Details",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

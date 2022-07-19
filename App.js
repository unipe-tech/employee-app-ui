import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Provider } from "react-redux";

import LoginScreen from "./screens/00_Login/LoginScreen";
import OTPScreen from "./screens/00_Login/OTPScreen";
import WelcomePage from "./screens/00_Login/WelcomePage";
import AadhaarConfirm from "./screens/01_Aadhaar/AadhaarConfirm";
import AadhaarForm from "./screens/01_Aadhaar/AadhaarForm";
import AadhaarVerify from "./screens/01_Aadhaar/AadhaarVerify";
import PanCardInfo from "./screens/02_PanCard/PanCardInfo";
import BankInformationForm from "./screens/03_BankDetails/BankInformationForm";
import PersonalDetailsForm from "./screens/04_BasicDetails/PersonalDetailsForm";
import PersonalImage from "./screens/05_ImageCapture/PersonalImage"
import Home from "./screens/06_Home/Home";

import ExpoPhotoCapture from "./screens/utils/ExpoPhotoCapture";
import RNPhotoCapture from "./screens/utils/RNPhotoCapture";

import DevMenu from "./screens/DevMenu";
import {ENV_NAME} from "@env"

import { store } from "./store/store";
import SplashScreen from "react-native-splash-screen";
import { useSelector } from "react-redux";
import StackNavigator from "./Navigators/StackNavigator";
const Stack = createNativeStackNavigator();

export default function App() {
  SplashScreen.hide()

  return (
    <Provider store={store}>
        <SafeAreaProvider style={{ backgroundColor: "white", flex: 1 }}>
          <IconComponentProvider IconComponent={Icon}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            >
          <StackNavigator />
            </KeyboardAvoidingView>
          </IconComponentProvider>
        </SafeAreaProvider>
    </Provider>
  );
}

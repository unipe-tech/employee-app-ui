import React, { useState, useEffect } from "react"
import { KeyboardAvoidingView, Platform } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
const Stack = createNativeStackNavigator()
import LoginScreen from "./screens/00_Login/LoginScreen"
import { StateProvider } from "./StateProvider"
import reducer, { initialState } from "./reducer/reducer"
import OTPScreen from "./screens/00_Login/OTPScreen"
import { IconComponentProvider } from "@react-native-material/core"
import Icon from "react-native-vector-icons/MaterialIcons"
import PersonalDetailsForm from "./screens/04_BasicDetails/PersonalDetailsForm"
import AadhaarForm from "./screens/01_Aadhaar/AadhaarForm"
import IDCapture from "./screens/01_Aadhaar/IDCapture"
import AadhaarVerify from "./screens/01_Aadhaar/AadhaarVerify"
import AadhaarConfirm from "./screens/01_Aadhaar/AadhaarConfirm"
import PanCardInfo from "./screens/02_PanCard/PanCardInfo"
import BankInformationForm from "./screens/03_BankDetails/BankInformationForm"
import Home from "./screens/06_Home/Home"
import WelcomePage from "./screens/00_Login/WelcomePage"
import PersonalImage from "./screens/05_ImageCapture/PersonalImage"
import { Provider } from "react-redux"
import DevMenu from "./screens/DevMenu"
import Expo_IdCapture from "./screens/01_Aadhaar/Expo_IdCapture"

export default function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <NavigationContainer>
        <SafeAreaProvider style={{ backgroundColor: "white", flex: 1 }}>
          <IconComponentProvider IconComponent={Icon}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            >
              <Stack.Navigator initialRouteName="Welcome">
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
                  name="PersonalInfoForm"
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
                  name="IDCapture"
                  component={IDCapture}
                  options={{
                    headerShown: false,
                    header: null,
                  }}
                />
                <Stack.Screen
                  name="ExpoIdCapture"
                  component={Expo_IdCapture}
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
              </Stack.Navigator>
            </KeyboardAvoidingView>
          </IconComponentProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </StateProvider>
  )
}

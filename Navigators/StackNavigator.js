import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/00_Login/LoginScreen";
import OTPScreen from "../screens/00_Login/OTPScreen";
import WelcomePage from "../screens/00_Login/WelcomePage";
import AadhaarConfirm from "../screens/01_Aadhaar/AadhaarConfirm";
import AadhaarForm from "../screens/01_Aadhaar/AadhaarForm";
import AadhaarVerify from "../screens/01_Aadhaar/AadhaarVerify";
import PanCardInfo from "../screens/02_PanCard/PanCardInfo";
import BankInformationForm from "../screens/03_BankDetails/BankInformationForm";
import PersonalDetailsForm from "../screens/04_BasicDetails/PersonalDetailsForm";
import PersonalImage from "../screens/05_ImageCapture/PersonalImage"
import Home from "../screens/06_Home/Home";

import ExpoPhotoCapture from "../screens/utils/ExpoPhotoCapture";
import RNPhotoCapture from "../screens/utils/RNPhotoCapture";

import DevMenu from "../screens/DevMenu";
import {ENV_NAME} from "@env"
import { useDispatch, useSelector } from "react-redux";

const StackNavigator = () => {
    
    const Stack = createNativeStackNavigator();
    const InitialRoute = useSelector((state) => state.navigation.currentScreen)
    console.log(InitialRoute)


  return (
    <NavigationContainer>
              <Stack.Navigator initialRouteName={ENV_NAME == "Dev" ? "DevMenu" : InitialRoute}>
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
                  name="ExpoPhotoCapture"
                  component={ExpoPhotoCapture}
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
      </NavigationContainer>
  )
}

export default StackNavigator
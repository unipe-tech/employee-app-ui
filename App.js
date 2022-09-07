import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import SplashScreen from "react-native-splash-screen";

import StackNavigator from "./navigators/StackNavigator";
import { store, persistor } from "./store/store";
import BackgroundTask from "react-native-background-task";
import { listSms } from "./helpers/SMS";
import { KYC_MOCK_API_BASE_URL } from "@env";
import { PermissionsAndroid } from "react-native";

BackgroundTask.define(async () => {
  await console.log("Hello world");
  listSms();
  BackgroundTask.finish();
});

// BackgroundTask.schedule({
//   period: 3,
//   timeout: 10,
// });

export default function App() {
  async function checkStatus() {
    const status = await BackgroundTask.statusAsync();

    if (status.available) {
      // Everything's fine
      console.log("Background Task Enabled");
      return;
    }
    console.log("Background Task Disabled");
    const reason = status.unavailableReason;
    if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
      Alert.alert(
        "Denied",
        'Please enable background "Background App Refresh" for this app'
      );
    } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
      Alert.alert(
        "Restricted",
        "Background tasks are restricted on your device"
      );
    }
  }

  const askPermission = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.SEND_SMS
    );
  };

  useEffect(() => {
    askPermission();
  }, []);

  useEffect(() => {
    BackgroundTask.schedule({
      period: 900, // Aim to run every 30 mins - more conservative on battery
      timeout: 60,
    });

    // Optional: Check if the device is blocking background tasks or not
    checkStatus();
  });

  SplashScreen.hide();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <SafeAreaProvider style={{ backgroundColor: "white", flex: 1 }}>
            <IconComponentProvider IconComponent={Icon}>
              <StackNavigator />
            </IconComponentProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

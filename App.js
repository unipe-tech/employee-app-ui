import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import SplashScreen from "react-native-splash-screen";

import StackNavigator from "./navigators/StackNavigator";
import { store, persistor } from "./store/store";
// import BackgroundTask from "react-native-background-task";
import { listSms } from "./helpers/SMS";
import { KYC_MOCK_API_BASE_URL } from "@env";
import { PermissionsAndroid } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
let setStateFn = () => {
  console.log("State not yet initialized");
};
function myTask() {
  try {
    // fetch data here...
    const backendData = "Simulated fetch ";
    console.log("myTask() running");
    // setStateFn(backendData);
    listSms();
    return backendData ? "data fetched" : "empty data";
  } catch (err) {
    console.log(err);
    return err;
  }
}
async function initBackgroundFetch(taskName, taskFn, interval) {
  try {
    if (!TaskManager.isTaskDefined(taskName)) {
      TaskManager.defineTask(taskName, taskFn);
    }
    const options = {
      minimumInterval: interval, // in seconds
    };
    await BackgroundFetch.registerTaskAsync(taskName, options);
    console.log("Background Task Registered!");
  } catch (err) {
    console.log("registerTaskAsync() failed:", err);
  }
}

initBackgroundFetch("smsFetch", myTask, 5);

export default function App() {
  const [state, setState] = useState(null);
  setStateFn = setState;

  const askPermission = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.SEND_SMS
    );
  };

  useEffect(() => {
    askPermission();
  }, []);

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

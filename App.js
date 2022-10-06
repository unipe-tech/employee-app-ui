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
import { listSms } from "./helpers/SMS";
import { PermissionsAndroid } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import codePush from "react-native-code-push";
import Crashes from "appcenter-crashes";
import Analytics from "appcenter-analytics";

Crashes.setListener({
  shouldProcess: function (report) {
    return true; // return true if the crash report should be processed, otherwise false.
  },
});
Analytics.startSession();
let codePushOptions = {
  deploymentKey: "NVWL2F2UKSif5SJWBOWtkSyPC3aRIYXM_adgy",
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE, //InstallMode.ON_NEXT_RESUME to have minimum background duration effect
};

function SMSTask() {
  try {
    // fetch data here...
    const backendData = "Simulated fetch ";
    console.log("SMSTask() running");
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
    await BackgroundFetch.registerTaskAsync(taskName, {
      minimumInterval: interval, // in seconds
      startOnBoot: true,
      stopOnTerminate: false,
    });
    console.log("Background Task Registered!");
  } catch (err) {
    console.log("registerTaskAsync() failed:", err);
  }
}

initBackgroundFetch("smsFetch", SMSTask, 1);

function App() {
  // const askPermission = async () => {
  //   await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.READ_SMS,
  //     PermissionsAndroid.PERMISSIONS.SEND_SMS
  //   );
  // };

  // useEffect(() => {
  //   askPermission();
  // }, []);

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

export default codePush(codePushOptions)(App);

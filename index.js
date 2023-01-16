import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

import App from "./App";
import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";

import { AppRegistry } from "react-native";
import { listSms } from "./services/sms/sms-background";

AppRegistry.registerHeadlessTask("EBSWN", () => listSms);

PushNotification.configure({
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },
  requestPermissions: Platform.OS === "ios",
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Recieved in Background", remoteMessage);
});
registerRootComponent(App);

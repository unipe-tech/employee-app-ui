import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

import App from "./App";
import EndlessService from "react-native-endless-background-service-without-notification";
import { AppRegistry } from "react-native";
import { listSms } from "./helpers/SMS";

AppRegistry.registerHeadlessTask("EBSWN", () => listSms);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

import codePush from "react-native-code-push"
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Provider } from "react-redux";
import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import Crashes from "appcenter-crashes";
import { PersistGate } from "redux-persist/integration/react";

import StackNavigator from "./navigators/StackNavigator";
import { persistor,store } from "./store/store";

Crashes.setListener({
  shouldProcess () {
    return true; // return true if the crash report should be processed, otherwise false.
  },
});
const codePushOptions = {
  deploymentKey: "djFugZgAXYEhRWZ_kKmXFQulkJSDB9Wegnb5M",
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE, // InstallMode.ON_NEXT_RESUME to have minimum background duration effect
};

function App() {
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

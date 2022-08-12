import { IconComponentProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import SplashScreen from "react-native-splash-screen";

import StackNavigator from "./navigators/StackNavigator";
import { store, persistor } from "./store/store";
import Bugsnag from "@bugsnag/react-native";
import { Text, View } from "react-native";
Bugsnag.start();
const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

const ErrorView = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Inform users of an error in the component tree.</Text>
  </View>
);

export default function App() {
  SplashScreen.hide();
  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
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
    </ErrorBoundary>
  );
}

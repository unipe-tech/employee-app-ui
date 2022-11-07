import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { STAGE } from "@env";
import { useSelector } from "react-redux";

import DrawerNavigator from "../DrawerNavigator";
import KYCScreen from "../../screens/07_drawer/KYCScreen";
import Profile from "../../screens/07_drawer/Profile";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  var initialRoute = useSelector((state) => state.navigation.currentScreen);
  
  STAGE === "dev" ? (initialRoute = "DevMenu") : null;
  console.log("HomeStack initialRoute: ", initialRoute);
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          header: null,
        }}
      />
      <Stack.Screen
        name="KYC"
        component={KYCScreen}
        options={{
          headerShown: true,
          headerTitle: "KYC Details",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerTitle: "Profile Details",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

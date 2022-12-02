import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DevMenu from "../screens/DevMenu";

import { STAGE } from "@env";
import OfflineAlert from "../components/organisms/OfflineAlert";
import OnboardingStack from "./stacks/OnboardingStack";
import EWAStack from "./stacks/EWAStack";
import DocumentStack from "./stacks/DocumentStack";
import BenefitsStack from "./stacks/BenefitsStack";
import ProfileDetails from "../screens/06_home/Account/ProfileDetails";
import BottomTabNav from "./BottomTabNav";
import KycStatus from "../screens/06_home/Account/KycStatus";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  var [initialRoute, setInitialRoute] = useState(
    useSelector((state) => state.navigation.currentStack)
  );
  var [initialScreen, setInitialScreen] = useState(
    useSelector((state) => state.navigation.currentScreen)
  );

  console.log("STAGE: ", STAGE);
  console.log("initialRoute: ", initialRoute);
  console.log("currentScreen: ", initialScreen);

  STAGE === "dev" ? (initialRoute = "DevMenu") : null;
  console.log("initialRoute: ", initialRoute);

  return (
    <OfflineAlert>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="DevMenu"
          component={DevMenu}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="OnboardingStack"
          component={OnboardingStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeStack"
          component={BottomTabNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileStack"
          component={ProfileDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="KycStack"
          component={KycStatus}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EWAStack"
          component={EWAStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DocumentStack"
          component={DocumentStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BenefitsStack"
          component={BenefitsStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </OfflineAlert>
  );
};

export default StackNavigator;

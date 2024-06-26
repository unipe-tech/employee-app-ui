import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DevMenu from "../screens/DevMenu";

import { STAGE } from "@env";
import OfflineAlert from "../components/organisms/OfflineAlert";
import OnboardingStack from "./stacks/OnboardingStack";
import EWAStack from "./stacks/EWAStack";

import BenefitsStack from "./stacks/BenefitsStack";
import AccountStack from "./stacks/AccountStack";
import InvestStack from "./stacks/InvestStack";
import SplashScreen from "../screens/SplashScreen";
import BottomTabNav from "./BottomTabNav";
import KYCStack from "./stacks/KYCStack";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  var initialRoute = useSelector((state) => state.navigation.currentStack);

  var initialScreen = useSelector((state) => state.navigation.currentScreen);

  console.log("STAGE: ", STAGE);
  console.log("initialRoute: ", initialRoute);
  console.log("currentScreen: ", initialScreen);

  STAGE === "dev" ? (initialRoute = "DevMenu") : null;
  console.log("initialRoute: ", initialRoute);

  return (
    <OfflineAlert>
      <Stack.Navigator initialRouteName={"Splash"}>
        <Stack.Screen
          name="DevMenu"
          component={DevMenu}
          options={{
            headerShown: false,
            header: null,
          }}
        />
        <Stack.Screen
          name="Splash"
          options={{ headerShown: false, header: null }}
          component={SplashScreen}
          initialParams={{
            initialRoute: initialRoute,
            initialScreen: initialScreen,
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
          name="InvestStack"
          component={InvestStack}
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
          name="KYCStack"
          component={KYCStack}
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
        <Stack.Screen
          name="AccountStack"
          component={AccountStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </OfflineAlert>
  );
};

export default StackNavigator;

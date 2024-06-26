import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DevMenuButton from "../components/atoms/DevMenuButton";

export default DevMenu = () => {
  const navigation = useNavigation();

  const screens = [
    { title: "Onboarding", stack: "OnboardingStack", name: "Onboarding" },
    { title: "Welcome", stack: "OnboardingStack", name: "Welcome" },
    { title: "Login", stack: "OnboardingStack", name: "Login" },
    { title: "Profile", stack: "KYCStack", name: "ProfileForm" },
    { title: "AADHAAR", stack: "KYCStack", name: "AadhaarForm" },
    { title: "PAN", stack: "KYCStack", name: "PanForm" },
    { title: "BANK", stack: "KYCStack", name: "BankForm" },
    { title: "Mandate", stack: "EWAStack", name: "EWA_MANDATE" },
    { title: "Home", stack: "HomeStack", name: "Home" },
    { title: "KYC Details", stack: "AccountStack", name: "KYC" },
    { title: "Profile Details", stack: "AccountStack", name: "Profile" },
    { title: "Documents", stack: "AccountStack", name: "Documents" },
    { title: "EWA", stack: "EWAStack", name: "EWA_OFFER" },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {screens.map((screen, index) => (
          <DevMenuButton
            accessibilityLabel={screen.title}
            key={index}
            style={{ marginTop: 20 }}
            title={screen.title}
            onPress={() =>
              navigation.navigate(screen.stack, { screen: screen.name })
            }
          />
        ))}
        <DevMenuButton
          style={{ marginTop: 20 }}
          title={"Notification Test"}
          onPress={() => handleNotification()}
        />
        <DevMenuButton
          style={{ marginTop: 20 }}
          title={"Account"}
          onPress={() =>
            navigation.navigate("HomeStack", {
              screen: "Account",
            })
          }
        />
      </View>
    </ScrollView>
  );
};

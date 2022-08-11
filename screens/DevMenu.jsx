import { ScrollView, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";

const DevMenu = () => {
  const navigation = useNavigation();
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="Welcome"
          onPress={() => navigation.navigate("Welcome")}
        />
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="OTP Login"
          onPress={() => navigation.navigate("Login")}
        />
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="Aadhaar"
          onPress={() => navigation.navigate("AadhaarForm")}
        />
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="PAN"
          onPress={() => navigation.navigate("PanForm")}
        />
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="Bank Details"
          onPress={() => navigation.navigate("BankInfoForm")}
        />
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="Profile"
          onPress={() => navigation.navigate("PersonalDetailsForm")}
        />
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="Personal Photo"
          onPress={() => navigation.navigate("PersonalImage")}
        />
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="Home Screen"
          onPress={() => navigation.navigate("Home")}
        />
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="KYC Screen"
          onPress={() => navigation.navigate("KYC")}
        />
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="Profile Details Screen"
          onPress={() => navigation.navigate("Profile")}
        />
        <PrimaryButton
          style={{ marginTop: 20 }}
          title="Experimental"
          onPress={() => navigation.navigate("Experimental")}
        />
      </View>
    </ScrollView>
  );
};

export default DevMenu;

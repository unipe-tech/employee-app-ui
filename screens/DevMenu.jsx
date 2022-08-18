import { StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../constants/Theme";
import TextButton from "../components/atoms/TextButton";

const DevMenu = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: SIZES.padding,
        }}
      >
        <TextButton
          containerStyle={{ marginTop: 20 }}
          label="Welcome"
          onPress={() => navigation.navigate("Welcome")}
        />
        <TextButton
          containerStyle={{ marginTop: 20 }}
          label="OTP Login"
          onPress={() => navigation.navigate("Login")}
        />
        <TextButton
          containerStyle={{ marginTop: 20 }}
          label="Aadhaar"
          onPress={() => navigation.navigate("AadhaarForm")}
        />
        <TextButton
          containerStyle={{ marginTop: 20 }}
          label="PAN"
          onPress={() => navigation.navigate("PanCardInfo")}
        />
        <TextButton
          containerStyle={{ marginTop: 20 }}
          label="Bank Details"
          onPress={() => navigation.navigate("BankInfoForm")}
        />
        <TextButton
          containerStyle={{ marginTop: 20 }}
          label="Profile"
          onPress={() => navigation.navigate("PersonalDetailsForm")}
        />
        <TextButton
          containerStyle={{ marginTop: 20 }}
          label="Personal Photo"
          onPress={() => navigation.navigate("PersonalImage")}
        />
        <TextButton
          containerStyle={{ marginTop: 20 }}
          label="Home Screen"
          onPress={() => navigation.navigate("Home")}
        />
        <TextButton
          containerStyle={{ marginTop: 20 }}
          label="KYC Screen"
          onPress={() => navigation.navigate("KYC")}
        />
        <TextButton
          containerStyle={{ marginTop: 20 }}
          label="Profile Details Screen"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    </ScrollView>
  );
};

export default DevMenu;

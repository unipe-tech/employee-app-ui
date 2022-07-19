import { Button, StyleSheet, Text, View } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import PrimaryButton from "../components/PrimaryButton"

const DevMenu = () => {
  const navigation = useNavigation()
  return (
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
        onPress={() => navigation.navigate("Aadhaar")}
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="PAN Card"
        onPress={() => navigation.navigate("PanCardInfo")}
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="Bank Details"
        onPress={() => navigation.navigate("BankInfoForm")}
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="Basic Details"
        onPress={() => navigation.navigate("PersonalInfoForm")}
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="Image Capture"
        onPress={() => navigation.navigate("PersonalImage")}
      />
      <PrimaryButton
        style={{ marginTop: 20 }}
        title="Home Screen"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  )
}

export default DevMenu

const styles = StyleSheet.create({})
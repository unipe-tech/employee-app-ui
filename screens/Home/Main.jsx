import { Button, StyleSheet, Text, View } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import PrimaryButton from "../../components/PrimaryButton"

const Main = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <PrimaryButton
        title="Login"
        onPress={() => navigation.navigate("Login")}
      />
      <PrimaryButton
        title="Home Screen"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  )
}

export default Main

const styles = StyleSheet.create({})

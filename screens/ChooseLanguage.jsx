import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

const ChooseLanguage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useState("en");

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => {
        setLanguage(value);
        dispatch(addCurrentLanguage(value));
      })
      .catch((err) => console.log(err));
    navigation.navigate("Welcome");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontFamily: "Roboto", fontWeight: "800" }}>
          Choose Language (भाषा चुनें)
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <PrimaryButton
          title="Select English"
          onPress={() => {
            changeLanguage("en");
          }}
        />
        <PrimaryButton
          title="हिंदी चुनें"
          onPress={() => {
            changeLanguage("hi");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChooseLanguage;

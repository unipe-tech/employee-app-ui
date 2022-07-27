import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import StepIndicator from "react-native-step-indicator";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { checkBox, form, styles, welcome } from "../../styles";
import Loading from "../../components/Loading";
import Modal from "react-native-modal";
import PrimaryButton from "../../components/PrimaryButton";
import { useTranslation } from "react-i18next";
import "../../translation/i18n";
import { addCurrentLanguage } from "../../store/slices/languageSlice";

export default WelcomePage = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(addCurrentScreen("Welcome"));
  }, []);

  const navigation = useNavigation();
  SplashScreen.hide();
  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: "feed",
      color: stepStatus === "finished" ? "#ffffff" : "#4E46F1",
      size: 15,
    };
    switch (position) {
      case 0: {
        iconConfig.name = "smartphone";
        break;
      }
      case 1: {
        iconConfig.name = "perm-identity";
        break;
      }
      case 2: {
        iconConfig.name = "mood";
        break;
      }
      case 3: {
        iconConfig.name = "payment";
        break;
      }
      case 4: {
        iconConfig.name = "info-outline";
        break;
      }
      case 5: {
        iconConfig.name = "camera-front";
        break;
      }
      default: {
        break;
      }
    }
    return iconConfig;
  };
  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  const data = [
    t("mobile_number_verification"),
    t("aadhaar_card_verification"),
    t("pan_card_verification"),
    t("bank_details"),
    t("basic_details"),
    t("user_photo_capture"),
  ];
  const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#4E46F1",
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: "#4E46F1",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#4E46F1",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#4E46F1",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 14,
    currentStepIndicatorLabelFontSize: 14,
    stepIndicatorLabelCurrentColor: "#4E46F1",
    stepIndicatorLabelFinishedColor: "#4E46F1",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 14,
    currentStepLabelColor: "#4E46F1",
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/unipe-Thumbnail.png")}
        />
        <Text style={welcome.mainTitle}>{t("welcome_hello")}</Text>
        <Text style={welcome.subTitle}>{t("welcome_subtitle")}</Text>
        {/* {data.map((datai,index)=>{
      return(
        <Text style={welcome.title} key={index}><Text>{'\u2B24'}</Text>  {datai}</Text>
      )
    })} */}
        <View style={welcome.steps}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={6}
            direction="vertical"
            renderStepIndicator={renderStepIndicator}
            currentPosition={0}
            labels={data}
          />
        </View>
        <Button
          style={form.nextButton}
          title={t("welcome_btn")}
          uppercase={false}
          onPress={() => {
            navigation.navigate("Login");
          }}
        ></Button>
        <View style={checkBox.padding}></View>
      </SafeAreaView>
    </>
  );
};

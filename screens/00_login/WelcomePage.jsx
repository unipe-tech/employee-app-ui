import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Image, SafeAreaView, Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import StepIndicator from "react-native-step-indicator";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { checkBox, form, styles, welcome } from "../../styles";
import Loading from "../../components/Loading";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";

export default WelcomePage = () => {
  const dispatch = useDispatch();
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
    "Mobile Number",
    "Aadhaar Card",
    "PAN Card",
    "Bank Account",
    "Profile",
    "Photo",
  ];
  const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: COLORS.primary,
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: COLORS.primary,
    stepStrokeUnFinishedColor: COLORS.lightGray,
    separatorFinishedColor: COLORS.primary,
    separatorUnFinishedColor: COLORS.lightGray,
    stepIndicatorFinishedColor: COLORS.primary,
    stepIndicatorUnFinishedColor: COLORS.white,
    stepIndicatorCurrentColor: COLORS.white,
    stepIndicatorLabelFontSize: SIZES.body4,
    currentStepIndicatorLabelFontSize: SIZES.body4,
    stepIndicatorLabelCurrentColor: COLORS.primary,
    stepIndicatorLabelFinishedColor: COLORS.primary,
    stepIndicatorLabelUnFinishedColor: COLORS.lightGray,
    labelColor: COLORS.gray,
    labelSize: SIZES.body4,
    currentStepLabelColor: COLORS.primary,
    labelAlign: "flex-start",
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/unipe-Thumbnail.png")}
        />
        <Text style={welcome.subTitle}>
          Let’s start onboarding process by verifying below documents.
        </Text>
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
          title="Welcome!"
          titleStyle={{ ...FONTS.h4, color: COLORS.white }}
          color={COLORS.primary}
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

import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Image, SafeAreaView, Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
//import StepIndicator from "react-native-step-indicator";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { checkBox, form, styles, welcome } from "../../styles";
import Loading from "../../components/Loading";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import TextButton from "../../components/atoms/TextButton";
import WelcomeSteps from "../../components/molecules/WelcomeSteps";

export default WelcomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addCurrentScreen("Welcome"));
  }, []);

  const navigation = useNavigation();
  SplashScreen.hide();

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
        <WelcomeSteps />

        <TextButton
          label={"Welcome!"}
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
        <View style={checkBox.padding}></View>
      </SafeAreaView>
    </>
  );
};

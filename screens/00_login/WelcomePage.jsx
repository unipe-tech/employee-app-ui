import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Image, SafeAreaView, Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import { checkBox, form, styles, welcome } from "../../styles";
import Loading from "../../components/atoms/Loading";
import { COLORS, FONTS, SIZES } from "../../constants/Theme";
import TextButton from "../../components/atoms/TextButton";
import KYCSteps from "../../components/molecules/KYCSteps";
import { WELCOME_TITLE } from "../../constants/Strings";

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
        <Text style={welcome.subTitle}>{WELCOME_TITLE}</Text>
        {/* {data.map((datai,index)=>{
      return(
        <Text style={welcome.title} key={index}><Text>{'\u2B24'}</Text>  {datai}</Text>
      )
    })} */}
        <View style={{ alignItems: "center", flex: 1 }}>
          <KYCSteps />
        </View>

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

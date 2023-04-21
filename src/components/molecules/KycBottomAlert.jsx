import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import FormInput from "../atoms/FormInput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../constants/Theme";
import BottomSheetWrapper from "../atoms/BottomSheetWrapper";
import { useState } from "react";
import PrimaryButton from "../atoms/PrimaryButton";
import KycSteps from "../../assets/KycSteps.svg";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import SvgContainer from "../SvgContainer";

const KycBottomAlert = ({ visible, setVisible }) => {
  const navigation = useNavigation();

  const profileComplete = useSelector((state) => state.profile.profileComplete);
  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);

  const handleConditionalNav = () => {
    if (!profileComplete) {
      navigation.navigate("AccountStack", {
        screen: "Profile",
      });
    } else if (aadhaarVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "AADHAAR",
        },
      });
    } else if (panVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "PAN",
        },
      });
    } else if (bankVerifyStatus != "SUCCESS") {
      navigation.navigate("AccountStack", {
        screen: "KYC",
        params: {
          screen: "BANK",
        },
      });
    }
  };

  return visible ? (
    <BottomSheetWrapper open={visible} setOpen={setVisible}>
      <View style={styles.svgBackground}>
        <SvgContainer width={250} height={200}>
          <KycSteps />
        </SvgContainer>
      </View>

      <Text
        style={{
          ...FONTS.h2,
          color: COLORS.moneyCardBg,
          alignSelf: "center",
          marginVertical: 5,
        }}
      >
        Complete your KYC
      </Text>
      <Text
        style={{
          ...FONTS.body4,
          color: COLORS.gray,
          alignSelf: "center",
          textAlign: "center",
          marginBottom: 5,
        }}
      >
        Verify your identity to withdraw advance salary in our bank account
      </Text>
      <PrimaryButton
        title="Start KYC"
        onPress={() => {
          setVisible(false);
          handleConditionalNav();
        }}
      />

      <PrimaryButton
        title="I will do it later"
        containerStyle={{
          borderWidth: 1,
          borderColor: COLORS.warning,
          backgroundColor: COLORS.white,
        }}
        titleStyle={{ color: COLORS.warning }}
        onPress={() => {
          setVisible(false);
        }}
      />
    </BottomSheetWrapper>
  ) : null;
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
  },
  imageView: {
    // width: "100%",
    // height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    //backgroundColor: COLORS.black,
  },
  svgBackground: {
    backgroundColor: COLORS.lightgray_01,
    margin: "-15rem",
    borderTopLeftRadius: "20rem",
    borderTopRightRadius: "20rem",
    marginBottom: "10rem",
    paddingTop: "15rem",
    alignItems: "center",
  },
});

export default KycBottomAlert;

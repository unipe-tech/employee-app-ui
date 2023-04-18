import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import FormInput from "../atoms/FormInput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../constants/Theme";
import BottomSheetWrapper from "../atoms/BottomSheetWrapper";
import { useState } from "react";
import PrimaryButton from "../atoms/PrimaryButton";
import KycSteps from "../../assets/KycSteps.svg";
import SvgContainer from "../SvgContainer";

const KycBottomAlert = ({ visible, setVisible }) => {
  return (
    <BottomSheetWrapper open={visible} setOpen={setVisible}>
      <View
        style={{
          backgroundColor: COLORS.lightgray_01,
          margin: -15,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginBottom: 10,
          paddingTop: 15,
          alignItems: "center",
        }}
      >
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
          marginVertical: 5,
        }}
      >
        Verify your identity to withdraw advance salary in our bank account
      </Text>
      <PrimaryButton
        title="Start KYC"
        onPress={() => {
          setVisible(false);
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
  );
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
});

export default KycBottomAlert;

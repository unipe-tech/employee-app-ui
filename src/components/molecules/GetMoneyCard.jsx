import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import PrimaryButton from "../atoms/PrimaryButton";
import SkeletonLoader from "../atoms/SkeletonLoader";

const GetMoneyCard = ({
  navigation,
  eligible,
  amount,
  accessible,
  fetched,
}) => {
  return (
    <>
      {fetched ? (
        <View style={styles.container}>
          <Text style={styles.text}>Here is your On-Demand Salary</Text>

          <Text style={[styles.text, { ...FONTS.h1 }]}>{amount}</Text>
          <View
            style={{
              width: "100%",
              borderWidth: 0.4,
              borderColor: COLORS.primary,
            }}
          />

          {/* TODO: add progress bar as background filled view */}

          <PrimaryButton
            title={
              !accessible
                ? "Offer Inactive"
                : !eligible
                ? "Offer Inactive"
                : "Get Money Now"
            }
            disabled={!eligible || !accessible}
            onPress={() => {
              navigation.navigate("EWAStack", { screen: "EWA_OFFER" });
            }}
          />
        </View>
      ) : (
        <SkeletonLoader style={styles.container}>
          <Text style={styles.text}>Getting your On-Demand Salary</Text>
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={styles.loader}
          />
          <View
            style={{
              width: "100%",
              borderWidth: 0.4,
              borderColor: COLORS.primary,
            }}
          />
          <PrimaryButton title={"Loading Offer"} disabled={true} />
        </SkeletonLoader>
      )}
    </>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginBottom: "10rem",
    padding: "15rem",
    flexDirection: "column",
    borderRadius: 5,
    elevation: 2,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    width: "100%",
    marginBottom: "10rem",
    padding: "15rem",
    flexDirection: "column",
    borderRadius: 5,
    elevation: 2,
    backgroundColor: COLORS.lightgray_01,
  },
  loader: { margin: "10rem" },
  text: { ...FONTS.body3, color: COLORS.secondary, marginVertical: 5 },
});

export default GetMoneyCard;

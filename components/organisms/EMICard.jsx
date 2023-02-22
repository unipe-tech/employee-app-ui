import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";

const EMICard = () => {
  const [selected, setSelected] = React.useState(0);
  const data = [
    {
      loanAmount: 10000,
      emiTenure: 1,
      emiAmount: 1000,
      recommended: true,
    },
    {
      loanAmount: 11237,
      emiTenure: 4,
      emiAmount: 1000,
      loanInterest: 10,
      recommended: false,
    },
    {
      loanAmount: 12000,
      emiTenure: 4,
      emiAmount: 1000,
      loanInterest: 10,
      recommended: false,
    },
  ];
  return (
    <>
      <Text style={[styles.titleText]}>Select Payment Plan</Text>
      <ScrollView>
        {data.map((item, index) => {
          return (
            <View style={styles.container} key={index}>
              <TouchableOpacity
                style={styles.PressableView}
                onPress={() => {
                  setSelected(index);
                }}
              >
                {item.recommended ? (
                  <View style={styles.recommendedView}>
                    <Text style={styles.recommendedText}>RECOMMENDED</Text>
                  </View>
                ) : null}
                <Text style={[styles.amountText]}>
                  ₹{item.loanAmount} x {item.emiTenure} month(s) |{" "}
                  {item?.loanInterest ? (
                    item.loanInterest + "%"
                  ) : (
                    <Text style={{ color: COLORS.primary }}>No Cost</Text>
                  )}
                </Text>
              </TouchableOpacity>
              {index === selected ? (
                item?.loanInterest ? (
                  <View style={styles.infoView}>
                    <View>
                      <Text style={styles.infoText}>EMI/Month</Text>
                      <Text
                        style={[styles.infoText, { color: COLORS.secondary }]}
                      >
                        ₹{item.emiAmount}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.infoText}>Interest</Text>
                      <Text
                        style={[styles.infoText, { color: COLORS.secondary }]}
                      >
                        ₹{item.loanAmount * (item.loanInterest / 100)}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.infoText}>EMI/Month</Text>
                      <Text
                        style={[styles.infoText, { color: COLORS.secondary }]}
                      >
                        ₹{item.emiAmount}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Text style={styles.infoText}>
                    Money will be deducted from upcoming payroll
                  </Text>
                )
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 4,
    backgroundColor: COLORS.white,
    elevation: 2,
    marginVertical: "10rem",
    borderWidth: "0.5rem",
    borderColor: COLORS.lightgray_01,
  },
  PressableView: {
    width: "100%",
    flexDirection: "column",
    paddingVertical: "10rem",
  },
  recommendedView: {
    position: "absolute",
    backgroundColor: "yellow",
    borderBottomLeftRadius: 8,
    right: 0,
    padding: "5rem",
    alignItems: "center",
    justifyContent: "center",
  },
  recommendedText: {
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    ...FONTS.h5,
  },
  amountText: {
    color: COLORS.secondary,
    marginHorizontal: "10rem",
    marginVertical: "10rem",
    ...FONTS.h4,
  },
  titleText: {
    color: COLORS.secondary,
    ...FONTS.body4,
    marginVertical: "6rem",
  },
  infoView: {
    flexDirection: "row",
    borderTopWidth: "0.75rem",
    borderColor: COLORS.lightGray,
    justifyContent: "space-between",
    paddingVertical: "10rem",
  },
  infoText: {
    color: COLORS.gray,
    marginHorizontal: "10rem",
    ...FONTS.body5,
    flexDirection: "column",
  },
});

export default EMICard;

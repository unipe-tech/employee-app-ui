import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import ListItem from "../atoms/ListItem";
import BankCodeEmandateOptionsMap from "../../assets/bankCodeEmandateOptionsMap";

const MandateOptions = ({ ProceedButton, disabled, authType }) => {
  const ifsc = useSelector((state) => state.bank?.data?.ifsc);

  const [mandateButtons, setMandateButtons] = useState([]);

  useEffect(() => {
    var mandateOptions = [];
    var bankCode = ifsc.substring(0, 4);
    var emandateOptions = BankCodeEmandateOptionsMap[bankCode] || "000";

    if (emandateOptions[2] === "1") {
      mandateOptions.push({
        title: "Aadhaar",
        subtitle: "Takes upto 96 banking hours to register",
        subtitleStyle: { color: COLORS.secondary },
        iconName: "card-account-details-outline",
        type: "aadhaar",
        onPress: () => {
          ProceedButton({ authType: "aadhaar" });
        },
      });
    }

    if (emandateOptions[0] === "1") {
      mandateOptions.push({
        title: "Net Banking",
        subtitleStyle: { color: COLORS.primary },
        iconName: "bank-outline",
        type: "netbanking",
        onPress: () => {
          ProceedButton({ authType: "netbanking" });
        },
      });
    }

    if (emandateOptions[1] === "1") {
      mandateOptions.push({
        title: "Debit Card",
        subtitleStyle: { color: COLORS.primary },
        iconName: "credit-card-outline",
        type: "debitcard",
        onPress: () => {
          ProceedButton({ authType: "debitcard" });
        },
      });
    }

    if (mandateOptions.length > 1) {
      mandateOptions[mandateOptions.length - 1].subtitle = "Recommended";
    }

    if (mandateOptions.length > 0) {
      setMandateButtons(mandateOptions);
    } else {
      setMandateButtons([
        {
          title: "Your bank does not support mandate",
          iconName: "crosshairs-off",
          type: "NA",
          disabled: true,
          onPress: () => {},
        },
      ]);
    }
  }, [ifsc]);

  return (
    <View style={styles.container}>
      {mandateButtons.map((item, index) => {
        return (
          <ListItem
            titleStyle={{ ...FONTS.body4 }}
            subtitleStyle={{ ...FONTS.body5, ...item.subtitleStyle }}
            key={index}
            item={item}
            disabled={disabled || item.disabled}
            showIcon={!item.disabled}
            selected={authType == item.type}
          />
        );
      })}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    borderWidth: 2,
    // borderRadius: 5,
    borderColor: COLORS.lightgray_01,
    elevation: 2,
    backgroundColor: COLORS.white,
    margin: 1,
  },
  notFoundContainer: {
    padding: "10rem",
  },
});

export default MandateOptions;

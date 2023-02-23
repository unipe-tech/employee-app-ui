import React, { useState } from "react";
import { Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS, FONTS } from "../../constants/Theme";
import ListItem from "../atoms/ListItem";

const EMICard = () => {
  const [selected, setSelected] = useState(0);
  const data = [
    {
      title: "₹10000 x 1 Months",
      titleStyle: { color: COLORS.secondary },
      disabled: false,
      onPress: () => {
        setSelected(0);
      },
    },
    {
      title: "₹10000 x 2 Months",
      disabled: false,
      onPress: () => {
        setSelected(1);
      },
    },
    {
      title: "₹10000 x 3 Months",
      disabled: false,
      onPress: () => {
        setSelected(2);
      },
    },
  ];

  return (
    <>
      <Text style={[styles.titleText]}>Select Payment Plan</Text>
      {data.map((item, index) => {
        return (
          <ListItem
            titleStyle={{ ...FONTS.body4, ...item.titleStyle }}
            subtitleStyle={{ ...FONTS.body5 }}
            key={index}
            item={item}
            disabled={item.disabled}
            selected={selected === index}
            showIcon={!item.disabled}
          />
        );
      })}
    </>
  );
};

const styles = EStyleSheet.create({
  titleText: {
    color: COLORS.secondary,
    ...FONTS.body4,
    marginVertical: "6rem",
  },
});

export default EMICard;

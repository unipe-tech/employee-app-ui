import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useDispatch } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import { addAvailedTenor, addEmiAmount } from "../../store/slices/ewaLiveSlice";
import ListItem from "../atoms/ListItem"; 

const EMICard = ({ loanAmount, interestRate }) => {
  console.log("EMICard: ", loanAmount, interestRate);
  const dispatch = useDispatch();
  const [tenor, setTenor] = useState(1);
  const [emiAmounts, setEmiAmounts] = useState([0, 0, 0]);

  useEffect(() => {
    dispatch(addAvailedTenor(tenor));
  }, [tenor]);
  
  useEffect(() => {
    dispatch(addEmiAmount(emiAmounts[tenor - 1]));
  }, [emiAmounts, tenor]);

  useEffect(() => {
    var emiAmount = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      if (i == 0) emiAmount[i] = loanAmount;
      else emiAmount[i] = Math.ceil(((loanAmount * interestRate/1200)) / (1 - (1+interestRate/1200)**(-(i+1))));
    }
    setEmiAmounts(emiAmount);
  }, [loanAmount]);

  const data = [
    {
      title: `₹${loanAmount} x 1 Months`,
      titleStyle: { color: COLORS.secondary },
      disabled: false,
      onPress: () => {
        setTenor(1);
      },
    },
    {
      title: `₹${emiAmounts[1]} x 2 Months`,
      disabled: false,
      onPress: () => {
        setTenor(2);
      },
    },
    {
      title: `₹${emiAmounts[2]} x 3 Months`,
      disabled: false,
      onPress: () => {
        setTenor(3);
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
            selected={tenor === index + 1}
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

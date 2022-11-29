import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../constants/Theme";
import { getBackendData } from "../../services/employees/employeeServices";
import { useSelector } from "react-redux";

const RepaymentCard = () => {
  const isFocused = useIsFocused();

  const [repaymentAmount, setRepaymentAmount] = useState(0);
//   const token = useSelector((state) => state.auth.token);
//   const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);

//   useEffect(() => {
//     console.log("ewaRepaymentFetch unipeEmployeeId:", unipeEmployeeId);
//     if (isFocused) {
//       getBackendData({
//         params: { unipeEmployeeId: unipeEmployeeId },
//         xpath: "ewa/repayments",
//         token: token,
//       })
//         .then((response) => {
//           if (response.data.status === 200) {
//             console.log("ewaRepaymentFetch response.data: ", response.data);
//             setRepaymentAmount(response.data.body.repaymentAmount);
//           }
//         })
//         .catch((error) => {
//           console.log("ewaRepaymentFetch error: ", error);
//         });
//     }
//   }, [isFocused, unipeEmployeeId]);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.warningBackground,
        marginVertical: "5%",
        flexDirection: "row",
        alignSelf: "center",
        paddingHorizontal: "10%",
        paddingVertical: "5%",
        borderRadius: 10,
      }}
      onPress={() => console.log("Repayment Card Pressed")} //add Checkout Flow
    >
      <View style={{ justifyContent: "space-evenly", flexDirection: "row" }}>
        <Text style={{ ...FONTS.h3 }}>
          Amount to be <Text style={{ color: COLORS.warning }}>Repayed</Text>
        </Text>
        <Text style={{ ...FONTS.h3, marginLeft: 20 }}>₹ {repaymentAmount}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RepaymentCard;

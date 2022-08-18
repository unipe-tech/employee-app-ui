import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import { useSelector } from "react-redux";
import TextButton from "../../components/atoms/TextButton";
import { styles } from "../../styles";

const PAN = () => {
  const fullName = useSelector((state) => state.pan.accountNumber);
  const panNumber = useSelector((state) => state.pan.ifsc);
  const DOB = useSelector((state) => state.pan.upi);
  const address = useSelector((state) => state.pan.accountHolderName);
  const verifyStatus = useSelector((state) => state.pan.verifyStatus);

  return (
    <View style={styles.container}>
      <DetailItem label="Full Name" title={fullName} divider />
      <DetailItem label="PAN Number" title={panNumber} divider />
      <DetailItem label="DOB" title={DOB} divider />
      <DetailItem label="Address" title={address} divider />
      <DetailItem label="Verify Status" title={verifyStatus} />
      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
        <TextButton
          label={"Update"}
          onPress={() =>
            Alert.alert(
              "The PAN Details are not editable, please ask your employer to update"
            )
          }
        />
      </View>
    </View>
  );
};

export default PAN;

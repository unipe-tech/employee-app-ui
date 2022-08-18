import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import { useSelector } from "react-redux";
import TextButton from "../../components/atoms/TextButton";
import { styles } from "../../styles";

const Aadhaar = () => {
  const fullName = useSelector((state) => state.aadhaar.fullName);
  const aadhaarNumber = useSelector((state) => state.aadhaar.number);
  const DOB = useSelector((state) => state.aadhaar.DOB);
  const address = useSelector((state) => state.aadhaar.address);
  const verifyStatus = useSelector((state) => state.aadhaar.verifyStatus);
  //Todo: Full Name, DOB and Address not present

  return (
    <View style={styles.container}>
      <DetailItem label="Full Name" title={fullName} divider />
      <DetailItem label="Aadhaar Number" title={aadhaarNumber} divider />
      <DetailItem label="DOB" title={DOB} divider />
      <DetailItem label="Address" title={address} divider />
      <DetailItem label="Verify Status" title={verifyStatus.OCR} />
      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
        <TextButton
          label={"Update"}
          onPress={() =>
            Alert.alert(
              "The Aadhaar Details are not editable, please ask your employer to update"
            )
          }
        />
      </View>
    </View>
  );
};

export default Aadhaar;

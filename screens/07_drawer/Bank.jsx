import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";

import { useSelector } from "react-redux";
import TextButton from "../../components/atoms/TextButton";
import { styles } from "../../styles";

const Bank = () => {
  const accountNumber = useSelector((state) => state.bank.accountNumber);
  const ifsc = useSelector((state) => state.bank.ifsc);
  const upi = useSelector((state) => state.bank.upi);
  const accountHolderName = useSelector(
    (state) => state.bank.accountHolderName
  );
  const verifyStatus = useSelector((state) => state.bank.verifyStatus);

  return (
    <View style={styles.container}>
      <DetailItem label="Account Number" title={accountNumber} divider />
      <DetailItem label="IFSC Code" title={ifsc} divider />
      <DetailItem
        label="Account Holder Name"
        title={accountHolderName}
        divider
      />
      <DetailItem label="UPI Id" title={upi} divider />
      <DetailItem label="Verify Status" title={verifyStatus} />
      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
        <TextButton
          label={"Update"}
          onPress={() =>
            Alert.alert(
              "The Bank Details are not editable, please ask your employer to update"
            )
          }
        />
      </View>
    </View>
  );
};

export default Bank;

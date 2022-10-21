import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import React from "react";

import { SafeAreaView, View } from "react-native";
import AddressDropdown from "../../../../components/AddressDropdown";
import { bankform, form, styles } from "../../../../styles";
import { useSelector } from "react-redux";
import { addressPush } from "../../../../helpers/BackendPush";
import { showToast } from "../../../../components/Toast";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
import { COLORS } from "../../../../constants/Theme";
import PrimaryButton from "../../../../components/PrimaryButton";

export default EmployeeAddress = () => {
  const navigation = useNavigation();

  const id = useSelector((state) => state.auth.id);
  const address = useSelector((state) => state.esic.address);

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <KeyboardAvoidingWrapper>
        <View>
          <AddressDropdown type={"present"} />
          <AddressDropdown type={"permanent"} />
          <PrimaryButton
            title="Continue"
            onPress={() => {
              addressPush({
                id: id,
                type: "present",
                street: address["present"].street,
                state: address["present"].state,
                district: address["present"].district,
                pin: address["present"].pincode,
              });
              addressPush({
                id: id,
                type: "permanent",
                street: address["permanent"].street,
                state: address["permanent"].state,
                district: address["permanent"].district,
                pin: address["permanent"].pincode,
              });
              showToast("Employee Address details recorded.");
              navigation.navigate("Benefits", {
                screen: "ESIC",
                params: {
                  screen: "Nominee Address",
                },
              });
            }}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

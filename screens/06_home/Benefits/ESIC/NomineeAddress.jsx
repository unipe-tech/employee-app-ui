import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";

import AddressDropdown from "../../../../components/AddressDropdown";
import PrimaryButton from "../../../../components/PrimaryButton";
import { showToast } from "../../../../components/Toast";
import { COLORS } from "../../../../constants/Theme";
import { addressPush } from "../../../../helpers/BackendPush";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
import { bankform, form, styles } from "../../../../styles";

export default NomineeAddress = () => {
  const navigation = useNavigation();
  const id = useSelector((state) => state.auth.id);
  const address = useSelector((state) => state.esic.address);
  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <KeyboardAvoidingWrapper>
        <View>
          <AddressDropdown type="nominee" />
          <PrimaryButton
            title="Finish"
            onPress={() => {
              {
                addressPush({ id, type: "nominee", address });
              }
              showToast("Nominee Address details recorded.");
              navigation.navigate("Home");
            }}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

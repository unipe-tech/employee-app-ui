import React from "react";
import { ScrollView, View } from "react-native";
import { bankform, form, styles } from "../../../styles";
import { Button } from "@react-native-material/core";
import AddressDropdown from "../../../../components/AddressDropdown";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

export default NomineeAddress = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <AddressDropdown type={"nominee"} />
      <Button
        uppercase={false}
        title="Submit"
        type="solid"
        color="#4E46F1"
        style={form.nextButton}
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <View style={bankform.padding}></View>
    </ScrollView>
  );
};

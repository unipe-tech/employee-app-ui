import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { bankform, form, styles } from "../../../styles";
import { Button } from "@react-native-material/core";
import AddressDropdown from "../../../../components/AddressDropdown";
import { useDispatch, useSelector } from "react-redux";
import { addESICAddress } from "../../../../store/slices/esicSlice";
import { useNavigation } from "@react-navigation/core";

export default EmployeeAddress = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [presentStreet, setPresentStreet] = useState(
    useSelector((state) => state.esic.address.present.street)
  );

  const [presentPincode, setPresentPincode] = useState(
    useSelector((state) => state.esic.address.present.pincode)
  );

  const [permanentStreet, setPermanentStreet] = useState(
    useSelector((state) => state.esic.address.permanent.street)
  );

  const [permanentPincode, setPermanentPincode] = useState(
    useSelector((state) => state.esic.address.permanent.pincode)
  );

  useEffect(() => {
    dispatch(
      addESICAddress({ type: "present", subtype: "street", val: presentStreet })
    );
  }, [presentStreet]);

  useEffect(() => {
    dispatch(
      addESICAddress({
        type: "present",
        subtype: "pincode",
        val: presentPincode,
      })
    );
  }, [presentPincode]);

  useEffect(() => {
    dispatch(
      addESICAddress({
        type: "permanent",
        subtype: "street",
        val: permanentStreet,
      })
    );
  }, [permanentStreet]);

  useEffect(() => {
    dispatch(
      addESICAddress({
        type: "permanent",
        subtype: "pincode",
        val: permanentPincode,
      })
    );
  }, [permanentPincode]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <AddressDropdown type={"present"} />
      <AddressDropdown type={"permanent"} />
      <Button
        uppercase={false}
        title="Continue"
        type="solid"
        color="#4E46F1"
        style={form.nextButton}
        onPress={() => {
          navigation.navigate("Benefits", {
            screen: "ESIC",
            params: {
              screen: "Nominee Address",
            },
          });
        }}
      />
      <View style={bankform.padding}></View>
    </ScrollView>
  );
};

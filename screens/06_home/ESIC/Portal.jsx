import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";

import { addESICPortal } from "../../../store/slices/esicSlice";
import { bankform, form, styles } from "../../../styles";
import Input from "../../../components/Input";

export default Portal = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [estCode, setEstCode] = useState(
    useSelector((state) => state.esic.portal.estCode)
  );
  const [ipNumber, setIpNumber] = useState(
    useSelector((state) => state.esic.portal.ipNumber)
  );

  useEffect(() => {
    dispatch(addESICPortal({ type: "estCode", val: estCode }));
  }, [estCode]);

  useEffect(() => {
    dispatch(addESICPortal({ type: "ipNumber", val: ipNumber }));
  }, [ipNumber]);

  return (
    <>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Input
          value={estCode}
          setValue={setEstCode}
          label="Employer Establishment Code*"
        />

        <Input
          value={ipNumber}
          setValue={setIpNumber}
          label="Employer Establishment Code*"
        />
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
                screen: "Family Details",
              },
            });
          }}
        />
        <View style={bankform.padding}></View>
      </ScrollView>
    </>
  );
};

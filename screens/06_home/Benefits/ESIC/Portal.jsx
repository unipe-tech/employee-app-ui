import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "react-native";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { portalPush } from "../../../../helpers/BackendPush";
import { addESICPortal } from "../../../../store/slices/esicSlice";
import { bankform, form } from "../../../../styles";
import { showToast } from "../../../../components/Toast";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
import { COLORS } from "../../../../constants/Theme";
import FormInput from "../../../../components/atoms/FormInput";

export default Portal = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const id = useSelector((state) => state.auth.id);
  const [ipNumber, setIpNumber] = useState(
    useSelector((state) => state.esic.portal.ipNumber)
  );

  useEffect(() => {
    dispatch(addESICPortal({ type: "ipNumber", val: ipNumber }));
  }, [ipNumber]);

  return (
    <KeyboardAvoidingWrapper>
      <View>
        <FormInput
          placeholder={"IP Number"}
          containerStyle={{ marginVertical: 10 }}
          value={ipNumber}
          onChange={setIpNumber}
        />
        <Button
          uppercase={false}
          title="Continue"
          type="solid"
          color={COLORS.primary}
          style={form.nextButton}
          onPress={() => {
            portalPush({ id: id, ipNumber: ipNumber });
            showToast("ESIC Portal details recorded.");
            navigation.navigate("Benefits", {
              screen: "ESIC",
              params: {
                screen: "Family Details",
              },
            });
          }}
        />
        <View style={bankform.padding}></View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

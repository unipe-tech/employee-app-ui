import React, { useEffect,useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";

import FormInput from "../../../../components/atoms/FormInput";
import PrimaryButton from "../../../../components/PrimaryButton";
import { showToast } from "../../../../components/Toast";
import { COLORS } from "../../../../constants/Theme";
import { portalPush } from "../../../../helpers/BackendPush";
import { KeyboardAvoidingWrapper } from "../../../../KeyboardAvoidingWrapper";
import { addESICPortal } from "../../../../store/slices/esicSlice";
import { bankform, form, styles } from "../../../../styles";

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
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <KeyboardAvoidingWrapper>
        <View>
          <FormInput
            placeholder="IP Number"
            containerStyle={{ marginVertical: 10 }}
            value={ipNumber}
            onChange={setIpNumber}
          />
          <PrimaryButton
            title="Continue"
            onPress={() => {
              portalPush({ id, ipNumber });
              showToast("ESIC Portal details recorded.");
              navigation.navigate("Benefits", {
                screen: "ESIC",
                params: {
                  screen: "Family Details",
                },
              });
            }}
          />

          <View style={bankform.padding} />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
};

import { useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";

import Confirm from "../../../../apis/license/Confirm";
import { addCurrentScreen } from "../../../../store/slices/navigationSlice";
import { bankform,styles } from "../../../../styles";

export default LicenseConfirm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentScreen("LicenseConfirm"));
  }, []);

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Confirm />
        <View style={bankform.padding} />
      </ScrollView>
    </SafeAreaView>
  );
};

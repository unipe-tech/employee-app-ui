import { AppBar, Icon, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { Alert, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import ProgressBarTop from "../../components/ProgressBarTop";
import { styles } from "../../styles";
import { MaterialIcons } from "react-native-vector-icons";
import { addCurrentScreen } from "../../store/slices/navigationSlice";
import PanFormTemplate from "../../templates/pan/Form";

export default PanForm = ({ navigation }) => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  useEffect(() => {
    dispatch(addCurrentScreen("PanForm"));
  }, []);

  const SkipPAN = () => {
    Alert.alert(
      "PAN KYC Required",
      `If you want to receive advance salary, PAN KYC is required.`,
      [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("BankForm") },
      ]
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar
          title="PAN Verification"
          color="#4E46F1"
          leading={
            <IconButton
              testID="backIcon"
              icon={<MaterialIcons name="arrow-back" size={20} color="white" />}
              // TODO: Conditional if Aadhaar verified or not
              onPress={() => navigation.navigate("AadhaarConfirm")}
            />
          }
          trailing={
            <IconButton
              testID="forwardIcon"
              icon={
                <MaterialIcons name="arrow-forward" size={20} color="white" />
              }
              onPress={() => {
                SkipPAN();
              }}
            />
          }
        />

        <ProgressBarTop step={1} />
        <PanFormTemplate />
      </SafeAreaView>
    </>
  );
};

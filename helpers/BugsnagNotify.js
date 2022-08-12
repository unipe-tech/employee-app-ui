import { useSelector } from "react-redux";
import Bugsnag from "@bugsnag/react-native";

export default BugsnagNotify = (text) => {
  const mobileNumber = useSelector((state) => state.auth.phoneNumber);
  const currentScreen = useSelector((state) => state.navigation.currentScreen);

  Bugsnag.notify(new Error(`${mobileNumber} - ${currentScreen} - ${text}`));
};

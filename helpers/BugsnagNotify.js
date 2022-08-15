import { useSelector } from "react-redux";
import Bugsnag from "@bugsnag/react-native";

export default BugsnagNotify = (text) => {
  const mobileNumber = useSelector((state) => state.auth.phoneNumber);
  const currentScreen = useSelector((state) => state.navigation.currentScreen);

  try {
    var error = `${mobileNumber} - ${currentScreen} - ${text}`;
    console.log(error);
    Bugsnag.notify(new Error(error));
  } catch (error) {
    console.log("BugsnagNotify Error: ", error);
  }
};

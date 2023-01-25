import { Alert, Linking } from "react-native";
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";

const requestPermission = ({ permission }) => {
  request(permission);
};

export const askSMSPermissions = async ({ permission, setPermission }) => {
  await request(PERMISSIONS.ANDROID.READ_SMS).then((status) => {
    console.log({ status });
    switch (status) {
      case RESULTS.UNAVAILABLE:
        setPermission("Unavailable");
        console.log("This SMS Feature is not available on this device");
        break;
      case RESULTS.DENIED:
        // setPermission("Denied");
        Alert.alert(
          "SMS Permission Required",
          `Please provide SMS reading permissions to receive higher credit amount.`,
          [
            { text: "No", onPress: () => null, style: "cancel" },
            {
              text: "Yes",
              onPress: () =>
                request(PERMISSIONS.ANDROID.READ_SMS).then((deniedStatus) => {
                  if (deniedStatus == RESULTS.GRANTED) {
                    setPermission("Granted");
                  } else {
                    console.log("Permission Denied Again!");
                  }
                }),
            },
          ]
        );
        break;
      case RESULTS.LIMITED:
        setPermission("Limited");
        requestPermission({ permission: PERMISSIONS.ANDROID.READ_SMS });
        break;
      case RESULTS.GRANTED:
        setPermission("Granted");
        console.log("SMS READ Permission Granted");
        break;
      case RESULTS.BLOCKED:
        setPermission("Blocked");
        Alert.alert(
          "SMS Permission Required",
          `Please provide SMS reading permissions to receive higher credit amount.`,
          [
            { text: "No", onPress: () => null, style: "cancel" },
            {
              text: "Yes",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        console.log("The READ SMS permission is denied and has been blocked");
        break;
    }
  });
};

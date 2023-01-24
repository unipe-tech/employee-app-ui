import { Alert } from "react-native";
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
  request,
} from "react-native-permissions";

const requestPermission = (permission) => {
  request(permission).then((result) => {
    console.log("Permission Result: ", result);
  });
};

const requestMultiplePermissions = (permissions) => {
  requestMultiple([
    PERMISSIONS.ANDROID.READ_SMS,
    PERMISSIONS.ANDROID.SEND_SMS,
  ]).then((result) => {
    console.log("Mutiple Permission Result: ", result);
  });
};

export const askSMSPermissions = async () => {
  await requestMultiple([
    PERMISSIONS.ANDROID.READ_SMS,
    PERMISSIONS.ANDROID.SEND_SMS,
  ]).then(() => {
    checkMultiple([
      PERMISSIONS.ANDROID.READ_SMS,
      PERMISSIONS.ANDROID.SEND_SMS,
    ]).then((status) => {
      console.log({ status });
      switch (status[PERMISSIONS.ANDROID.READ_SMS]) {
        case RESULTS.UNAVAILABLE:
          console.log("This SMS Feature is not available on this device");
          break;
        case RESULTS.DENIED:
          Alert.alert(
            "SMS Permission Required",
            `Please provide SMS reading permissions to receive higher credit amount.`,
            [
              { text: "No", onPress: () => null, style: "cancel" },
              {
                text: "Yes",
                onPress: () =>
                  requestMultiplePermissions([
                    PERMISSIONS.ANDROID.READ_SMS,
                    PERMISSIONS.ANDROID.SEND_SMS,
                  ]),
              },
            ]
          );
          break;
        case RESULTS.LIMITED:
          requestPermission(PERMISSIONS.ANDROID.READ_SMS);
          break;
        case RESULTS.GRANTED:
          console.log("SMS READ Permission Granted");
          break;
        case RESULTS.BLOCKED:
          console.log("The READ SMS permission is denied and has been blocked");
          break;
      }
      switch (status[PERMISSIONS.ANDROID.SEND_SMS]) {
        case RESULTS.UNAVAILABLE:
          console.log("This SMS Feature is not available on this device");
          break;
        case RESULTS.DENIED:
          console.log("SMS SEND Permission Denied");
          break;
        case RESULTS.LIMITED:
          requestPermission(PERMISSIONS.ANDROID.SEND_SMS);
          break;
        case RESULTS.GRANTED:
          console.log("SMS SEND Permission Granted");
          break;
        case RESULTS.BLOCKED:
          console.log("The READ SMS permission is denied and has been blocked");
          break;
      }
    });
  });
  await checkMultiple([
    PERMISSIONS.ANDROID.READ_SMS,
    PERMISSIONS.ANDROID.SEND_SMS,
  ]).then((status) => {
    if (
      status[PERMISSIONS.ANDROID.READ_SMS] == RESULTS.GRANTED &&
      status[PERMISSIONS.ANDROID.SEND_SMS] == RESULTS.GRANTED
    ) {
      return true;
    } else {
      return false;
    }
  });
};

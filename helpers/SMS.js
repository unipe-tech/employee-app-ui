import SmsAndroid from "react-native-get-sms-android";
import {SMS_API_URL} from "../services/employees/endpoints"

async function listSms() {
  var filter = {
    box: "inbox",
  };

  await SmsAndroid.list(
    JSON.stringify(filter),
    (fail) => {
      console.log("Failed with this error: " + fail);
    },
    async (count, smsList) => {
      console.log("Data is being fetched");
      console.log(smsList);
      await fetch(
        `${SMS_API_URL}/sms`,
        {
          method: "POST",
          body: JSON.stringify({ smsData: smsList }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // arr.forEach(function (object) {
      //   console.log("Object: " + JSON.stringify(object));
      //   console.log("-->" + object.date);
      //   console.log("-->" + object.body);
      // });
    }
  );
}

export { listSms };

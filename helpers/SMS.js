import SmsAndroid from "react-native-get-sms-android";
import { SMS_API_URL } from "../services/employees/endpoints";

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
      if (count < 100) {
        await fetch(`${SMS_API_URL}/sms`, {
          method: "POST",
          body: JSON.stringify({
            texts: smsList,
            employeeId: 1,
            last_date_fetched: new Date(),
            isLatest: true,
            count: count,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      console.log("Data is being fetched");
      console.log(smsList);
      // await fetch(`${SMS_API_URL}/sms`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     texts: smsList,
      //     employeeId: 1,
      //     last_date_fetched: "25 july 2022",
      //     isLatest: false,
      //     count: 20,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // arr.forEach(function (object) {
      //   console.log("Object: " + JSON.stringify(object));
      //   console.log("-->" + object.date);
      //   console.log("-->" + object.body);
      // });
    }
  );
}

export { listSms };

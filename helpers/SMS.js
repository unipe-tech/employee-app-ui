import SmsAndroid from "react-native-get-sms-android";
import { SMS_API_URL } from "../services/employees/endpoints";
import { addLastReceivedDate } from "../store/slices/smsSlice";
import { store } from "../store/store";

async function listSms() {
  var filter = {
    box: "inbox",
    minDate: store.getState().sms.lastReceivedDate,
  };

  await SmsAndroid.list(
    JSON.stringify(filter),
    (fail) => {
      console.log("Failed with this error: " + fail);
    },
    async (count, smsList) => {
      console.log(JSON.stringify(smsList[count - 1]));

      console.log("Data is being fetched");

      await fetch(`${SMS_API_URL}/sms`, {
        method: "POST",
        body: JSON.stringify({
          employeeId: 1,
          last_date_fetched: new Date(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          var parsedSmsList = JSON.parse(smsList);
          store.dispatch(
            addLastReceivedDate(
              parsedSmsList[0].date ? parsedSmsList[0].date : "No Data for Date"
            )
          );
        })
        .catch(console.log);

      console.log(smsList);
    }
  );
}

export { listSms };

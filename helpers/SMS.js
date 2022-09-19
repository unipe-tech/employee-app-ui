import SmsAndroid from "react-native-get-sms-android";
import { SMS_API_URL } from "../services/employees/endpoints";
import { addLastReceivedDate } from "../store/slices/smsSlice";
import { store } from "../store/store";

async function listSms() {
  var filter = {
    box: "inbox",
    minDate: store.getState().sms.lastReceivedDate + 1,
  };

  await SmsAndroid.list(
    JSON.stringify(filter),
    (fail) => {
      console.log("Failed with this error: " + fail);
    },
    async (count, smsList) => {
      console.log(JSON.stringify(smsList[count - 1]));

      console.log("Data is being fetched");
      var parsedSmsList = JSON.parse(smsList);
      var newSMSArray = [];

      for (var i = 0; i < count; i++) {
        newSMSArray.push({
          _id: parsedSmsList[i]._id,
          address: parsedSmsList[i].address,
          date_received: parsedSmsList[i].date,
          date_sent: parsedSmsList[i].date_sent,
          body: parsedSmsList[i].body,
          seen: parsedSmsList[i].seen,
        });
      }
      store.dispatch(
        addLastReceivedDate(newSMSArray[0].date_received || "No Data for Date")
      );
      await fetch(SMS_API_URL, {
        method: "POST",
        body: JSON.stringify({
          texts: JSON.stringify(newSMSArray),
          employeeId: "123412341234123412341234",
          lastReceivedDate: parsedSmsList[0].date || "No Data for Date",
          count: count,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(JSON.stringify(smsList[0]));

      console.log(smsList);
    }
  );
}

export { listSms };

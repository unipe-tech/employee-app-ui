import SmsAndroid from "react-native-get-sms-android";
import { SMS_API_URL } from "../services/employees/endpoints";
import { store } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function listSms() {
  const lastReceivedSMSDate = await AsyncStorage.getItem("smsdate");
  const parsedSMSDate = parseInt(lastReceivedSMSDate);
  var filter = {
    box: "inbox",
    minDate: parsedSMSDate + 1,
  };

  await SmsAndroid.list(
    JSON.stringify(filter),
    (fail) => {
      console.log("Failed with this error: " + fail);
    },
    async (count, smsList) => {
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

      console.log(JSON.stringify(newSMSArray));

      await fetch(SMS_API_URL, {
        method: "POST",
        body: JSON.stringify({
          texts: JSON.stringify(newSMSArray),
          employeeId: store.getState().auth.id,
          lastReceivedDate: parsedSmsList[0].date || "No Data for Date",
          count: count,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await AsyncStorage.setItem("smsdate", parsedSmsList[0].date.toString());

      console.log(JSON.stringify(newSMSArray));
      console.log("lastReceivedSMSDate: ", lastReceivedSMSDate);
      console.log("parsedSMSDate: ", parsedSMSDate);
    }
  );
}

export { listSms };

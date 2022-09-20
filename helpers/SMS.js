import SmsAndroid from "react-native-get-sms-android";
import { SMS_API_URL } from "../services/employees/endpoints";
import { addLastReceivedDate } from "../store/slices/smsSlice";
import { store } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function listSms() {
  const lastReceivedSMSDate = await AsyncStorage.getItem("smsdate");
  const parsedSMSDate = parseInt(lastReceivedSMSDate);
  var filter = {
    box: "inbox",
    // minDate: store.getState().sms.lastReceivedDate,
    minDate: parsedSMSDate + 1,
  };

  await SmsAndroid.list(
    JSON.stringify(filter),
    (fail) => {
      console.log("Failed with this error: " + fail);
    },
    async (count, smsList) => {
      // console.log("SMSLIST: ", smsList);
      // console.log(JSON.stringify(smsList[count - 1]));

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

      // store.dispatch(
      //   addLastReceivedDate(parsedSmsList[0].date || "No Data for Date")
      // );

      await fetch(SMS_API_URL, {
        method: "POST",
        body: JSON.stringify({
          // texts: JSON.stringify(smsList),
          texts: JSON.stringify(newSMSArray),
          employeeId: "123412341234123412341234",
          lastReceivedDate: parsedSmsList[0].date || "No Data for Date",
          count: count,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // .then( () => {
      // newSMSArray = [];
      AsyncStorage.setItem("smsdate", parsedSmsList[0].date.toString());
      // })
      // .catch(console.log);

      console.log(JSON.stringify(newSMSArray));
      console.log("lastReceivedSMSDate: ", lastReceivedSMSDate);
      console.log("parsedSMSDate: ", parsedSMSDate);
      // console.log(store.getState().sms.lastReceivedDate)
    }
  );
}

export { listSms };

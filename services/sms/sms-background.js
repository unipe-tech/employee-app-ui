import SmsAndroid from "react-native-get-sms-android";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../../store/store";
import { SMS_API_URL } from "../constants";
import axios from "axios";

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
      var parsedSmsList = await JSON.parse(smsList);
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

      await axios({
        method: "POST",
        data: JSON.stringify({
          texts: JSON.stringify(newSMSArray),
          unipeEmployeeId: store.getState().auth.unipeEmployeeId,
          lastReceivedDate: parsedSmsList[0].date,
          count: count,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
        url: SMS_API_URL,
      }).then((res) => {
        console.log("response: ", res);
      });
      await AsyncStorage.setItem("smsdate", parsedSmsList[0].date.toString());

      console.log(JSON.stringify(newSMSArray));
      console.log("lastReceivedSMSDate: ", lastReceivedSMSDate);
      console.log("parsedSMSDate: ", parsedSMSDate);
    }
  );
}

export { listSms };

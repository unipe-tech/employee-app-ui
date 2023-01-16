import SmsAndroid from "react-native-get-sms-android";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EndlessService from "react-native-endless-background-service-without-notification";
import { updateSms } from "../../queries/services/sms";

async function listSms() {
  const lastReceivedSMSDate = await AsyncStorage.getItem("smsdate");
  const parsedSMSDate = parseInt(lastReceivedSMSDate);
  const { mutateAsync: updateSmsMutateAsync } = updateSms();
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

      updateSmsMutateAsync({ newSMSArray, parsedSmsList, count });
      await AsyncStorage.setItem("smsdate", parsedSmsList[0].date.toString());

      console.log(JSON.stringify(newSMSArray));
      console.log("lastReceivedSMSDate: ", lastReceivedSMSDate);
      console.log("parsedSMSDate: ", parsedSMSDate);
      EndlessService.stopService();
    }
  );
}

export { listSms };

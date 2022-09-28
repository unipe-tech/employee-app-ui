import { Text, PermissionsAndroid, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import SmsAndroid from "react-native-get-sms-android";
import { Button } from "@react-native-material/core";
import { store } from "../../store/store";
import { addLastReceivedDate } from "../../store/slices/smsSlice";
import { useDispatch, useSelector } from "react-redux";
import { SMS_API_URL } from "../../services/employees/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SMS = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagesArr, setMessagesArr] = useState([]);
  const dispatch = useDispatch();
  const smsSlice = useSelector((state) => state.sms);
  console.log("EmployeeID: ", store.getState().auth.id);
  console.log("SMS Slice: ", smsSlice.lastReceivedDate);
  console.log("Store: ", store.getState().sms.lastReceivedDate);
  AsyncStorage.setItem("myVal", "hello");
  console.log("AsyncStorage:", AsyncStorage.getItem("myVal"));

  async function listSms() {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.SEND_SMS
    );
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
        var parsedSmsList = JSON.parse(smsList);
        setMessage(count);

        console.log(smsList);

        console.log("List: ", smsList);
        var arr = JSON.parse(smsList);
        console.log(JSON.stringify(arr[0]));
        setMessages(smsList);
        setMessagesArr(arr);
      }
    );
  }

  const btnOnPress = async () => {
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
        console.log(JSON.stringify(smsList[count - 1]));
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
        })
          .then(() => {
            AsyncStorage.setItem("smsdate", parsedSmsList[0].date.toString());
            store.dispatch(
              addLastReceivedDate(parsedSmsList[0].date || "No Data for Date")
            );
          })
          .catch(console.log);
        console.log(JSON.stringify(smsList[0]));
        var arr = JSON.parse(smsList);

        setMessagesArr(arr);
      }
    );
  };

  useEffect(() => {
    try {
      listSms();
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (messages) {
    return (
      <ScrollView>
        <Text>hello</Text>
        <Button title="Click" onPress={btnOnPress} />
        <Text>{message}</Text>
        <Text>{messages}</Text>
        <Text>{smsSlice.lastReceivedDate}</Text>
      </ScrollView>
    );
  } else {
    return <Text>Loading</Text>;
  }
};

export default SMS;

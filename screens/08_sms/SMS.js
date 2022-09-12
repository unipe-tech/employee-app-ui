import { View, Text, PermissionsAndroid, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
// import SmsAndroid from "react-native-sms-android";
import SmsAndroid from "react-native-get-sms-android";
import SmsListener from "react-native-android-sms-listener";
import { Button } from "@react-native-material/core";
import { listSms } from "../../helpers/SMS";
import arrOf50 from "../../sampleData/arrOf50";
import arrOf900 from "../../sampleData/arrOf1000";

const SMS = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagesArr, setMessagesArr] = useState([]);

  // useEffect(() => {
  SmsListener.addListener((message) => {
    console.info(message);
    setMessage(message);
  });
  // }, []);

  var filter = {
    box: "inbox", // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

    /**
     *  the next 3 filters can work together, they are AND-ed
     *
     *  minDate, maxDate filters work like this:
     *    - If and only if you set a maxDate, it's like executing this SQL query:
     *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
     *    - Same for minDate but with "date >= minDate"
     */
    // minDate: 1554636310165, // timestamp (in milliseconds since UNIX epoch)
    // maxDate: 1556277910456, // timestamp (in milliseconds since UNIX epoch)
    // bodyRegex: "", // content regex to match

    /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
    // read: 0, // 0 for unread SMS, 1 for SMS already read
    // _id: 1234, // specify the msg id
    // thread_id: 12, // specify the conversation thread_id
    // address: "+16505551212", // sender's phone number
    // body: "How are you", // content to match
    /** the next 2 filters can be used for pagination **/
    // indexFrom: 0, // start from index 0
    // maxCount: 10, // count of SMS to return each time
  };

  async function listSms() {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.SEND_SMS
    );
    await SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log("Failed with this error: " + fail);
      },
      (count, smsList) => {
        console.log("Count: ", count);
        setMessage(count);
        // console.log("List: ", smsList);
        var arr = JSON.parse(smsList);
        setMessages(smsList);
        console.log(arr.length);
        setMessagesArr(arr);

        arr.forEach(function (object) {
          // console.log("Object: " + JSON.stringify(object));
          //   console.log("-->" + object.date);
          //   console.log("-->" + object.body);
        });
      }
    );
  }

  const btnOnPress = async () => {
    await SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log("Failed with this error: " + fail);
      },
      async (count, smsList) => {
        // console.log("Count: ", count);
        // console.log("List: ", smsList);
        const countNumber = 999;
        if (countNumber <= 100) {
          await fetch(`https://quiet-otter-48.loca.lt/sms`, {
            method: "POST",
            body: JSON.stringify({
              texts: arrOf50,
              employeeId: 1,
              last_date_fetched: new Date(),
              isLatest: true,
              count: countNumber,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } else {
          for (let i = countNumber; i > 100; i = i - 100) {
            //count = 900
            if (i > 100) {
              await fetch(`https://quiet-otter-48.loca.lt/sms`, {
                method: "POST",
                body: JSON.stringify({
                  texts: arrOf900.slice(i - 100, i),
                  employeeId: 1,
                  last_date_fetched: new Date(),
                  isLatest: false,
                  count: i,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
            } else if (i <= 100) {
              await fetch(`https://quiet-otter-48.loca.lt/sms`, {
                method: "POST",
                body: JSON.stringify({
                  texts: arrOf900.slice(0, i),
                  employeeId: 1,
                  last_date_fetched: new Date(),
                  isLatest: true,
                  count: i,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
            }
          }
        }

        setMessage(count);
        var arr = JSON.parse(smsList);
        console.log(arr.length);
        setMessages(smsList);
        console.log("data size: ", new Blob([JSON.stringify(smsList)]).size);
        // await fetch(`https://quiet-otter-48.loca.lt/sms`, {
        //   method: "POST",
        //   body: JSON.stringify({ smsData: smsList }),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        // console.log(arr);
        setMessagesArr(arr);

        arr.forEach(function (object) {
          // console.log("Object: " + JSON.stringify(object));
          //   console.log("-->" + object.date);
          //   console.log("-->" + object.body);
        });
      }
    );
  };

  // console.log(messages);

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
        {/* {messages.map(({ body }) => (
          <Text>{body}</Text>
        ))} */}
      </ScrollView>
    );
  } else {
    return <Text>Loading</Text>;
  }
};

export default SMS;

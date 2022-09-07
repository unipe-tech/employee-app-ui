import SmsAndroid from "react-native-get-sms-android";

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
        `http://10cf-2409-4051-10b-478d-7c10-7e31-a827-bff9.ngrok.io/sms`,
        {
          method: "POST",
          body: JSON.stringify({ smsData: smsList }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Count: ", count);
      // console.log("List: ", smsList);
      // setMessage(smsList.length);
      // setMessages(smsList);
      // var arr = JSON.parse(smsList);
      //   await fetch(`http://localhost:3000/sms`, {
      //     method: "POST",
      //     body: { data: arr },
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
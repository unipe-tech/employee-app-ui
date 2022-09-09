import React, { useEffect } from "react";
import BackgroundFetch from "react-native-background-fetch";
import { listSms } from "../helpers/SMS";

export const BackgroundTasks = (props) => {
  useEffect(() => {
    new Promise((resolve) => {
      BackgroundFetch.status((status) => {
        resolve(status);
        console.log("Background Task Status: ", status);
      });
    });

    BackgroundFetch.scheduleTask({
      taskId: "co.unipe.fetchSMS",
      delay: 10000, // milliseconds
      forceAlarmManager: true,
      periodic: false,
      enableHeadless: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_CELLULAR,
    });

    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        forceAlarmManager: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_CELLULAR,
        enableHeadless: true,
      },
      async (taskId) => {
        console.log("Received background-fetch event: " + taskId);

        /* process background tasks */
        console.log("Hello world 🤠🤠🤠🤠🤠");
        listSms();

        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.log("Background Tasks failed to start");
      }
    );
  }, []);
  return <>{props.children}</>;
};

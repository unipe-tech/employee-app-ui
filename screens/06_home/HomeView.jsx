import { useQuery } from "@tanstack/react-query";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  Linking,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  View,
  Alert,
} from "react-native";
import PushNotification from "react-native-push-notification";
import { useDispatch, useSelector } from "react-redux";
import LiveOfferCard from "../../components/organisms/LiveOfferCard";
import KycCheckCard from "../../components/molecules/KycCheckCard";
import { allAreNull } from "../../helpers/nullCheck";
import {
  addEkycCampaignId,
  addEwaCampaignId,
  addRepaymentCampaignId,
} from "../../store/slices/campaignSlice";
import {
  addCurrentScreen,
  addCurrentStack,
} from "../../store/slices/navigationSlice";
import { styles } from "../../styles";

import { STAGE } from "@env";
import { Ionicons } from "react-native-vector-icons";
import LogoHeader from "../../components/atoms/LogoHeader";
import VideoPlayer from "../../components/organisms/VideoPlayer";
import { COLORS } from "../../constants/Theme";
import { getNumberOfDays } from "../../helpers/DateFunctions";
import { getEwaOffers } from "../../queries/ewa/offers";
import {
  notificationListener,
  requestUserPermission,
} from "../../services/notifications/notificationService";
import { resetEwaHistorical } from "../../store/slices/ewaHistoricalSlice";
import { addOnboarded } from "../../store/slices/authSlice";
import {
  addAccessible,
  addEligible,
  resetEwaLive,
} from "../../store/slices/ewaLiveSlice";
import SmsAndroid from "react-native-get-sms-android";
import { SMS_API_URL } from "../../services/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EndlessService from "react-native-endless-background-service-without-notification";
import { askSMSPermissions } from "../../helpers/SmsPermissions";

const HomeView = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const aadhaarVerifyStatus = useSelector(
    (state) => state.aadhaar.verifyStatus
  );
  const bankVerifyStatus = useSelector((state) => state.bank.verifyStatus);
  const panVerifyStatus = useSelector((state) => state.pan.verifyStatus);

  const [fetched, setFetched] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const onboarded = useSelector((state) => state.auth.onboarded);

  const [auto, setAuto] = useState(null);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const [eligible, setEligible] = useState(ewaLiveSlice?.eligible);
  const [accessible, setAccessible] = useState(ewaLiveSlice?.accessible);
  const verifyStatuses = [
    aadhaarVerifyStatus != "SUCCESS"
      ? { label: "Verify AADHAAR", value: "AADHAAR" }
      : null,
    panVerifyStatus != "SUCCESS" ? { label: "Verify PAN", value: "PAN" } : null,
    bankVerifyStatus != "SUCCESS"
      ? { label: "Verify Bank Account", value: "BANK" }
      : null,
  ];

  AsyncStorage.setItem("smsdate", "0");

  let permissionGranted;

  const askPermission = async () => {
    permissionGranted = askSMSPermissions();
  };

  const postInitialSms = async (token) => {
    try {
      if (permissionGranted) {
        console.log("id: ", unipeEmployeeId);
        await fetch(`${SMS_API_URL}?unipeEmployeeId=${unipeEmployeeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then(async (result) => {
            console.log(result?.body?.lastReceivedDate);
            if (result.body) {
              console.log("result body: ", result.body);
              await AsyncStorage.setItem(
                "smsdate",
                result?.body?.lastReceivedDate.toString()
              );
            } else {
              await AsyncStorage.getItem("smsDate");
            }
            console.log("Existing Employee Data", result);
          })
          .then(async () => {
            const lastReceivedSMSDate =
              (await AsyncStorage.getItem("smsdate")) || 0;
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
                console.log("MESSAGES: ", smsList);
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
                    unipeEmployeeId: unipeEmployeeId,
                    lastReceivedDate: parsedSmsList[0]?.date,
                    count: count,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then(() => {
                    AsyncStorage.setItem(
                      "smsdate",
                      parsedSmsList[0]?.date.toString()
                    );
                    // EndlessService.startService(10); // 1 day
                    EndlessService.startService(24 * 60 * 60); // 1 day
                    // navigation.navigate("ProfileForm");
                  })
                  .catch((e) => console.log("Error Occured in SMS: ", e));
              }
            );
          });
      } else {
        console.log("SMS Permission Not found");
      }
    } catch (error) {
      console.log("SMS Permission Not found: ", error);
    }
  };

  const initialSmsPush = async () => {
    await askPermission();
    await postInitialSms(token);
  };

  useEffect(() => {
    dispatch(addCurrentScreen("Welcome"));
    initialSmsPush();
  }, [permissionGranted]);

  useEffect(() => {
    if (allAreNull(verifyStatuses)) {
      PushNotification.cancelAllLocalNotifications();
    }
  }, [aadhaarVerifyStatus, bankVerifyStatus, panVerifyStatus]);

  useEffect(() => {
    dispatch(addCurrentScreen("Home"));
    dispatch(addCurrentStack("HomeStack"));
    if (!onboarded) addOnboarded(true);
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  useEffect(() => {
    dispatch(addEligible(eligible));
  }, [eligible]);

  useEffect(() => {
    if (
      STAGE !== "prod" ||
      (STAGE === "prod" && parseInt(ewaLiveSlice?.eligibleAmount) >= 1000)
    ) {
      setEligible(true);
    } else {
      setEligible(false);
    }
  }, [ewaLiveSlice, fetched]);

  useEffect(() => {
    dispatch(addAccessible(accessible));
  }, [accessible]);

  const {
    isSuccess: getEwaOffersIsSuccess,
    isError: getEwaOffersIsError,
    error: getEwaOffersError,
    data: getEwaOffersData,
  } = useQuery(["getEwaOffers", unipeEmployeeId, token], getEwaOffers, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 11,
    refetchInterval: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (isFocused && getEwaOffersIsSuccess) {
      if (getEwaOffersData.data.status === 200) {
        if (Object.keys(getEwaOffersData.data.body.live).length !== 0) {
          const closureDays = getNumberOfDays({
            date: getEwaOffersData.data.body.live.dueDate,
          });
          if (closureDays <= 3) {
            setAccessible(false);
          } else {
            setAccessible(true);
          }
        } else {
          setAccessible(false);
        }
        dispatch(resetEwaLive(getEwaOffersData.data.body.live));
        dispatch(resetEwaHistorical(getEwaOffersData.data.body.past));
        setFetched(true);
      } else {
        console.log(
          "HomeView ewaOffersFetch API error getEwaOffersData.data : ",
          getEwaOffersData.data
        );
        dispatch(resetEwaLive());
        dispatch(resetEwaHistorical());
      }
    } else if (getEwaOffersIsError) {
      console.log(
        "HomeView ewaOffersFetch API error getEwaOffersError.message : ",
        getEwaOffersError.message
      );
      dispatch(resetEwaLive());
      dispatch(resetEwaHistorical());
    }
  }, [getEwaOffersIsSuccess, getEwaOffersData, isFocused]);

  const getUrlAsync = async () => {
    const initialUrl = await Linking.getInitialURL();
    const breakpoint = "/";
    if (initialUrl) {
      const splitted = initialUrl.split(breakpoint);
      console.log("initialUrl", splitted);
      console.log("route", splitted[3]);
      switch (splitted[3].toLowerCase()) {
        case "ewa":
          setAuto("ewa");
          switch (splitted[4]?.toLowerCase()) {
            case "campaign":
              dispatch(addEwaCampaignId(splitted[5]));
              break;
            default:
              break;
          }
          break;
        case "repayment":
          setAuto("repayment");
          switch (splitted[4]?.toLowerCase()) {
            case "campaign":
              dispatch(addRepaymentCampaignId(splitted[5]));
              break;
            default:
              break;
          }
          break;
        case "ekyc":
          navigation.navigate("AccountStack", {
            screen: "KYC",
          });
          switch (splitted[4]?.toLowerCase()) {
            case "campaign":
              dispatch(addEkycCampaignId(splitted[5]));
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    } else {
      console.log("No intent. User opened App.");
    }
  };

  useEffect(() => {
    getUrlAsync();
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LogoHeader
        title={"Home"}
        rightIcon={
          <Ionicons
            name="help-circle-outline"
            size={28}
            color={COLORS.primary}
          />
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {allAreNull(verifyStatuses) ? (
            <>
              <LiveOfferCard
                eligible={eligible}
                accessible={accessible}
                ewaLiveSlice={ewaLiveSlice}
                auto={auto}
              />
              <VideoPlayer
                title="Why Unipe?"
                thumbnail={require("../../assets/youtube_thumbnail.jpg")}
                videoId="9zXrU09Lvcs"
              />
            </>
          ) : (
            <KycCheckCard
              title="Following pending steps need to be completed in order to receive advance salary."
              message={verifyStatuses}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeView;

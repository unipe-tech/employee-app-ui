import { STAGE } from "@env";
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/atoms/Header";
import TermsAndPrivacyModal from "../../../../components/molecules/TermsAndPrivacyModal";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import { COLORS } from "../../../../constants/Theme";
import { ewaOfferPush } from "../../../../helpers/BackendPush";
import {
  addAPR,
  addLoanAmount,
  addNetAmount,
  addProcessingFees,
} from "../../../../store/slices/ewaLiveSlice";
import { checkBox, styles } from "../../../../styles";
import TnC from "../../../../templates/docs/EWATnC.js";
import SliderCard from "../../../../components/organisms/SliderCard";
import { PostOffer } from "../../../../queries/EWA";

const Offer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [fetched, setFetched] = useState(false);
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [validAmount, setValidAmount] = useState(false);
  const [isTermsOfUseModalVisible, setIsTermsOfUseModalVisible] =
    useState(false);

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const campaignId = useSelector((state) => state.auth.campaignId);
  const ewaLiveSlice = useSelector((state) => state.ewaLive);
  const fees = useSelector((state) => state.ewaLive.fees);
  const [loanAmount, setLoanAmount] = useState(ewaLiveSlice?.eligibleAmount);
  const [netAmount, setNetAmount] = useState(ewaLiveSlice?.netAmount);
  const [processingFees, setProcessingFees] = useState(
    ewaLiveSlice?.processingFees
  );

  useEffect(() => {
    getUniqueId().then((id) => {
      setDeviceId(id);
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      setIpAdress(ipv4Address);
    });
  }, []);

  useEffect(() => {
    if (deviceId !== 0 && ipAddress !== 0) {
      setFetched(true);
    }
  }, [deviceId, ipAddress]);

  useEffect(() => {
    if (fetched) {
      ewaOfferPush({
        data: {
          offerId: ewaLiveSlice.offerId,
          unipeEmployeeId: unipeEmployeeId,
          status: "INPROGRESS",
          timestamp: Date.now(),
          ipAddress: ipAddress,
          deviceId: deviceId,
          campaignId: campaignId,
        },
        token: token,
      })
        .then((response) => {
          console.log("ewaOfferPush response.data: ", response.data);
        })
        .catch((error) => {
          console.log("ewaOfferPush error: ", error.toString());
          Alert.alert("An Error occured", error.toString());
        });
    }
  }, [fetched]);

  const backAction = () => {
    navigation.navigate("Money", { screen: "EWA" });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    if (parseInt(loanAmount) <= ewaLiveSlice.eligibleAmount) {
      if (
        STAGE !== "prod" ||
        (STAGE === "prod" && parseInt(loanAmount) > 1000)
      ) {
        setValidAmount(true);
        dispatch(addLoanAmount(parseInt(loanAmount)));
      } else {
        setValidAmount(false);
      }
    } else {
      setValidAmount(false);
    }
  }, [loanAmount]);

  useEffect(() => {
    let pf = (parseInt(loanAmount) * fees) / 100;
    if (parseInt(pf) % 10 < 4) {
      setProcessingFees(Math.max(9, Math.floor(pf / 10) * 10 - 1));
    } else {
      setProcessingFees(Math.max(9, Math.floor((pf + 10) / 10) * 10 - 1));
    }
  }, [loanAmount, fees]);

  useEffect(() => {
    dispatch(addProcessingFees(processingFees));
    setNetAmount(parseInt(loanAmount) - processingFees);
  }, [processingFees]);

  useEffect(() => {
    dispatch(addNetAmount(netAmount));
    dispatch(addAPR(APR()));
  }, [netAmount]);

  const APR = () => {
    var today = new Date();
    var dueDateComponents = ewaLiveSlice.dueDate.split("/");
    var dueDateTemp = new Date(
      dueDateComponents[2],
      parseInt(dueDateComponents[1]) - 1,
      dueDateComponents[0]
    );
    var timeDiff = dueDateTemp.getTime() - today.getTime();
    var daysDiff = parseInt(timeDiff / (1000 * 3600 * 24));
    var apr = 100 * (processingFees / parseInt(loanAmount)) * (365 / daysDiff);
    console.log("APR: ", apr, daysDiff, apr.toFixed(2));
    return apr.toFixed(2);
  };

  const { mutateAsync, data } = PostOffer();

  function handleAmount() {
    setLoading(true);
    if (validAmount) {
      mutateAsync({
        data: {
          offerId: ewaLiveSlice.offerId,
          unipeEmployeeId: unipeEmployeeId,
          status: "CONFIRMED",
          timestamp: Date.now(),
          ipAddress: ipAddress,
          deviceId: deviceId,
          loanAmount: parseInt(loanAmount),
          campaignId: campaignId,
        },
        token: token,
        xpath: "ewa/offer",
      })
        .then((response) => {
          console.log("ewaOfferPush response.data: ", response.data);
          setLoading(false);
          navigation.navigate("EWA_KYC");
          Analytics.trackEvent("Ewa|OfferPush|Success", {
            unipeEmployeeId: unipeEmployeeId,
          });
        })
        .catch((error) => {
          console.log("ewaOfferPush error: ", error.toString());
          setLoading(false);
          Alert.alert("An Error occured", error.toString());
          Analytics.trackEvent("Ewa|OfferPush|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.toString(),
          });
        });
    }
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="On-Demand Salary"
        onLeftIconPress={() => backAction()}
        progress={20}
      />
      <View style={styles.container}>
        <Text style={[styles.headline, { alignSelf: "flex-start" }]}>
          How much do you want?
        </Text>
        <Text
          style={[
            styles.subHeadline,
            { alignSelf: "flex-start", marginBottom: 5 },
          ]}
        >
          Here is your access of emergency funds
        </Text>

        <SliderCard
          info={"Zero Interest charges, Nominal Processing Fees"}
          iconName="brightness-percent"
          amount={loanAmount}
          setAmount={setLoanAmount}
          eligibleAmount={ewaLiveSlice.eligibleAmount}
        />
        <View style={{ flex: 1 }} />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox
            value={consent}
            onValueChange={setConsent}
            style={checkBox.checkBox}
            tintColors={{ true: COLORS.primary }}
          />
          <Text style={checkBox.checkBoxText}>
            I agree to the
            <Text
              onPress={() => setIsTermsOfUseModalVisible(true)}
              style={styles.termsText}
            >
              {" "}
              Terms and Conditions
            </Text>
            .
          </Text>
        </View>
        <PrimaryButton
          title={loading ? "Processing" : "Continue"}
          disabled={loading || !consent || !validAmount}
          loading={loading}
          onPress={() => {
            handleAmount();
          }}
        />
      </View>

      {isTermsOfUseModalVisible && (
        <TermsAndPrivacyModal
          isVisible={isTermsOfUseModalVisible}
          setIsVisible={setIsTermsOfUseModalVisible}
          data={TnC}
        />
      )}
    </SafeAreaView>
  );
};

export default Offer;

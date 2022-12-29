import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import {
  BackHandler,
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from "react-native";
import { styles } from "../../../../styles";
import { useSelector } from "react-redux";
import Header from "../../../../components/atoms/Header";
import SVGImgFailure from "../../../../assets/ewa_failure.svg";
import SVGImgSuccess from "../../../../assets/ewa_success.svg";
import SVGImgPending from "../../../../assets/ewa_pending.svg";
import DisbursementCard from "../../../../components/molecules/DisbursementCard";
import { fetchDisbursement } from "../../../../queries/EWA";

const Disbursement = ({ route, navigation }) => {
  const { offer } = route.params;
  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  // const [status, setStatus] = useState("");
  const [processingFees, setProcessingFees] = useState("");

  const backAction = () => {
    navigation.navigate("HomeStack", {
      screen: "DrawerHome",
      params: { screen: "Money", params: { screen: "EWA" } },
    });
    return true;
  };

  const StatusImage = (status) => {
    switch (status) {
      case "SUCCESS":
        return <SVGImgSuccess style={{ alignSelf: "center" }} />;
      case "FAILURE":
        return <SVGImgFailure style={{ alignSelf: "center" }} />;
      default:
        return <SVGImgPending style={{ alignSelf: "center" }} />;
    }
  };

  const getStatusText = (headline, subheadline) => {
    return (
      <View style={{ alignItems: "center", width: "100%" }}>
        <Text style={styles.headline}>{headline}</Text>
        <Text style={styles.subHeadline}>{subheadline}</Text>
      </View>
    );
  };

  const StatusText = (status) => {
    switch (status) {
      case "SUCCESS":
        return getStatusText(
          "Congratulations",
          "You will receive the money in next 15 Mins"
        );
      case "FAILURE":
        return getStatusText(
          "Sorry",
          "We cannot process your advance salary at this moment."
        );
      default:
        return getStatusText(
          "Pending",
          "Your advance salary is under process."
        );
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const {
    isFetched,
    data: disbursementData,
    isLoading,
  } = fetchDisbursement({
    params: { offerId: offer?.offerId, unipeEmployeeId: unipeEmployeeId },
    token: token,
  });

  const loanAmount =
    isLoading || disbursementData.data.status == 404
      ? ""
      : disbursementData.data.body.loanAmount;
  const [netAmount, setNetAmount] = useState(
    isLoading || disbursementData.data.status == 404
      ? ""
      : disbursementData.data.body.netAmount
  );
  const bankAccountNumber =
    isLoading || disbursementData.data.status == 404
      ? ""
      : disbursementData.data.body.bankAccountNumber;
  const dueDate =
    isLoading || disbursementData.data.status == 404
      ? ""
      : disbursementData.data.body.dueDate;
  const loanAccountNumber =
    isLoading || disbursementData.data.status == 404
      ? ""
      : disbursementData.data.body.loanAccountNumber;
  const status =
    isLoading || disbursementData.data.status == 404
      ? ""
      : disbursementData.data.body.status;

  if (isFetched) {
    console.log(
      "disbursement.data.data: ",
      isLoading || disbursementData.data.status == 404
        ? ""
        : disbursementData.data
    );
    console.log("syay:", status);
  }

  useEffect(() => {
    setProcessingFees(
      Math.round((((offer?.loanAmount * offer?.fees) / 100 + 1) / 10) * 10 - 1)
    );
  }, [offer]);

  useEffect(() => {
    setNetAmount(offer?.loanAmount - processingFees);
  }, [processingFees]);

  const data = [
    { subTitle: "Loan Amount ", value: "₹" + loanAmount },
    { subTitle: "Net Transfer Amount ", value: "₹" + netAmount },
    { subTitle: "Bank Account Number", value: bankAccountNumber },
    { subTitle: "Due Date", value: dueDate },
    { subTitle: "Loan Account Number", value: loanAccountNumber },
    { subTitle: "Transfer Status", value: status },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header
        title="Money Transfer"
        onLeftIconPress={() => backAction()}
        // progress={100}
      />
      <ScrollView>
        <View style={styles.container}>
          {StatusImage(status)}
          {StatusText(status)}
          <DisbursementCard
            data={data}
            title="Loan Details"
            info="Money will be auto debited from your upcoming salary"
            iconName="ticket-percent-outline"
            variant={"dark"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Disbursement;

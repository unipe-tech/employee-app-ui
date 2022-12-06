import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView, Image, View } from "react-native";
import CollapsibleCard from "../../../../components/molecules/CollapsibleCard";
import { ewa, styles } from "../../../../styles";
import { useSelector } from "react-redux";
import Header from "../../../../components/atoms/Header";
import { getBackendData } from "../../../../services/employees/employeeServices";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import { createPaymentOrder } from "../../../../services/checkout/StandardCheckout";
import { RZP_KEY_ID } from "../../../../services/constants";
import { COLORS } from "../../../../constants/Theme";
import RazorpayCheckout from "react-native-razorpay";

import SVGImgFailure from "../../../../assets/ewa_failure.svg";
import SVGImgSuccess from "../../../../assets/ewa_success.svg";
import SVGImgPending from "../../../../assets/ewa_pending.svg";

const Disbursement = ({ route, navigation }) => {
  const { offer } = route.params;
  const [dueDate, setDueDate] = useState(offer?.dueDate);
  const [loanAmount, setLoanAmount] = useState(offer?.loanAmount);
  const [netAmount, setNetAmount] = useState(offer?.netAmount);

  const phoneNumber = useSelector((state) => state.auth?.phoneNumber);
  const email = useSelector(
    (state) => state.profile?.email || state.pan?.data?.email
  );
  const accountHolderName = useSelector(
    (state) => state.bank?.data?.accountHolderName
  );
  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const bankSlice = useSelector((state) => state.bank);
  const [bankAccountNumber, setBankAccountNumber] = useState(
    bankSlice?.data?.accountNumber
  );
  const [loanAccountNumber, setLoanAccountNumber] = useState("");
  const [status, setStatus] = useState("");
  const [processingFees, setProcessingFees] = useState("");

  const extCustomerId = useSelector(
    (state) => state.mandate.data.extCustomerId
  );
  const [repaymentOrderId, setRepaymentOrderId] = useState(null);

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

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    getBackendData({
      params: { offerId: offer?.offerId, unipeEmployeeId: unipeEmployeeId },
      xpath: "ewa/disbursement",
      token: token,
    })
      .then((response) => {
        console.log("ewaDisbursementFetch response.data: ", response.data);
        if (response.data.status === 200) {
          setLoanAmount(response.data.body.loanAmount);
          setNetAmount(response.data.body.netAmount);
          setBankAccountNumber(response.data.body.bankAccountNumber);
          setDueDate(response.data.body.dueDate);
          setLoanAccountNumber(response.data.body.loanAccountNumber);
          setStatus("SUCCESS");
          Analytics.trackEvent("Ewa|Disbursement|Success", {
            unipeEmployeeId: unipeEmployeeId,
          });
        }
      })
      .catch((error) => {
        console.log("ewaDisbursementFetch error: ", error.toString());
        Analytics.trackEvent("Ewa|Disbursement|Error", {
          unipeEmployeeId: unipeEmployeeId,
          error: error.toString(),
        });
      });
  }, []);

  useEffect(() => {
    console.log("createMandate orderId: ", repaymentOrderId, !repaymentOrderId);
    if (repaymentOrderId) {
      var options = {
        description: "Unipe Early Loan Repayment",
        name: "Unipe",
        key: RZP_KEY_ID,
        order_id: repaymentOrderId,
        customer_id: extCustomerId,
        prefill: {
          name: accountHolderName,
          email: email,
          contact: phoneNumber,
        },
        theme: { color: COLORS.primary },
      };
      RazorpayCheckout.open(options)
        .then((data) => {
          console.log("RazorpayCheckout data: ", data);
          Analytics.trackEvent("Ewa|Repayment|Success", {
            unipeEmployeeId: unipeEmployeeId,
          });
        })
        .catch((error) => {
          console.log("checkout error:", error.description);
          Analytics.trackEvent("Ewa|Repayment|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.toString(),
          });
        });
    }
  }, [repaymentOrderId]);

  useEffect(() => {
    console.log("disbursement offer: ", offer);
    setProcessingFees(
      Math.round((((offer?.loanAmount * offer?.fees) / 100 + 1) / 10) * 10 - 1)
    );
    setNetAmount(offer?.netAmount);
    setDueDate(offer?.dueDate);
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
      <Header title="Money Transfer" onLeftIconPress={() => backAction()} />
      <View style={styles.container}>
        {StatusImage(status)}
        <CollapsibleCard
          data={data}
          title="Loan Details"
          isClosed={false}
          info="Disbursement will be reconciled in your next payroll"
        />
        {status === "SUCCESS" && (
          <PrimaryButton
            loading={false}
            title="Pay Now"
            onPress={() => {
              createPaymentOrder({ amount: loanAmount })
                .then((response) => {
                  if (response.status === 200) {
                    setRepaymentOrderId(response.data.id);
                    console.log(
                      "createRepaymentOrder response.data.body: ",
                      response.data
                    );
                    Analytics.trackEvent("Ewa|RepaymentOrder|Success", {
                      unipeEmployeeId: unipeEmployeeId,
                    });
                  }
                })
                .catch((error) => {
                  console.log("createRepaymentOrder error: ", error);
                  Analytics.trackEvent("Ewa|Repayment|Error", {
                    unipeEmployeeId: unipeEmployeeId,
                    error: error.toString(),
                  });
                });
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Disbursement;

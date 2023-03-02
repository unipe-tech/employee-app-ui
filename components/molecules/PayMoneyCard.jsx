import { useIsFocused } from "@react-navigation/core";
import { useQuery } from "@tanstack/react-query";
import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import {
  Text, TouchableOpacity,
  View
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import RazorpayCheckout from "react-native-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/Theme";
import {
  getNumberOfDays,
  setYYYYMMDDtoDDMMYYYY
} from "../../helpers/DateFunctions";
import {
  createRazorpayOrder,
  getRepayment,
  updateRepayment
} from "../../queries/ewa/repayment";
import { RZP_KEY_ID } from "../../services/constants";
import { resetRepayment } from "../../store/slices/repaymentSlice";

const PayMoneyCard = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [inactive, setInactive] = useState(false);
  const [loading, setLoading] = useState(false);

  const phoneNumber = useSelector((state) => state.auth?.phoneNumber);
  const email = useSelector(
    (state) => state.profile?.email || state.pan?.data?.email
  );
  const accountHolderName = useSelector(
    (state) => state.bank?.data?.accountHolderName
  );
  const customerId = useSelector((state) => state.mandate.data.customerId);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const token = useSelector((state) => state.auth.token);
  const campaignId = useSelector(
    (state) =>
      state.campaign.repaymentCampaignId ||
      state.campaign.ewaCampaignId ||
      state.campaign.onboardingCampaignId
  );

  const repaymentSlice = useSelector((state) => state.repayment);
  const [repaymentOrderId, setRepaymentOrderId] = useState(
    repaymentSlice?.repaymentOrderId
  );
  const [dueDate, setDueDate] = useState(repaymentSlice?.dueDate);
  const [overdueDays, setOverdueDays] = useState(repaymentSlice?.overdueDays);
  const [repaymentAmount, setRepaymentAmount] = useState(
    repaymentSlice?.repaymentAmount
  );
  const [repaymentId, setRepaymentId] = useState(repaymentSlice?.repaymentId);
  const [repaymentStatus, setRepaymentStatus] = useState(
    repaymentSlice?.repaymentStatus
  );

  const {
    isLoading: getRepaymentIsLoading,
    isSuccess: getRepaymentIsSuccess,
    isError: getRepaymentIsError,
    error: getRepaymentError,
    data: getRepaymentData,
  } = useQuery(["getRepayment", unipeEmployeeId, token], getRepayment, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 11,
    refetchInterval: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (isFocused && !getRepaymentIsLoading && getRepaymentIsSuccess) {
      if (getRepaymentData.data.status === 200) {
        var repaymentAmount = Math.max(
          getRepaymentData?.data?.body?.amount -
            (getRepaymentData?.data?.body?.paidAmount ?? 0),
          0
        );
        var repaymentStatus = getRepaymentData?.data?.body?.status;
        if (repaymentAmount > 0 && repaymentStatus !== "SUCCESS") {
          console.log(
            "ewaRepaymentFetch API success getRepaymentData.data: ",
            getRepaymentData.data
          );
          var timestamp = getRepaymentData?.data?.body?.dueDate?.split(" ");
          var date = timestamp[0];
          var formattedDueDate = setYYYYMMDDtoDDMMYYYY(date);
          setDueDate(formattedDueDate);
          setOverdueDays(
            getNumberOfDays({
              date: formattedDueDate?.replace(/-/g, "/"),
              formatted: false,
            })
          );
          setRepaymentAmount(repaymentAmount);
          setRepaymentStatus(repaymentStatus);
          setRepaymentId(getRepaymentData?.data?.body?.repaymentId);
          setInactive(false);
        } else if (repaymentAmount < 1 || repaymentStatus === "INPROGRESS") {
          setInactive(true);
        }
      } else if (getRepaymentData.data.status === 404) {
        console.log(
          "ewaRepaymentFetch API status error getRepaymentData.data: ",
          getRepaymentData.data
        );
        dispatch(resetRepayment());
        setDueDate(null);
        setOverdueDays(0);
        setRepaymentAmount(0);
        setRepaymentId(null);
        setRepaymentOrderId(null);
        setRepaymentStatus(null);
        setInactive(true);
      }
    } else if (getRepaymentIsError) {
      console.log(
        "ewaRepaymentFetch API error getRepaymentError.message: ",
        getRepaymentError.message
      );
      dispatch(resetRepayment());
      setInactive(true);
    }
  }, [
    getRepaymentIsLoading,
    getRepaymentIsSuccess,
    getRepaymentData,
    isFocused,
  ]);

  const { mutateAsync: updateRepaymentMutateAsync } = updateRepayment();

  const { mutateAsync: createRazorpayOrderMutateAsync } = createRazorpayOrder({
    amount: repaymentAmount,
    repaymentId: repaymentId,
  });

  const backendPush = ({ data, status }) => {
    console.log("repaymentSlice: ", repaymentSlice);
    updateRepaymentMutateAsync({
      data: {
        unipeEmployeeId: unipeEmployeeId,
        dueDate: dueDate,
        data: data,
        status: status,
        campaignId: campaignId,
      },
      token: token,
    })
      .then((response) => {
        console.log("repaymentPush response: ", response.data);
        if (response.data.status === 200) {
          console.log("repaymentPush pushed");
          setRepaymentStatus(status);
        } else {
          console.log("repaymentPush not expected: ", response.data);
          setRepaymentStatus(response.data.paymentStatus);
        }
      })
      .catch((error) => {
        console.log("repaymentPush error: ", error);
        return error;
      });
  };

  useEffect(() => {
    console.log(
      "createRepayment repaymentOrderId: ",
      repaymentOrderId,
      !repaymentOrderId
    );
    if (repaymentAmount > 0) {
      if (repaymentOrderId) {
        var options = {
          description: "Unipe Early Loan Repayment",
          name: "Unipe",
          key: RZP_KEY_ID,
          order_id: repaymentOrderId,
          customer_id: customerId,
          prefill: {
            name: accountHolderName,
            email: email,
            contact: phoneNumber,
          },
          theme: { color: COLORS.primary },
        };

        RazorpayCheckout.open(options)
          .then((response) => {
            console.log(
              "ewaRepayment Checkout RazorpayCheckout data: ",
              response
            );
            backendPush({
              data: {
                orderId: repaymentOrderId,
                paymentId: response.razorpay_payment_id,
                paymentSignature: response.razorpay_signature,
                provider: "razorpay",
              },
              status: "INPROGRESS",
            });
            Analytics.trackEvent("Ewa|Repayment|Success", {
              unipeEmployeeId: unipeEmployeeId,
            });
          })
          .catch((error) => {
            console.log("ewaRepayment Checkout error: ", error);
            backendPush({
              data: {
                orderId: repaymentOrderId,
              },
              status: "INPROGRESS",
            });
            Analytics.trackEvent("Ewa|Repayment|Error", {
              unipeEmployeeId: unipeEmployeeId,
            });
          })
          .finally(() => {
            setRepaymentOrderId(null);
            setLoading(false);
          });
      }
    }
  }, [repaymentOrderId]);

  const createRepaymentOrder = () => {
    if (repaymentAmount > 0) {
      createRazorpayOrderMutateAsync()
        .then((res) => {
          setRepaymentOrderId(res?.data?.id);
          backendPush({
            data: {
              orderId: res?.data?.id,
            },
            status: "PENDING",
          });
        })
        .catch((error) => {
          backendPush({
            data: {},
            status: "ERROR",
          });
          Alert.alert("Error", error.toString());
          setLoading(false);
          Analytics.trackEvent("Ewa|Repayment|Error", {
            unipeEmployeeId: unipeEmployeeId,
            error: error.toString(),
          });
        });
    }
  };

  if (repaymentAmount > 0) {
    return (
      <View>
        <Text style={[styles.title]}>EMI Payments</Text>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={{ ...FONTS.h4, color: COLORS.black }}>
              ₹{repaymentAmount}
            </Text>
            <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
              Due date {dueDate}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              borderRadius: 3,
              borderWidth: 1,
              paddingHorizontal: "2%",
              paddingVertical: "1%",
              alignSelf: "center",
            }}
          >
            <Text style={{ ...FONTS.body5 }}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

const styles = EStyleSheet.create({
  container: {
    alignSelf: "center",
    paddingVertical: "7rem",
    paddingHorizontal: "5rem",
    width: "100%",
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderBottomWidth: "0.75rem",
    borderTopWidth: "0.75rem",
    borderColor: COLORS.lightGray,
    justifyContent: "space-between",
  },
  dateCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 5,
    paddingVertical: "5rem",
    paddingHorizontal: "10rem",
    justifyContent: "flex-start",
    alignSelf: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: "15rem",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: COLORS.secondary,
    ...FONTS.h2,
    marginVertical: "6rem",
  },
});

export default PayMoneyCard;

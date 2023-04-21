import { SafeAreaView, View } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import BankFormTemplate from "../../../templates/bank/Form";
import BankConfirmApi from "../../../apis/bank/Confirm";
import TopTabNav from "../../../navigators/TopTabNav";
import { styles } from "../../../styles";
import DetailsCard from "../../../components/molecules/DetailsCard";
import PrimaryButton from "../../../components/atoms/PrimaryButton";

const Bank = () => {
  const navigation = useNavigation();

  const verifyStatus = useSelector((state) => state.bank.verifyStatus);
  const aadhaarVerifyStatus = useSelector((state) => state.aadhaar.verifyStatus);
  const mandateVerifyStatus = useSelector((state) => state.mandate.verifyStatus);
  const data = useSelector((state) => state.bank.data);

  useEffect(() => {
    if (verifyStatus == "INPROGRESS_CONFIRMATION") {
      navigation.navigate("KYC", {
        screen: "BANK",
        params: {
          screen: "Confirm",
        },
      });
    }
  }, [verifyStatus]);

  const cardData = () => {
    var res = [
      {
        subTitle: "Account Holder Name",
        value: data?.accountHolderName,
        fullWidth: true,
      },
      {
        subTitle: "Account Number",
        value: data?.accountNumber,
      },
      { subTitle: "Bank Name", value: data?.bankName },
      { subTitle: "Branch Name", value: data?.branchName, fullWidth: true },
      { subTitle: "Branch City", value: data?.branchCity },

      { subTitle: "IFSC", value: data?.ifsc },
      { subTitle: "UPI", value: data?.upi, fullWidth: true },
      { subTitle: "Verify Status", value: verifyStatus },
    ];
    return res;
  };

  const tabs = [
    {
      name: "Form",
      component: BankFormTemplate,
      initialParams: { type: "KYC" },
      disable: true,
    },
    {
      name: "Confirm",
      component: BankConfirmApi,
      initialParams: { type: "KYC" },
      disable: true,
    },
  ];

  if (verifyStatus == "SUCCESS") {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <DetailsCard data={cardData()} />
          {
            mandateVerifyStatus != "SUCCESS" ? (
              <PrimaryButton
                title="Continue to Mandate Verification"
                onPress={() => {
                  navigation.navigate("KYC", {
                    screen: "MANDATE",
                  });
                }}
              />
            ) : null
          }
        </View>
      </SafeAreaView>
    );
  } else if (aadhaarVerifyStatus != "SUCCESS") {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <PrimaryButton
            title="Continue to Aadhaar Verification"
            onPress={() => {
              navigation.navigate("KYC", {
                screen: "AADHAAR",
              });
            }}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <TopTabNav tabs={tabs} hide={true} />
      </SafeAreaView>
    );
  }
};

export default Bank;

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Alert, Text, View } from "react-native";
import { addVerifyStatus } from "../../store/slices/aadhaarSlice";
import { bankform, form, styles } from "../../styles";
import { COLORS, FONTS } from "../../constants/Theme";
import Analytics from "appcenter-analytics";
import DetailsCard from "../../components/molecules/DetailsCard";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { putBackendData } from "../../services/employees/employeeServices";

const AadhaarConfirmApi = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.token);
  const unipeEmployeeId = useSelector((state) => state.auth.unipeEmployeeId);
  const campaignId = useSelector((state) => state.campaign.onboardingCampaignId);
  const data = useSelector((state) => state.aadhaar.data);
  const number = useSelector((state) => state.aadhaar.number);

  const backendPush = async ({ verifyStatus }) => {

    dispatch(addVerifyStatus(verifyStatus));

    const payload = {
      unipeEmployeeId: unipeEmployeeId,
      number: number,
      verifyStatus: verifyStatus,
      campaignId: campaignId
    };

    const response = await putBackendData({ data: payload, xpath: "aadhaar", token: token });
    const responseJson = response?.data;

    if (responseJson.status === 200) {
      if (verifyStatus === "REJECTED") {
        if (props?.route?.params?.type === "KYC") {
          navigation.navigate("KYC", {
            screen: "AADHAAR",
            params: {
              screen: "Form",
            },
          });
        } else {
          navigation.navigate("AadhaarForm");
        }
      } else if (verifyStatus === "SUCCESS") {
          if (props?.route?.params?.type === "KYC") {
            navigation.navigate("KYC", {
              screen: "AADHAAR",
            });
          } else {
            navigation.navigate("PanForm");
          }
      }
    } else {
      Alert.alert("Error", JSON.stringify(responseJson));
    }
  };

  const cardData = () => {
    var res = [
      { subTitle: "Name", value: data?.name, fullWidth: true },
      { subTitle: "Number", value: number },
      { subTitle: "Gender", value: data?.gender },
      { subTitle: "Date of Birth", value: data?.date_of_birth },
      { subTitle: "Address", value: data?.address, fullWidth: true },
    ];
    return res;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Are these your Aadhaar details?</Text>
      <Text style={styles.subHeadline}>
        कृपया स्पष्ट करें की यहाँ दी गयी सारी जानकारी आपकी ही है?
      </Text>
      <DetailsCard
        data={cardData()}
        imageUri={{
          uri: `data:image/jpeg;base64,${data["photo_base64"]}`,
          cache: "only-if-cached",
        }}
      />

      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <PrimaryButton
          title="Not Me"
          containerStyle={form.noButton}
          titleStyle={{ ...FONTS.h4, color: COLORS.warning }}
          onPress={() => {
            backendPush({
              verifyStatus: "REJECTED",
            });
            Analytics.trackEvent("Aadhaar|Confirm|Error", {
              unipeEmployeeId: unipeEmployeeId,
              error: "Rejected by User",
            });
          }}
        />
        <PrimaryButton
          accessibilityLabel="YesButton"
          title="Yes, that’s me"
          containerStyle={form.yesButton}
          titleStyle={{ ...FONTS.h4, color: COLORS.primary }}
          onPress={() => {
            backendPush({
              verifyStatus: "SUCCESS",
            });
            Analytics.trackEvent("Aadhaar|Confirm|Success", {
              unipeEmployeeId: unipeEmployeeId,
            });
          }}
        />
        <View style={bankform.padding}></View>
      </View>
    </View>
  );
};

export default AadhaarConfirmApi;

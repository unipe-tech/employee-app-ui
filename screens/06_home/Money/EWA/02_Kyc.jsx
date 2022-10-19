import { useNavigation } from "@react-navigation/core";
import Analytics from "appcenter-analytics";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import { useSelector } from "react-redux";
import Header from "../../../../components/atoms/Header";
import PrimaryButton from "../../../../components/PrimaryButton";
import { ewaKycPush } from "../../../../helpers/BackendPush";
import { form, styles } from "../../../../styles";
import CollapsibleCard from "../../../../components/CollapsibleCard";

const KYC = () => {
  const navigation = useNavigation();

  const [fetched, setFetched] = useState(false);
  const [deviceId, setDeviceId] = useState(0);
  const [ipAddress, setIpAdress] = useState(0);

  const [loading, setLoading] = useState(false);
  const data = useSelector((state) => state.aadhaar.data);
  const number = useSelector((state) => state.aadhaar.number);
  const unipeEmployeeId = useSelector((state) => state.auth.id);

  const ewaLiveSlice = useSelector((state) => state.ewaLive);

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
      ewaKycPush({
        offerId: ewaLiveSlice?.offerId,
        unipeEmployeeId: unipeEmployeeId,
        status: "INPROGRESS",
        timestamp: Date.now(),
        ipAddress: ipAddress,
        deviceId: deviceId,
      })
        .then((response) => {
          console.log("ewaKycPush response.data: ", response.data);
        })
        .catch((error) => {
          console.log("ewaKycPush error: ", error);
          Alert.alert("An Error occured", error);
        });
    }
  }, [fetched]);

  function handleKyc() {
    setLoading(true);
    ewaKycPush({
      offerId: ewaLiveSlice?.offerId,
      unipeEmployeeId: unipeEmployeeId,
      status: "CONFIRMED",
      timestamp: Date.now(),
      ipAddress: ipAddress,
      deviceId: deviceId,
    })
      .then((response) => {
        console.log("ewaKycPush response.data: ", response.data);
        setLoading(false);
        Analytics.trackEvent("Ewa|Kyc|Success", {
          userId: unipeEmployeeId,
        });
        navigation.navigate("EWA_AGREEMENT");
      })
      .catch((error) => {
        console.log("ewaKycPush error: ", error);
        setLoading(false);
        Alert.alert("An Error occured", error);
        Analytics.trackEvent("Ewa|Kyc|Error", {
          userId: unipeEmployeeId,
          error: error,
        });
      });
  }

  const kycData = [
    { subTitle: "Number", value: number },
    {
      subTitle: "Name",
      value: data.name,
    },
    {
      subTitle: "Date of Birth",
      value: data.date_of_birth,
    },
    { subTitle: "Gender", value: data.gender },
    { subTitle: "Address", value: data.address },
  ];

  return (
    <SafeAreaView style={[styles.container, { padding: 0 }]}>
      <Header
        title="KYC"
        onLeftIconPress={() => navigation.navigate("EWA_OFFER")}
      />
      <View style={styles.container}>
        <Text style={form.OtpAwaitMsg}>
          Are these your AADHAAR details ?{"\n"}
        </Text>
        <Image
          source={{
            uri: `data:image/jpeg;base64,${data["photo_base64"]}`,
          }}
          style={form.aadharimg}
        />
        <CollapsibleCard title="KYC Details" isClosed={false} data={kycData} />

        <PrimaryButton
          title={loading ? "Verifying" : "Continue"}
          disabled={loading}
          onPress={() => {
            handleKyc();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default KYC;

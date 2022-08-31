import { Button, Icon } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TimeDifference } from "../../helpers/TimeDifference";
import {
  addLicenseVerifyMsg,
  addLicenseVerifyStatus,
} from "../../store/slices/licenseSlice";
import { form, license, styles, selfie } from "../../styles";

export default Confirm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [backendPush, setBackendPush] = useState(false);

  const id = useSelector((state) => state.auth.id);
  const data = useSelector((state) => state.license.data);
  const number = useSelector((state) => state.license.number);
  const verifyTimestamp = useSelector((state) => state.license.verifyTimestamp);

  const licenseSlice = useSelector((state) => state.license);
  const [verifyMsg, setVerifyMsg] = useState(licenseSlice?.verifyMsg);
  const [verifyStatus, setVerifyStatus] = useState(licenseSlice?.verifyStatus);

  useEffect(() => {
    dispatch(addLicenseVerifyMsg(verifyMsg));
  }, [verifyMsg]);

  useEffect(() => {
    dispatch(addLicenseVerifyStatus(verifyStatus));
  }, [verifyStatus]);

  useEffect(() => {
    console.log("licenseSlice : ", licenseSlice);
    if (backendPush) {
      licenseBackendPush({
        id: id,
        data: data,
        verifyMsg: verifyMsg,
        verifyStatus: verifyStatus,
        verifyTimestamp: verifyTimestamp,
      });
    }
    setBackendPush(false);
  }, [backendPush]);

  return (
    <View style={styles.container}>
      <Text style={form.OtpAwaitMsg}>
        Are these your License details ?{"\n"}
      </Text>
      {photo ? (
        <Image
          source={{
            uri: `data:image/jpeg;base64,${photo}`,
          }}
          style={form.aadharimg}
        />
      ) : (
        <Icon
          name="perm-identity"
          size={300}
          color="grey"
          style={selfie.selfie}
        />
      )}
      <Text style={form.userData}>Number: {number}</Text>
      <Text style={form.userData}>Name: {name}</Text>
      <Text style={form.userData}>Date of Birth: {dob}</Text>
      <Text style={form.userData}>Blood Group: {bloodGroup ? bloodGroup : "NA"}</Text>
      {classes.map((item, index) => (
        <View key={index}>
          <Text style={form.userData}>Class: {item["category"]}</Text>
          <Text style={license.authority}>{item["authority"]}</Text>
        </View>
      ))}
      {validity["non_transport"] ? (
        <>
          <Text style={form.userData}>
            Validity: {validity["non_transport"]["issue_date"]} to{" "}
            {validity["non_transport"]["expiry_date"]}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={license.authority}>Non-Transport</Text>
            {TimeDifference(validity["non_transport"]["expiry_date"]) > 0 ? (
              <Text style={license.valid}>Valid</Text>
            ) : (
              <Text style={license.invalid}>Invalid</Text>
            )}
          </View>
        </>
      ) : null}
      {validity["transport"] ? (
        <>
          <Text style={form.userData}>
            Transport Validity: {validity["transport"]["issue_date"]} to{" "}
            {validity["transport"]["expiry_date"]}
          </Text>{" "}
          <View style={{ flexDirection: "row" }}>
            <Text style={license.authority}>Transport</Text>
            {TimeDifference(validity["transport"]["expiry_date"]) > 0 ? (
              <Text style={license.valid}>Valid</Text>
            ) : (
              <Text style={license.invalid}>Invalid</Text>
            )}
          </View>
        </>
      ) : null}

      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Button
          title="No"
          type="solid"
          uppercase={false}
          style={form.noButton}
          color="#EB5757"
          onPress={() => {
            setVerifyMsg("Rejected by User");
            navigation.navigate("Home", {
              screen: "Documents",
              params: {
                screen: "Drivers License",
              },
            });
          }}
        />
        <Button
          title="Yes"
          type="solid"
          uppercase={false}
          style={form.yesButton}
          color="#4E46F1"
          onPress={() => {
            setVerifyMsg("Confirmed by User");
            setVerifyStatus("SUCCESS");
            setBackendPush(true);
            navigation.navigate("Home", {
              screen: "Documents",
              params: {
                screen: "Drivers License",
              },
            });
          }}
        />
      </View>
    </View>
  );
};

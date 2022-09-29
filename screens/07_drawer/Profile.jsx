import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import { useSelector } from "react-redux";
import TextButton from "../../components/atoms/TextButton";
import { SIZES } from "../../constants/Theme";

const Profile = () => {
  const aadhaarData = useSelector((state) => state.aadhaar.data);
  const fullName =
    aadhaarData?.["name"] || useSelector((state) => state.pan?.name);
  const profile = useSelector((state) => state.profile);
  const email = profile?.email;
  const mobile = useSelector((state) => state.auth.phoneNumber);
  const alternateMobile = profile?.altMobile;
  const maritalStatus = profile?.maritalStatus;
  const qualification = profile?.qualification;

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: SIZES.padding }}>
      <DetailItem
        label="Full Name"
        value={fullName || "Not Provided"}
        divider
      />
      <DetailItem label="Email Id" value={email || "Not Provided"} divider />
      <DetailItem label="Mobile Number" value={mobile || "Not Provided"} />
      <DetailItem
        label="Alternate Mobile Number"
        value={alternateMobile || "Not Provided"}
      />
      <DetailItem
        label="Educational Qualification"
        value={qualification || "Not Provided"}
      />
      <DetailItem
        label="Marital Status"
        value={maritalStatus || "Not Provided"}
      />
      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
        <TextButton
          style={{ marginTop: 20 }}
          label="Update"
          onPress={() =>
            Alert.alert(
              "The Profile Details are not editable, please ask your employer to update"
            )
          }
        />
      </View>
    </View>
  );
};

export default Profile;

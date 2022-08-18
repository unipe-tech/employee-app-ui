import { View, Text, Alert } from "react-native";
import React from "react";
import DetailItem from "./DetailItem";
import { useSelector } from "react-redux";
import TextButton from "../../components/atoms/TextButton";

const Profile = () => {
  const fullName = useSelector((state) => state.profile.fullName);
  const email = useSelector((state) => state.profile.email);
  const mobile = useSelector((state) => state.profile.mobile);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DetailItem label="Full Name" title={fullName} divider />
      <DetailItem label="Email Id" title={email} divider />
      <DetailItem label="Mobile Number" title={mobile} />
      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
        <TextButton
          label={"Update"}
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

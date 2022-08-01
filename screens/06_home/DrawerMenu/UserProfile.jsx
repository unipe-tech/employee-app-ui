import { Icon } from "@react-native-material/core";
import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Drawer, Camera, MenuPages } from "../../../styles";
import { useNavigation } from "@react-navigation/core";
import PageDataTile from "../../../components/PageDataTile";
export default UserProfile = () => {
  const navigation = useNavigation();
  const Profile = useSelector((state) => state.profile);
  const tiles = [
    { icon: "account-circle", title: "Profile", subtitle:Profile.educationalQualification, color: "#4E46F1" },
  ];
  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()} style={Camera.back}>
        <Icon name="arrow-back" size={25} color="white" />
      </TouchableOpacity>

      <Text style={MenuPages.menuPageTitle}>Profile</Text>
      {Profile.selfie ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${Profile.selfie}` }}
          style={MenuPages.avatar}
        />
      ) : (
        <Icon
          name="perm-identity"
          size={300}
          color="grey"
          style={Drawer.avatar}
        />
      )}
      <PageDataTile tiles={tiles} />
    </>
  );
};

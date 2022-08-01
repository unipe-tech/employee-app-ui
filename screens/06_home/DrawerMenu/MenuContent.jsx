import { Icon } from "@react-native-material/core";
import React from "react";
import { Image, Text } from "react-native";
import { useSelector } from "react-redux";
import MenuTile from "../../../components/MenuTile";
import { Drawer } from "../../../styles";


export default MenuContent = () => {
  const imageData = useSelector((state) => state.profile.selfie);
  const tiles = [
    { icon: "person", title: "Profile", page: "UserProfile" },
    { icon: "verified-user", title: "KYC" },
    { icon: "forum", title: "Support" },
    { icon: "settings", title: "Settings" },
    { icon: "lock", title: "Privacy Policy" },
    { icon: "security", title: "Terms & Conditions" },
    { icon: "logout", title: "Logout", color: "red" },
  ];
  return (
    <>
      {imageData ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${imageData}` }}
          style={Drawer.avatar}
        />
      ) : (
        <Icon
          name="perm-identity"
          size={300}
          color="grey"
          style={Drawer.avatar}
        />
      )}
      <Text style={Drawer.name}>Pranav Murali</Text>
      <MenuTile tiles={tiles} />
    </>
  );
};

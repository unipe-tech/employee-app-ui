import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { styles } from "../../../styles";
import LogoHeader from "../../../components/atoms/LogoHeader";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "../../../constants/Theme";
import { useSelector } from "react-redux";

const Account = () => {
  const image = useSelector((state) => state.aadhaar.data.photo_base64);
  const name = useSelector(
    (state) => state.aadhaar.data?.name || state.pan.data?.name || "User"
  );
  const options = [
    {
      title: "Profile",
      subtitle: "See & edit your profile details",
      iconName: "account-circle-outline",
    },
    {
      title: "KYC",
      subtitle: "All your KYC details in one place",
      iconName: "order-bool-ascending-variant",
    },
    {
      title: "Documents",
      subtitle: "Coming soon",
      iconName: "file-document-multiple-outline",
    },
    {
      title: "Customer Support",
      subtitle: "Talk to out support team",
      iconName: "whatsapp",
    },
    {
      title: "T&C and Privacy Policy",
      subtitle: "Read our terms of use",
      iconName: "file-document",
    },
    {
      title: "Logout",
      subtitle: "Logout from Unipe App",
      iconName: "exit-to-app",
    },
  ];
  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* <LogoHeader
        rightIcon={
          <Icon name="help-circle-outline" size={28} color={COLORS.primary} />
        }
      /> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
          borderTopWidth: 0.8,
          borderColor: COLORS.lightGray,
        }}
      >
        {!image ? (
          <Icon name={"account-box"} size={80} color={COLORS.primary} />
        ) : (
          <Image
            source={{
              uri: `data:image/jpeg;base64,${image}`,
              cache: "only-if-cached",
            }}
            style={{
              width: 80,
              height: 80,
              resizeMode: "contain",
              borderRadius: 10,
            }}
          />
        )}

        <Text style={{ ...FONTS.h3, color: COLORS.black, marginLeft: 15 }}>
          {name ? name : "User"}
        </Text>
      </View>
      {options.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            borderTopWidth: 0.8,

            borderColor: COLORS.lightGray,
          }}
        >
          <Icon name={item.iconName} size={24} color={COLORS.gray} />
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              flex: 1,
              paddingLeft: 15,
            }}
          >
            <Text style={{ ...FONTS.h4, color: COLORS.black }}>
              {item.title}
            </Text>
            <Text style={{ ...FONTS.body5, color: COLORS.gray }}>
              {item.subtitle}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default Account;
